# StuddyBuddy

## 📌 Inspiration
Learning from books and notes can feel overwhelming. Often, we don’t know where to start, how to structure our study plan, or how to track progress efficiently. We wanted to create a tool that makes studying more engaging, structured, and fun—something that provides learners with a clear roadmap and quizzes, reducing confusion and improving retention.

---

## 🚀 What It Does
StuddyBuddy is a web-based study tool that generates a **personalized learning roadmap and quizzes** from uploaded user input, such as notes or books. 

### Key Features:
- **AI-Powered Processing**: Uses the Gemini API to analyze text input and extract key concepts.
- **Structured Learning Paths**: Organizes study material into logical checkpoints.
- **Progress Tracking**: Users can mark checkpoints by completing quizzes, enhancing motivation and engagement.
- **Adaptive Learning**: The roadmap adjusts based on content complexity and user progress.

---

## 🛠️ How We Built It
StuddyBuddy is built using modern web technologies for a seamless and interactive experience.

### Tech Stack:
- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)

### System Architecture:
1. **User Uploads Content**: Users input study material (notes, books, or documents).
2. **AI Processing**: The Gemini API extracts key concepts and structures them into a roadmap and quizzes.
3. **Dynamic Roadmap Generation**: The system organizes the learning path based on complexity.
4. **Progress Tracking**: Users can interact with the roadmap and check off completed milestones by completing the quizzes.

---

## 🏆 Accomplishments
- Successfully integrated AI to generate meaningful and structured learning paths.
- Developed an intuitive and interactive interface for enhanced study engagement.
- Created a tool adaptable to **any study material**, making it useful across multiple subjects.

---

## 🤔 Challenges We Faced
- Fine-tuning the **Gemini API** to extract and structure key learning points effectively.
- Designing an interface that balances **usability and engagement**.
- Ensuring the generated roadmap logically represents the **best way to study** a topic.

---

## 📚 What We Learned
- The importance of structuring educational content for **maximum learning efficiency**.
- How AI-powered tools can enhance **personalized learning experiences**.
- The need for intuitive UI/UX design in educational platforms.

---

## 🔮 What's Next for StuddyBuddy
- **🎮 Gamification**: Adding achievements and rewards to make learning interactive.
- **🤝 Collaborative Study**: Allowing users to share roadmaps and study together.
- **📱 Mobile App Version**: Expanding accessibility with a mobile-friendly version.
- **🔍 AI-Driven Recommendations**: Suggesting additional resources based on study progress.

---

## 📂 How to Run the App
### Prerequisites:
Ensure you have **Node.js** and **npm/yarn** installed on your system.

### Setup Instructions:
1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd studdybuddy
   ```
2. **Install dependencies**:
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following key:
     ```sh
     NEXT_PUBLIC_API_KEY=<your-gemini-api-key>
     ```
4. **Run the development server**:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
5. Open `http://localhost:3000` in your browser to start using StuddyBuddy.

---

## 🌍 Try It Out
- **Live Demo**: [Link](https://studybuddy4bytes.vercel.app/)
- **GitHub Repository**: [Link](https://github.com/singhlify/studybuddy/)

---

## 🙌 Contributors
- [**Gurjot Singh**](https://github.com/singhlify/)
- [**Kshitiz Bakshi**](https://github.com/kshitiz-bakshi/)
- [**Anishka Dogra**](https://github.com/anishkadogra/)
- [**Kirtan Prajapati**](https://github.com/kirtanlab/)

### 🤝 Contributing
We welcome contributions! Feel free to submit issues or pull requests to improve StuddyBuddy.

