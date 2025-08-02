// 👉 DOM phần tử
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// ✅ Địa chỉ backend chính thức (đã kiểm tra hoạt động OK)
const backendURL = "https://thamai-backend-clean-wu90.onrender.com/chat";

// 📌 Hàm hiển thị tin nhắn lên khung chat
function appendMessage(content, className) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🚀 Hàm gửi tin nhắn đến backend và nhận phản hồi
async function sendMessageToBackend(message) {
  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "⚠️ Phản hồi rỗng từ trợ lý.";
  } catch (error) {
    console.error("❌ Lỗi khi gọi backend:", error);
    return "⚠️ Lỗi kết nối đến máy chủ. Vui lòng thử lại.";
  }
}

// 🎯 Xử lý khi nhấn nút Gửi
sendButton.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage(message, "user-message");
  userInput.value = "";

  const reply = await sendMessageToBackend(message);
  appendMessage(reply, "bot-message");
});

// 🎯 Xử lý khi nhấn phím Enter
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});
