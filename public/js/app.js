let editId = null;
const form = document.getElementById("studentForm");

form.addEventListener("submit", addStudent);

async function addStudent(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        age: document.getElementById("age").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,
    };

    if (editId) {

    await fetch(`/students/${editId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

    editId = null;

} else {

    await fetch("/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

}
form.reset();

document.querySelector("button").innerText = "Add Student";

getStudents();
    const data = await response.json();

    console.log(data);
    form.reset();
    getStudents();
}

async function getStudents() {
    const response = await fetch("/students");

    const data = await response.json();

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    data.students.forEach((student) => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.age}</td>
                <td>${student.mobile}</td>
                <td>${student.address}</td>
                <td>
    <button  id= "edit" onclick="editStudent('${student._id}')">Edit</button>

    <button id="delete" onclick="deleteStudent('${student._id}')">Delete</button>
</td>
            </tr>
        `;
    });
}

getStudents();

async function deleteStudent(id) {

    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) return;

    await fetch(`/students/${id}`, {
        method: "DELETE"
    });

    getStudents();
}

async function editStudent(id) {

    const response = await fetch("/students");

    const data = await response.json();

    const student = data.students.find((item) => item._id === id);

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.getElementById("age").value = student.age;
    document.getElementById("mobile").value = student.mobile;
    document.getElementById("address").value = student.address;

    editId = id;

    document.querySelector("button").innerText = "Update Student";
} 