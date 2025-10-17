import React from 'react';

const UserInfo = () => {
  const name = "허동민";
  const studentId = "202130435";
  const filePath = "/src/app/components/UserInfo.tsx";

  const displayString = `이름: ${name}, 학번: ${studentId}, 파일 경로: ${filePath}`;

  return (
    <div>
      <h1>학생 정보</h1>
      <p>{displayString}</p>
    </div>
  );
};

export default UserInfo;