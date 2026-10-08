# AI Event Form Generator (Everyday Use Track)

This project is an automated solution for the **Everyday Use Track** of the AI Automation Competition (CS Week). It takes an event description as input and automatically generates a customized, multi-question Google Form for feedback.

## ✨ Features
1. **Zero-Setup for Judges:** The frontend interface requires **NO API key input**. The judges only need to paste or type an event description and click **Generate Magic Form**!
2. **Powered by OpenRouter / Multi-Model AI:** Compatible with OpenRouter (`google/gemini-2.0-flash-001`, `meta-llama/llama-3.3-70b-instruct`, etc.), Groq, xAI, OpenAI, or Gemini.
3. **Intelligent Question Generation:** Automatically designs:
   - Multiple Choice questions
   - Checkboxes
   - 1-5 Numerical rating scale
   - Open-ended paragraph feedback
4. **Automated Google Form Creation:** Uses Google Apps Script's `FormApp` API to instantly create, format, and publish the form in Google Drive.
5. **Instant Links:** Generates both the **Live Form link** (for respondents) and **Edit link** (for form owners).

## 🚀 Setup & Deployment

1. Open [script.google.com](https://script.google.com) and create a **New Project**.
2. Copy and paste [`Code.gs`](./Code.gs) into the `Code.gs` tab.
3. **At line 5 of `Code.gs`**, paste your OpenRouter key inside `const API_KEY = "..."`:
   ```javascript
   const API_KEY = "sk-or-v1-...";
   ```
4. Click the `+` icon next to Files, select **HTML**, and name it **`Index`**.
5. Copy and paste [`Index.html`](./Index.html) into the `Index` tab.
6. Click **Save** (💾).
7. Click **Deploy** -> **New deployment**:
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy** and copy the **Web app URL** to submit!
