export function formatDate (dateString) {
  const d = new Date(dateString);

  const month = d.getMonth() + 1;
  const date = d.getDate();

  let hours = d.getHours();
  let minutes = d.getMinutes();
  const ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${ampm} ${hours}시 ${minutes}분`;

  return `${month}월 ${date}일 ${time}`;
}

export function generateHexCode () {
  return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0")}`;
}
