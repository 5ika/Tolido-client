// Config
var serveur = "http://" + location.hostname + ":3000";

//Init
var token = null,
    idProject = null,
    categories = ['all'];

// Au chargement de la page
$(document).ready(function() {
    token = $("#token").text();
    localStorage.setItem('token', token);
    $('.modal-trigger').leanModal();
    $('select').material_select();
    displayProjects();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
});

function toast(msg) {
    Materialize.toast(msg, 3000);
}

// Affiche une carte par projet
function displayProjects() {
    getProjects(function(projects) {
        for (var i = 0; i < projects.length; i++) {
            addToCategory(projects[i].category);
            $(".projects-cards").append(toCard(projects[i]));
        }
    });
}

// Ouvre le modal pour ajouter une tâche
function openAddTaskModal(selectedProjectId) {
    idProject = selectedProjectId;
    $('#addTaskModal').openModal();
}

function taskOptions(id, selectedProjectId) {
    if ($("#" + id + " > .taskOptions").is(':visible')) {
        $("#" + id + " > .taskOptions").slideUp();
    } else {
        $(".taskOptions").slideUp();
        $("#" + id + " > .taskOptions").slideDown();
    }
}

function addToCategory(category) {
    if (categories.indexOf(category) == -1) {
        categories.push(category);
        $(".categories").append(
            '<a class="collection-item"  href="#" onclick="displayCategory(\'' +
            category +
            '\')">' + category + '</a>');
    }
}

function displayCategory(category) {
    $('.card').slideDown();
    if (category != "all") {
        var indexCategory = categories.indexOf(category);
        $('.card:not(.category-' + indexCategory + ')').fadeOut();
    }
    $('#categoriesModal').closeModal();
}

function toggleView() {
    if ($(".projects-cards .s12").hasClass('m4'))
        $(".projects-cards .m4").removeClass('m4').addClass('m12');
    else $(".projects-cards .m12").removeClass('m12').addClass('m4');
}

function toggleFAB() {
    if ($("#fab").hasClass('active')) {
        $('.fixed-action-btn').closeFAB();
    } else $('.fixed-action-btn').openFAB();
}

function toUpdateTask(idTask, idProject) {
    getTask(idTask, idProject, function(task) {
        $("#updateTaskModal .taskName").val(task.name);
        $("#updateTaskModal .taskGroup").val(task.group);
        $("#updateTaskModal .taskDelay").val(formatDate(task.delay));
        $("#update-" + task.priority).prop("checked", true);
        $("#updateTaskModal .taskID").val(idTask);
        $("#updateTaskModal .projectID").val(idProject);
        $("#updateTaskModal").openModal();
    })
}

function toUpdateProject(idProject) {
    getProject(idProject, function(project) {
        $("#updateProjectModal .projectName").val(project.name);
        $("#updateProjectModal .projectDescription").val(project.description);
        $("#updateProjectModal .projectCategory").val(project.category);
        $("#updateProjectModal .projectID").val(idProject);
        $("#updateProjectModal").openModal();
    });
}

// Actualise les infos d'un projet
function refreshProject(id) {
    getProject(id, function(project) {
        $('#' + id).replaceWith(toCard(project));
    })
}

function getSelectedPriority(type = 'add') {
    if ($("#" + type + "-Important").is(':checked')) return "Important";
    else if ($("#" + type + "-Urgent").is(':checked')) return "Urgent";
    else return "Todo";
}

function formatDate(dateString) {
    if (dateString) {
        var date = new Date(dateString);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    } else return "Sélectionner une date de fin";
}
