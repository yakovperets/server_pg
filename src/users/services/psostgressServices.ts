import { client } from "../../dataAccess/postgress";
export interface Teacher {
  teacher_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  department: string;
  hire_date: string;
}
export const executeQuery = async (query: string, values: any[] = []) => {
  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};
//כלל המורים
export const getTeachers = async () => {
  try {
    const query = "SELECT * FROM Bar_ilan.teachers";
    const result = await executeQuery(query);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};
//מורה יחיד

export const getTeacherById = async (teacherId: number) => {
  try {
    const query = "SELECT * FROM Bar_ilan.teachers WHERE teacher_id = $1";
    const values = [teacherId];

    const result = await executeQuery(query, values);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};

export const createTeacher = async (newTeacher: Teacher) => {
  try {
    const query = `
      INSERT INTO Bar_ilan.teachers (first_name, last_name, date_of_birth, email, department, hire_date)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
      newTeacher.first_name,
      newTeacher.last_name,
      newTeacher.date_of_birth,
      newTeacher.email,
      newTeacher.department,
      newTeacher.hire_date,
    ];

    await executeQuery(query, values);

    console.log("Teacher record inserted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};
//עדכון שדה בטבלה
export const updateTeacher = async (
  teacherId: number,
  field: string,
  value: string
) => {
  try {
    const values = [teacherId, value];
    const selectValues = [teacherId];
    await executeQuery("BEGIN");
    const query = `
      UPDATE Bar_ilan.teachers
      SET ${field} = $2
      WHERE teacher_id = $1
    `;
    const selectQuery = `
      SELECT * FROM Bar_ilan.teachers
      WHERE teacher_id = $1
    `;

    await executeQuery(query, values);
    const result = await executeQuery(selectQuery, selectValues);
    await executeQuery("COMMIT");
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
//מחיקת יוזר
export const deleteTeacher = async (teacherId: number) => {
  try {
    const query = `
      DELETE FROM Bar_ilan.teachers
      WHERE teacher_id = $1
    `;

    const values = [teacherId];

    await executeQuery(query, values);

    console.log(`Teacher with ID ${teacherId} deleted`);
  } catch (error) {
    console.error("Error:", error);
  }
};
