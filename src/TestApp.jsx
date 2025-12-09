import React from "react";

export const TestApp = () => {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1> EasyGo работает!</h1>
      <p>Если видите это, значит React загружается</p>
      <div style={{ marginTop: 20 }}>
        <button style={{ padding: "10px 20px", margin: "0 10px" }}>
          Поддержка
        </button>
        <button style={{ padding: "10px 20px", margin: "0 10px" }}>
          Карта
        </button>
        <button style={{ padding: "10px 20px", margin: "0 10px" }}>
          Профиль
        </button>
      </div>
    </div>
  );
};
