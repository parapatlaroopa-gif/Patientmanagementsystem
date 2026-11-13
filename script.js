
let patients = JSON.parse(
    localStorage.getItem("patients")
) || [];

// CREATE and UPDATE
function savePatient() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let disease = document.getElementById("disease").value;
    let phone = document.getElementById("phone").value;

    if (!name || !age || !gender || !disease || !phone) {
        alert("Please fill all details");
        return;
    }

    let editIndex = document.getElementById("editIndex").value;

    let patient = {
        name, age, gender, disease, phone
    };

    if (editIndex === "") {
        patients.push(patient);
        alert("Patient Added Successfully");
    } else {
        patients[Number(editIndex)] = patient;
        alert("Patient Updated Successfully");
    }

    localStorage.setItem("patients", JSON.stringify(patients));

    clearForm();
    displayPatients();
}

// READ
function displayPatients() {

    let list = document.getElementById("patientList");
    list.innerHTML = "";

    patients.forEach((p, index) => {

        list.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHTML(p.name)}</td>
            <td>${escapeHTML(p.age)}</td>
            <td>${escapeHTML(p.gender)}</td>
            <td>${escapeHTML(p.disease)}</td>
            <td>${escapeHTML(p.phone)}</td>
            <td>
                <button class="edit"
                    onclick="editPatient(${index})">
                    Edit
                </button>

                <button class="delete"
                    onclick="deletePatient(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

// UPDATE
function editPatient(index) {

    let p = patients[index];

    document.getElementById("name").value = p.name;
    document.getElementById("age").value = p.age;
    document.getElementById("gender").value = p.gender;
    document.getElementById("disease").value = p.disease;
    document.getElementById("phone").value = p.phone;

    document.getElementById("editIndex").value = index;
}

// DELETE
function deletePatient(index) {

    if (confirm("Are you sure you want to delete?")) {

        patients.splice(index, 1);

        localStorage.setItem(
            "patients",
            JSON.stringify(patients)
        );

        displayPatients();
        alert("Patient Deleted Successfully");
    }
}

// Clear Form
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("disease").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("editIndex").value = "";
}

// Prevent HTML injection in displayed values
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Display saved records when page loads
displayPatients();
