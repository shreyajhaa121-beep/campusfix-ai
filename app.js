// ==========================================
// CampusFix AI - Application Logic
// ==========================================


// ------------------------------------------
// Default Sample Complaints
// ------------------------------------------

const defaultComplaints = [
  {
    id: "CF-2026-001",
    title: "Water supply not working",
    type: "Hostel",
    category: "Water & Plumbing",
    location: "Hostel Block B",
    description: "Water supply has stopped and students are affected.",
    status: "Pending",
    priority: "High",
    authority: "Hostel Warden",
    createdAt: "2026-08-29"
  },
  {
    id: "CF-2026-002",
    title: "Wi-Fi not working",
    type: "College",
    category: "Wi-Fi & Internet",
    location: "College 2nd Floor",
    description: "Internet connection is unavailable in multiple classrooms.",
    status: "In Progress",
    priority: "Medium",
    authority: "College Safety Department",
    createdAt: "2026-08-26"
  },
  {
    id: "CF-2026-003",
    title: "Broken classroom light",
    type: "College",
    category: "Electrical",
    location: "Classroom 204",
    description: "The classroom light is not working.",
    status: "Resolved",
    priority: "Low",
    authority: "College Safety Department",
    createdAt: "2026-08-20"
  },
  {
    id: "CF-2026-004",
    title: "Security issue near hostel gate",
    type: "Hostel",
    category: "Security",
    location: "Hostel Main Gate",
    description: "Security concern reported and still unresolved.",
    status: "Escalated",
    priority: "High",
    authority: "College Main Authority",
    createdAt: "2026-08-18"
  }
];


// ------------------------------------------
// Load Complaints from Local Storage
// ------------------------------------------

let complaints;

try {

  const savedComplaints =
    localStorage.getItem("campusFixComplaints");

  if (savedComplaints) {

    complaints =
      JSON.parse(savedComplaints);

  } else {

    complaints =
      [...defaultComplaints];

    saveComplaints();
  }

} catch (error) {

  complaints =
    [...defaultComplaints];

  saveComplaints();
}


// ------------------------------------------
// Save Complaints
// ------------------------------------------

function saveComplaints() {

  localStorage.setItem(
    "campusFixComplaints",
    JSON.stringify(complaints)
  );
}


// ------------------------------------------
// Show Report Form
// ------------------------------------------

function showReportForm() {

  const reportSection =
    document.getElementById("reportSection");

  const detailsSection =
    document.getElementById("detailsSection");

  if (detailsSection) {
    detailsSection.classList.add("hidden");
  }

  if (reportSection) {

    reportSection.classList.remove(
      "hidden"
    );

    reportSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// ------------------------------------------
// Show Dashboard
// ------------------------------------------

function showDashboard() {

  const dashboard =
    document.getElementById("dashboard");

  if (dashboard) {

    dashboard.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// ------------------------------------------
// Generate Complaint ID
// ------------------------------------------

function generateComplaintId() {

  const randomNumber =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return "CF-2026-" + randomNumber;
}


// ------------------------------------------
// Determine Authority
// ------------------------------------------

function getAuthority(type) {

  if (type === "Hostel") {

    return "Hostel Warden";
  }

  return "College Safety Department";
}


// ------------------------------------------
// Calculate Priority
// ------------------------------------------

function calculatePriority(
  category,
  description
) {

  const text =
    (
      category +
      " " +
      description
    ).toLowerCase();


  if (

    text.includes("security") ||
    text.includes("danger") ||
    text.includes("fire") ||
    text.includes("water")

  ) {

    return "High";
  }


  if (

    text.includes("electrical") ||
    text.includes("wifi") ||
    text.includes("wi-fi") ||
    text.includes("internet")

  ) {

    return "Medium";
  }


  return "Low";
}


// ------------------------------------------
// Get Status CSS Class
// ------------------------------------------

function getStatusClass(status) {

  if (status === "In Progress") {

    return "progress";
  }

  return status
    .toLowerCase()
    .replace(/\s+/g, "-");
}


// ------------------------------------------
// Render Dashboard Statistics
// ------------------------------------------

function renderStats() {

  const total =
    complaints.length;


  const pending =
    complaints.filter(
      complaint =>
        complaint.status === "Pending"
    ).length;


  const inProgress =
    complaints.filter(
      complaint =>
        complaint.status ===
        "In Progress"
    ).length;


  const overdue =
    complaints.filter(
      complaint =>
        complaint.status ===
        "Escalated"
    ).length;


  const totalElement =
    document.getElementById(
      "totalIssues"
    );

  const pendingElement =
    document.getElementById(
      "pendingIssues"
    );

  const progressElement =
    document.getElementById(
      "progressIssues"
    );

  const overdueElement =
    document.getElementById(
      "overdueIssues"
    );


  if (totalElement) {

    totalElement.textContent =
      total;
  }


  if (pendingElement) {

    pendingElement.textContent =
      pending;
  }


  if (progressElement) {

    progressElement.textContent =
      inProgress;
  }


  if (overdueElement) {

    overdueElement.textContent =
      overdue;
  }
}


// ------------------------------------------
// Render Complaint List
// ------------------------------------------

function renderComplaints() {

  const complaintsList =
    document.getElementById(
      "complaintsList"
    );


  if (!complaintsList) {

    return;
  }


  complaintsList.innerHTML = "";


  if (complaints.length === 0) {

    complaintsList.innerHTML = `
      <p>
        No complaints found.
      </p>
    `;

    return;
  }


  complaints
    .slice()
    .reverse()
    .forEach(function (complaint) {


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "complaint-card";


      card.style.cursor =
        "pointer";


      card.innerHTML = `

        <h3>
          ${complaint.title}
        </h3>

        <p>
          ${complaint.description}
        </p>

        <div class="complaint-meta">

          <span>
            📍 ${complaint.location}
          </span>

          <span>
            🏷️ ${complaint.category}
          </span>

          <span>
            👤 ${complaint.authority}
          </span>

          <span>
            🔥 ${complaint.priority}
            Priority
          </span>

          <span
            class="status ${getStatusClass(
              complaint.status
            )}"
          >
            ${complaint.status}
          </span>

        </div>

      `;


      card.addEventListener(
        "click",
        function () {

          showComplaintDetails(
            complaint.id
          );

        }
      );


      complaintsList.appendChild(
        card
      );

    });
}


// ------------------------------------------
// Show Complaint Details
// ------------------------------------------

function showComplaintDetails(id) {

  const complaint =
    complaints.find(
      item => item.id === id
    );


  if (!complaint) {

    return;
  }


  const detailsSection =
    document.getElementById(
      "detailsSection"
    );


  const complaintDetails =
    document.getElementById(
      "complaintDetails"
    );


  const reportSection =
    document.getElementById(
      "reportSection"
    );


  if (!detailsSection ||
      !complaintDetails) {

    return;
  }


  if (reportSection) {

    reportSection.classList.add(
      "hidden"
    );
  }


  complaintDetails.innerHTML = `

    <div class="complaint-detail-card">

      <h2>
        ${complaint.title}
      </h2>

      <p>
        ${complaint.description}
      </p>

      <hr>

      <p>
        <strong>
          Complaint ID:
        </strong>
        ${complaint.id}
      </p>

      <p>
        <strong>
          Type:
        </strong>
        ${complaint.type}
      </p>

      <p>
        <strong>
          Category:
        </strong>
        ${complaint.category}
      </p>

      <p>
        <strong>
          Location:
        </strong>
        ${complaint.location}
      </p>

      <p>
        <strong>
          Priority:
        </strong>
        ${complaint.priority}
      </p>

      <p>
        <strong>
          Authority:
        </strong>
        ${complaint.authority}
      </p>

      <p>
        <strong>
          Status:
        </strong>
        ${complaint.status}
      </p>

      <p>
        <strong>
          Submitted:
        </strong>
        ${complaint.createdAt}
      </p>

    </div>

  `;


  detailsSection.classList.remove(
    "hidden"
  );


  detailsSection.scrollIntoView({
    behavior: "smooth"
  });
}


// ------------------------------------------
// Close Complaint Details
// ------------------------------------------

function closeDetails() {

  const detailsSection =
    document.getElementById(
      "detailsSection"
    );


  if (detailsSection) {

    detailsSection.classList.add(
      "hidden"
    );
  }


  const complaintsSection =
    document.getElementById(
      "complaintsSection"
    );


  if (complaintsSection) {

    complaintsSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// ------------------------------------------
// Handle New Complaint Form
// ------------------------------------------

const complaintForm =
  document.getElementById(
    "complaintForm"
  );


if (complaintForm) {


  complaintForm.addEventListener(
    "submit",
    function (event) {


      event.preventDefault();


      const type =
        document.getElementById(
          "complaintType"
        ).value;


      const category =
        document.getElementById(
          "category"
        ).value;


      const title =
        document.getElementById(
          "title"
        ).value;


      const location =
        document.getElementById(
          "location"
        ).value;


      const description =
        document.getElementById(
          "description"
        ).value;


      const newComplaint = {

        id:
          generateComplaintId(),

        title:
          title,

        type:
          type,

        category:
          category,

        location:
          location,

        description:
          description,

        status:
          "Pending",

        priority:
          calculatePriority(
            category,
            description
          ),

        authority:
          getAuthority(type),

        createdAt:
          new Date()
            .toISOString()
            .split("T")[0]

      };


      complaints.push(
        newComplaint
      );


      saveComplaints();


      renderStats();


      renderComplaints();


      complaintForm.reset();


      alert(
        "Complaint submitted successfully!\n\n" +

        "Complaint ID: " +

        newComplaint.id +

        "\n\nAssigned to: " +

        newComplaint.authority
      );


      const reportSection =
        document.getElementById(
          "reportSection"
        );


      if (reportSection) {

        reportSection.classList.add(
          "hidden"
        );
      }


      const complaintsSection =
        document.getElementById(
          "complaintsSection"
        );


      if (complaintsSection) {

        complaintsSection.scrollIntoView({
          behavior: "smooth"
        });
      }

    }
  );

}


// ------------------------------------------
// Initial Application Render
// ------------------------------------------

renderStats();

renderComplaints();
