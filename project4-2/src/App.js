import React, { useState } from 'react';
import './App.css';

const API_URL = 'https://6915287a84e8bd126af8d72c.mockapi.io/users';

function App() {
  const [students, setStudents] = useState([]); 
  const [selectedId, setSelectedId] = useState(null); 

  const LoadData = () => {
    console.log('LoadData 실행됨!');

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('API 응답 오류');
        }
        return response.json();
      })
      .then(data => {
        console.log('불러온 데이터:', data); 
        setStudents(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('데이터를 불러오는데 실패했습니다. API URL을 확인해주세요.');
      });
  };

  const fillForm = (id, name, age, major, number) => {
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('major').value = major;
    document.getElementById('number').value = number;
    setSelectedId(id); 
  };

  const SaveData = () => {
    console.log('SaveData 실행됨!');

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const major = document.getElementById('major').value;
    const number = document.getElementById('number').value;

    const studentData = {
      name: name,
      age: age,
      major: major,
      student_number: number
    };

    let method = 'POST';
    let url = API_URL;

    if (selectedId) {
      method = 'PUT';
      url = `${API_URL}/${selectedId}`;
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('API 응답 오류');
      }
      return response.json();
    })
    .then(data => {
      console.log('저장된 데이터:', data);
      alert('데이터가 성공적으로 저장되었습니다.');
      setSelectedId(null); 
      LoadData(); 
    })
    .catch(error => {
      console.error('Error saving data:', error);
      alert('데이터 저장에 실패했습니다. API URL을 확인해주세요.');
    });
  }

  const UpdateData = () => {
    console.log('UpdateData 실행됨!');

    if (!selectedId) {
      alert('수정할 학생을 선택해주세요!');
      return;
    }

    //const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const major = document.getElementById('major').value;
    const number = document.getElementById('number').value;

    const studentData = {
      name: name,
      age: age,
      major: major,
      student_number: number
    };

    fetch(`${API_URL}/${selectedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('API 응답 오류');
      }
      return response.json();
    })
    .then(data => {
      console.log('업데이트된 데이터:', data);
      alert('데이터가 성공적으로 업데이트되었습니다.');
      LoadData(); 
    })
    .catch(error => {
      console.error('Error updating data:', error);
      alert('데이터 업데이트에 실패했습니다. API URL을 확인해주세요.');
    });

    clearForm();
  }

  const DeleteData = () => {
    console.log('DeleteData 실행됨!');

    fetch(`${API_URL}/${selectedId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('API 응답 오류');
      }
      return response.json();
    })
    .then(data => {
      console.log('삭제된 데이터:', data);
      alert('데이터가 성공적으로 삭제되었습니다.');
      LoadData(); 
    })
    .catch(error => {
      console.error('Error deleting data:', error);
      alert('데이터 삭제에 실패했습니다. API URL을 확인해주세요.');
    });

    clearForm();
  }

  const clearForm = () => {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('major').value = '';
    document.getElementById('number').value = '';
    setSelectedId(null);
  };


  return (
    <div className = "App">
      <h1 className = "header">AJAX Example</h1><br />

      <button onClick = {LoadData}>데이터 불러오기</button><br /><br />
      <input type = "text" className = "address" id = "name" placeholder = "name" />
      <input type = "text" className = "address" id = "age" placeholder = "age" />
      <input type = "text" className = "address" id = "major" placeholder = "major" />
      <input type = "text" className = "address" id = "number" placeholder = "number" />

      <div id="buttonArea"></div><br />
      {!selectedId ? (
          <button onClick={SaveData} className="address">데이터 추가하기</button>
        ) : (
        <>
          <button onClick={UpdateData} className="address">데이터 수정하기</button>
          <button onClick={DeleteData} className="address">데이터 삭제하기</button>
          <button onClick={clearForm} className="address">취소</button>
        </>
      )}<br /><br />

      {students.length > 0 && (
      <table style={{ width: '60%', borderCollapse: 'collapse' , backgroundColor: 'lightyellow'}}>
        <thead>
          <tr style={{ backgroundColor: '#ddd', fontWeight: 'bold' }}>
            <th style={{ padding: '8px', textAlign: 'left', width: '40px' }}>No.</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left', width: '60px' }}>Age</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Major</th>
            <th style={{ padding: '8px', textAlign: 'left', width: '80px' }}>Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr 
                key={student.id}
                style={{ 
                  borderBottom: '1px solid #eee', 
                  cursor: 'pointer',
                  backgroundColor: selectedId === student.id ? '#ffffcc' : 'transparent'
                }}
                onClick={() => fillForm(student.id, student.name, student.age, student.major, student.student_number)}
              >
              <td style={{ padding: '8px' }}>{index + 1}</td>
              <td style={{ padding: '8px' }}>{student.name}</td>
              <td style={{ padding: '8px' }}>{student.age}</td>
              <td style={{ padding: '8px' }}>{student.major}</td>
              <td style={{ padding: '8px' }}>{student.student_number || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
  );
}

export default App;
