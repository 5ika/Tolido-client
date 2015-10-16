//Récupère la liste les projets
function getProjects(callback) {
    sendRequestToAPI('GET', '/', null, function(projects) {
        projects.sort(function(a, b) {
            return b.tasks.length - a.tasks.length
        })
        if (projects) callback(projects);
    })
}

// Ajoute une nouvelle tâche
function addTask() {
    var newTask = {
        name: $('#taskName').val(),
        group: taskGroup = $('#taskGroup').val(),
        priority: taskPriority = $('#taskPriority').val()
    }
    sendRequestToAPI('POST', '/' + idProject, newTask, function(response) {
        if (response.hasOwnProperty('result') && response.result ==
            "success") {
            $('#addTaskModal').closeModal();
            toast("Tâche ajoutée");
            $('#taskName').val('');
            $('#taskGroup').val('');
            refreshProject(idProject);
        }
    })
}

// Actualise les infos d'un projet
function refreshProject(id) {
    sendRequestToAPI('GET', '/' + id, null, function(project) {
        $('#' + id).replaceWith(toCard(project));
    })
}

// Supprime une tâche
function deleteTask(id, projectId) {
    sendRequestToAPI('DELETE', '/' + projectId + '/' + id, null, function(
        response) {
        if (response.hasOwnProperty('result') && response.result ==
            "success") {
            toast("Tâche supprimée");
            refreshProject(projectId);
        }
    });
}

// Valide une tâche
function validTask(id, projectId) {
    sendRequestToAPI('PUT', '/' + projectId + '/' + id, null, function(
        response) {
        if (response.hasOwnProperty('result') && response.result ==
            "success") {
            toast("Tâche validée");
            refreshProject(projectId);
        }
    });
}

// Supprime un projet
function deleteProject(id) {
    if (confirm("Êtes-vous certain de vouloir supprimer le projet ?"))
        sendRequestToAPI('DELETE', '/' + id, null, function(response) {
            if (response.hasOwnProperty('result') && response.result ==
                "success") {
                toast("Projet supprimé");
                $('#' + id).remove();
            }
        })
}

// Ajoute un projet
function addProject() {
    var newProject = {
        name: $('#projectName').val(),
        description: taskGroup = $('#projectDescription').val(),
        category: taskPriority = $('#projectCategory').val(),
        date: Date.now
    }
    sendRequestToAPI('POST', '/', newProject, function(project) {
        $('#addProjectModal').closeModal();
        toast("Projet ajouté");
        $(".projects-cards").append(toCard(project));
        $('#projectName').val('');
        $('#projectDescription').val('');
        $('#projectCategory').val('');
    })
}

// Lance les requêtes à l'API avec tous les paramètres
function sendRequestToAPI(type, path, data, callback) {
    $.ajax({
        url: serveur + "/api" + path,
        crossDomain: true,
        method: type,
        data: data,
        headers: {
            'x-access-token': token
        }
    }).done(function(data) {
        callback(data);
    }).fail(function(data) {
        console.log(data);
        toast("Erreur lors de la requête à l'API");
        callback(null)
    });
}
