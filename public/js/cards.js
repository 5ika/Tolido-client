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
