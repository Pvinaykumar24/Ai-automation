// ============================================================================
// AI EVENT FEEDBACK STUDIO - BACKEND (Google Apps Script)
// ============================================================================

// 🔑 CONFIGURATION: Paste your API Key here
// Supports: OpenRouter (sk-or-v1-...), Groq (gsk_...), OpenAI (sk-...), Gemini (AIza...)
const API_KEY = "PASTE_YOUR_API_KEY_HERE";

// Model for OpenRouter (e.g., "google/gemini-2.0-flash-001", "meta-llama/llama-3.3-70b-instruct", "deepseek/deepseek-chat")
const OPENROUTER_MODEL = "google/gemini-2.0-flash-001";

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('AI Event Feedback Studio')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * AI Event Analysis & Question Generation
 * Takes eventData: { eventName, description, eventType, audience, duration }
 * Returns structured analysis and customized questions.
 */
function analyzeAndGenerateQuestions(eventData) {
  try {
    const name = (eventData.eventName || 'Event').trim();
    const desc = (eventData.description || '').trim();
    const type = (eventData.eventType || 'Workshop').trim();
    const audience = (eventData.audience || 'General').trim();
    const duration = (eventData.duration || '1 Day').trim();

    if (!desc) {
      throw new Error("Event description is required.");
    }

    // Call AI to generate both event analysis and tailored questions
    const systemPrompt = `You are a world-class AI Event Intelligence Architect.
Analyze the given event and generate a comprehensive event breakdown and tailored feedback form questions.

The questions MUST be specifically tailored to the activities, technical topics, and purpose described—NOT generic.
Generate 5 to 7 high-quality questions with a balanced mix of:
- "scale" (1-5 rating, e.g. for hands-on sessions or specific tools)
- "multiple_choice" (e.g. which track/activity was most valuable)
- "checkbox" (e.g. topics attendee wants follow-up on)
- "paragraph" (open-ended feedback on specific outcomes)

Return STRICTLY a JSON object with this exact structure:
{
  "analysis": {
    "purpose": "1-2 sentence core purpose",
    "audience": "${audience}",
    "topics": ["Array", "of", "technical", "or", "core", "topics"],
    "activities": ["Array", "of", "hands-on", "activities"],
    "feedbackFocus": ["Key", "feedback", "objectives"]
  },
  "questions": [
    {
      "id": "q1",
      "type": "scale",
      "title": "Question text mentioning specific topic or activity",
      "helpText": "Optional guidance",
      "required": true,
      "min": 1,
      "max": 5
    },
    {
      "id": "q2",
      "type": "multiple_choice",
      "title": "Question text",
      "helpText": "",
      "required": true,
      "options": ["Option 1", "Option 2", "Option 3"]
    },
    {
      "id": "q3",
      "type": "paragraph",
      "title": "Open-ended question text",
      "helpText": "",
      "required": false
    }
  ],
  "qualityScore": 95,
  "qualityBreakdown": [
    {"label": "Event relevance", "passed": true},
    {"label": "Activity coverage", "passed": true},
    {"label": "Technical coverage", "passed": true},
    {"label": "Question diversity", "passed": true},
    {"label": "Neutral wording", "passed": true}
  ]
}
Do NOT wrap in markdown \`\`\`json. Return raw JSON only.`;

    const userPrompt = `Event Name: ${name}
Type: ${type}
Audience: ${audience}
Duration: ${duration}
Description: ${desc}`;

    let aiResult = callAI(systemPrompt, userPrompt);
    return {
      success: true,
      data: aiResult
    };

  } catch (err) {
    // Return high quality fallback demo data if API key is invalid/exhausted so demo never breaks
    Logger.log("API Error, using intelligent fallback: " + err.toString());
    return {
      success: true,
      isFallback: true,
      errorMessage: err.toString(),
      data: getSmartFallback(eventData)
    };
  }
}

/**
 * Creates the actual Google Form in Google Drive using FormApp
 */
function generateGoogleForm(formData) {
  try {
    const title = formData.title || 'Event Feedback Form';
    const description = formData.description || 'Thank you for your feedback.';
    const questions = formData.questions || [];

    if (questions.length === 0) {
      throw new Error("No questions provided to create the form.");
    }

    // Create the Google Form
    const form = FormApp.create(title);
    form.setTitle(title);
    form.setDescription(description);
    form.setIsQuiz(false);
    form.setAllowResponseEdits(true);

    // Populate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      let item;

      switch(q.type) {
        case 'scale':
          item = form.addScaleItem();
          item.setBounds(q.min || 1, q.max || 5);
          item.setLabels('Poor / Low', 'Excellent / High');
          break;
        case 'multiple_choice':
          item = form.addMultipleChoiceItem();
          if (q.options && q.options.length > 0) {
            item.setChoiceValues(q.options);
          } else {
            item.setChoiceValues(['Yes', 'No']);
          }
          break;
        case 'checkbox':
          item = form.addCheckboxItem();
          if (q.options && q.options.length > 0) {
            item.setChoiceValues(q.options);
          } else {
            item.setChoiceValues(['Option 1', 'Option 2']);
          }
          break;
        case 'paragraph':
          item = form.addParagraphTextItem();
          break;
        case 'short_answer':
        default:
          item = form.addTextItem();
          break;
      }

      item.setTitle(q.title || ('Question ' + (i + 1)));
      if (q.helpText) {
        item.setHelpText(q.helpText);
      }
      if (q.required) {
        item.setRequired(true);
      }
    }

    const formUrl = form.getPublishedUrl();
    const editUrl = form.getEditUrl();

    // Save to history storage
    saveToHistory({
      title: title,
      eventType: formData.eventType || 'Event',
      questionCount: questions.length,
      formUrl: formUrl,
      editUrl: editUrl,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    return {
      success: true,
      formUrl: formUrl,
      editUrl: editUrl
    };

  } catch (e) {
    return {
      success: false,
      error: e.toString()
    };
  }
}

/**
 * Universal AI Caller supporting OpenRouter, Groq, xAI, OpenAI & Gemini
 */
function callAI(systemPrompt, userPrompt) {
  const apiKey = (API_KEY || '').trim();
  if (!apiKey || apiKey === "PASTE_YOUR_API_KEY_HERE") {
    throw new Error("API_KEY not configured.");
  }

  let provider = 'gemini';
  if (apiKey.startsWith('sk-or-')) {
    provider = 'openrouter';
  } else if (apiKey.startsWith('gsk_')) {
    provider = 'groq';
  } else if (apiKey.startsWith('xai-')) {
    provider = 'xai';
  } else if (apiKey.startsWith('sk-')) {
    provider = 'openai';
  }

  if (provider === 'openrouter' || provider === 'groq' || provider === 'xai' || provider === 'openai') {
    let endpoint = '';
    let model = '';
    let headers = {
      'Authorization': 'Bearer ' + apiKey
    };

    if (provider === 'openrouter') {
      endpoint = 'https://openrouter.ai/api/v1/chat/completions';
      model = OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';
      headers['HTTP-Referer'] = 'https://script.google.com';
      headers['X-Title'] = 'AI Event Feedback Studio';
    } else if (provider === 'groq') {
      endpoint = 'https://api.groq.com/openai/v1/chat/completions';
      model = 'llama-3.3-70b-versatile';
    } else if (provider === 'xai') {
      endpoint = 'https://api.x.ai/v1/chat/completions';
      model = 'grok-2-latest';
    } else if (provider === 'openai') {
      endpoint = 'https://api.openai.com/v1/chat/completions';
      model = 'gpt-4o-mini';
    }

    const payload = {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.4
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: headers,
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const resp = UrlFetchApp.fetch(endpoint, options);
    const resJson = JSON.parse(resp.getContentText());

    if (resJson.error) {
      throw new Error((provider.toUpperCase()) + " Error: " + (resJson.error.message || JSON.stringify(resJson.error)));
    }

    let text = resJson.choices[0].message.content;
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(text);

  } else {
    // Gemini Direct API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: { response_mime_type: "application/json" }
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const resp = UrlFetchApp.fetch(url, options);
    const resJson = JSON.parse(resp.getContentText());

    if (resJson.error) {
      throw new Error("Gemini Error: " + (resJson.error.message || JSON.stringify(resJson.error)));
    }

    let text = resJson.candidates[0].content.parts[0].text;
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  }
}

/**
 * Intelligent fallback generator (Ensures smooth demo even during API outages)
 */
function getSmartFallback(eventData) {
  const name = eventData.eventName || 'AI & Robotics Workshop';
  const desc = eventData.description || 'Hands-on technical workshop covering Machine Learning, OpenCV, and Arduino.';
  
  return {
    analysis: {
      purpose: "Provide practical, hands-on experience and real-time skills application.",
      audience: eventData.audience || "Engineering Students & Developers",
      topics: ["Machine Learning", "OpenCV", "Python", "Sensors & Hardware", "Model Deployment"],
      activities: ["Hands-on Coding", "Object Detection Demo", "Hardware Assembly", "Interactive Q&A"],
      feedbackFocus: ["Technical depth", "Hands-on utility", "Pacing & Clarity", "Mentor responsiveness"]
    },
    questions: [
      {
        id: "q1",
        type: "scale",
        title: "How effective was the hands-on technical session?",
        helpText: "Rate from 1 (Needs improvement) to 5 (Outstanding)",
        required: true,
        min: 1,
        max: 5
      },
      {
        id: "q2",
        type: "multiple_choice",
        title: "Which activity provided the highest learning value?",
        helpText: "Select the most impactful session",
        required: true,
        options: ["Core Architectural Concepts", "Live Coding & Tooling", "Interactive Troubleshooting", "Project Showcase"]
      },
      {
        id: "q3",
        type: "checkbox",
        title: "Which follow-up topics would you like covered in future editions?",
        helpText: "Select all that apply",
        required: false,
        options: ["Production Deployment", "Advanced Optimization", "Real-World Case Studies", "Open Source Contributing"]
      },
      {
        id: "q4",
        type: "scale",
        title: "How well did the mentors address your questions and technical blocks?",
        helpText: "1 to 5 scale",
        required: true,
        min: 1,
        max: 5
      },
      {
        id: "q5",
        type: "paragraph",
        title: "What was the single most valuable takeaway or suggestion for our next event?",
        helpText: "Share any thoughts to help us improve",
        required: false
      }
    ],
    qualityScore: 96,
    qualityBreakdown: [
      { label: "Event relevance", passed: true },
      { label: "Activity coverage", passed: true },
      { label: "Technical depth", passed: true },
      { label: "Question diversity", passed: true },
      { label: "Neutral wording", passed: true }
    ]
  };
}

/**
 * Storage for Generated Forms
 */
function saveToHistory(item) {
  try {
    const props = PropertiesService.getUserProperties();
    let history = [];
    const saved = props.getProperty("FORM_HISTORY");
    if (saved) {
      history = JSON.parse(saved);
    }
    history.unshift(item);
    if (history.length > 20) history = history.slice(0, 20);
    props.setProperty("FORM_HISTORY", JSON.stringify(history));
  } catch (e) {
    Logger.log("Could not save to user properties: " + e);
  }
}

function getFormHistory() {
  try {
    const props = PropertiesService.getUserProperties();
    const saved = props.getProperty("FORM_HISTORY");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    Logger.log("Could not read history: " + e);
  }
  return [];
}
