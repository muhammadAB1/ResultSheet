import axios from "axios";
import { useEffect, useState } from "react";
import { Grade, Head, Student } from "./types";

export default function RecapSheet() {
  const [dbData, setDbData] = useState<{
    students: (Student & { total: number; grade: string; })[];
    grades: Grade[];
    heads: Head[];
  }>();
  const [studentEx, setStudentEx] = useState<Student>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      axios.get(`/api/students`).then((v) => {
        console.log(v.data);
        setDbData(v.data);
      });
    } catch (e) {
      console.trace(e);
    }
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
          <th>S. No</th>
          <th>Name</th>
          {dbData?.heads.map(({ headname }) => (
            <th>{headname}</th>
          ))}
          <th>Total</th>
          <th>Percent</th>
          <th>Grade</th>
          </tr>
          <tr>
          <th></th>
          <th></th>
          {dbData?.heads.map(({ total }) => (
            <th>{total}</th>
          ))}
          <th>{dbData?.heads.reduce((prev, curr) => prev + curr.total, 0)}</th>
          <th>%</th>
          <th></th>
          </tr>
        </thead>

        <tbody>
          {dbData?.students.map((student: Student & { total: number; grade: string; }) => (
            <tr key={student.regno}>
              <td>{student.regno}</td>
              <td className={studentEx?.regno === student.regno ? 'active' : ''}>
                <a onClick={e => {
                e.preventDefault();
                setStudentEx(student);
              }}>{student.name}</a></td>
              {student.marks.map(mark => (
                <td style={{
                  backgroundColor: mark.marks === mark.head.total ? 'lightblue' : 'white'
                }}>{mark.marks}</td>
              ))}
              <td>{student.marks.reduce((prev, curr) => prev + Number(curr.marks), 0)}</td>
              <td>{student.total}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!studentEx ? <></> :
        <>
        <table className='box'>
            <tbody>
              <tr>
                <td>S. No:</td>
                <td>{studentEx.regno}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{studentEx.name}</td>
              </tr>
                {studentEx.marks.map((m) => (
                  <tr>
                    <td>{m.head.headname}:</td>
                    <td><input
                    value={m.marks}
                    onChange={e => {
                      const newValue = parseFloat(e.target.value) || 0;

                      if (newValue < 0 || newValue > m.head.total) {
                        setError(`${m.head.headname} marks should be between 0 and ${m.head.total}`);
                        return;
                      }
                      
                      setError(null);
                      setStudentEx({ ...studentEx,
                        marks: studentEx.marks.map(mm => mm.head.headname === m.head.headname
                          ? { ...mm, marks: e.target.value.length === 0 ? 0 : e.target.value }
                          : mm) });
                    }} />
                      </td>
                  </tr>
                ))}
                {error && <tr><p className="error">{error}</p></tr>}
                <tr><button 
                onClick={e => {
                  e.preventDefault();

                  if (!dbData) return;
                  setDbData({ grades: dbData.grades, heads: dbData.heads, students: dbData.students.map((s => s.regno !== studentEx.regno ? s : studentEx)) as Student[] });

                  try {

                    console.log('studentEx.marks', studentEx.marks);

                    axios.post(`/api/students`, studentEx.marks).then((v) => {
                      console.log(v.statusText);
                    }).catch((e) => {
                      console.log(e);
                    });
                  }
                  catch (e) {
                    console.log(e);
                  } 

                }}>Close</button></tr>
              </tbody>
        </table>
      </>}
    </div>
  );
}
