// CampusFix AI - Application Logic

const complaints = [
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


// Show Report Form

function showReportForm() {

  const reportSection =
    document.getElementById("reportSection");

  reportSection.classList.remove("hidden");

  reportSection.scrollIntoView({
    behavior: "smooth"
  });

}


// Show Dashboard

function showDashboard() {

  document
    .getElementById("dashboard")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// Generate Complaint ID

function generateComplaintId() {

  return "CF-2026-" +
    Math.floor(100 + Math.random() * 900);

}


// Determine Authority

function getAuthority(type) {

  if (type === "Hostel") {
    return "Hostel Warden";
  }

  return "College Safety Department";

}


// Determine Priority

function calculatePriority(category, description) {

  const text =
    (category + " " + description)
      .toLowerCase();


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


// Get Status CSS Class

function getStatusClass(status) {

  if (status === "In Progress") {
    return "progress";
  }

  return status.toLowerCase();

}


// Render Dashboard Statistics

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
        complaint.status === "In Progress"
    ).length;


  const overdue =
    complaints.filter(
      complaint =>
        complaint.status === "Escalated"
    ).length;


  document
    .getElementById("totalIssues")
    .textContent = total;


  document
    .getElementById("pendingIssues")
    .textContent = pending;


  document
    .getElementById("progressIssues")
    .textContent = inProgress;


  document
    .getElementById("overdueIssues")
    .textContent = overdue;

}


// Render Complaint List

function renderComplaints() {

  const complaintsList =
    document.getElementById("complaintsList");


  complaintsList.innerHTML = "";


  complaints
    .slice()
    .reverse()
    .forEach(complaint => {


      const card =
        document.createElement("div");


      card.className =
        "complaint-card";


      // Make every complaint card clickable

      card.onclick =
        function () {

          showComplaintDetails(
            complaint.id
          );

        };


      card.innerHTML = `

        <h3>${complaint.title}</h3>

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
            🔥 ${complaint.priority} Priority
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


      complaintsList.appendChild(card);

    });

}


// Show Complaint Details

function showComplaintDetails(complaintId) {

  const complaint =
    complaints.find(
      item =>
        item.id === complaintId
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


  const submissionDate =
    new Date(
      complaint.createdAt
    ).toLocaleDateString();


  const deadlineDate =
    new Date(
      complaint.createdAt
    );


  deadlineDate.setDate(
    deadlineDate.getDate() + 7
  );


  complaintDetails.innerHTML = `

    <div class="details-card">

      <h3>
        ${complaint.title}
      </h3>


      <p>
        ${complaint.description}
      </p>


      <div class="details-grid">


        <div class="detail-item">

          <strong>
            Complaint ID
          </strong>

          ${complaint.id}

        </div>


        <div class="detail-item">

          <strong>
            Status
          </strong>

          ${complaint.status}

        </div>


        <div class="detail-item">

          <strong>
            Priority
          </strong>

          ${complaint.priority}

        </div>


        <div class="detail-item">

          <strong>
            Category
          </strong>

          ${complaint.category}

        </div>


        <div class="detail-item">

          <strong>
            Location
          </strong>

          ${complaint.location}

        </div>


        <div class="detail-item">

          <strong>
            Complaint Type
          </strong>

          ${complaint.type}

        </div>


        <div class="detail-item">

          <strong>
            Assigned Authority
          </strong>

          ${complaint.authority}

        </div>


        <div class="detail-item">

          <strong>
            Submitted On
          </strong>

          ${submissionDate}

        </div>


        <div class="detail-item">

          <strong>
            Resolution Deadline
          </strong>

          ${deadlineDate.toLocaleDateString()}

        </div>


      </div>

    </div>

  `;


  detailsSection
    .classList
    .remove("hidden");


  detailsSection
    .scrollIntoView({
      behavior: "smooth"
    });

}


// Close Complaint Details

function closeDetails() {

  document
    .getElementById("detailsSection")
    .classList
    .add("hidden");


  document
    .getElementById("complaintsSection")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// Handle New Complaint Submission

document
  .getElementById("complaintForm")
  .addEventListener(
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


      // Add complaint to list

      complaints.push(
        newComplaint
      );


      // Update dashboard

      renderStats();


      // Re-render complaint cards
      // New complaint will also be clickable

      renderComplaints();


      // Reset form

      document
        .getElementById(
          "complaintForm"
        )
        .reset();


      alert(
        "Complaint submitted successfully!\n\n" +
        "Complaint ID: " +
        newComplaint.id +
        "\nAssigned to: " +
        newComplaint.authority
      );


      // Go to complaint list

      document
        .getElementById(
          "complaintsSection"
        )
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


// Initial Application Render

renderStats();

renderComplaints();
