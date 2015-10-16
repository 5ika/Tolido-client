function toCard(project) {
    var card = [];
    card.push("<div id='" + project._id + "' class='col s12 m4'>");
    card.push("<div class='card hoverable category-" +
        categories.indexOf(project.category) +
        "'>");
    card.push("<div class='close' onclick='deleteProject(\"" + project._id +
        "\")'>&times;</div>");
    card.push("<div class='card-content'>");
    // Titre
    card.push("<div class='card-header'>");
    card.push("<span class='card-title'>" + project.name + "</span>");
    card.push("<div>" + project.description + "</div>");
    card.push("</div>");
    // Tasks
    if (project.tasks && project.tasks.length > 0) {
        card.push("<ul class='collection'>");
        project.tasks.forEach(function(task) {
            if (task.done) {
                card.push("<li id='" + task._id +
                    "'class='collection-item done-task'>");
                card.push(task.name);
                card.push(" <span class='task-group'>" + task.group +
                    "</span>");
                card.push(
                    '<i class="fa fa-trash-o fa-lg" onclick="deleteTask(\'' +
                    task._id + '\', \'' + project._id + '\')"></i>'
                );
                card.push("</li>");
            } else {
                card.push("<li id='" + task._id +
                    "'class='collection-item'>");
                card.push(
                    "<div class='taskInfos' onclick='taskOptions(\"" +
                    task._id + "\", \"" + project._id + "\")'>" +
                    task.name);
                card.push(" <span class='task-group'>" + task.group +
                    "</span>");
                card.push(getTaskPriority(task.priority));
                card.push("</div><div class='taskOptions'>" +
                    getTaskOptions(task._id, project._id) +
                    "</div></li>");
            }
        });
        card.push("</ul>");
    }

    // Actions
    card.push("<div class='card-action'>");
    card.push(
        "<a class='waves-effect waves-light btn modal-trigger' onclick='openAddTaskModal(\"" +
        project._id + "\")'>Nouvelle tâche</a>"
    );
    card.push("</div></div></div></div>");
    return card.join('');
}


function getTaskOptions(id, projectId) {
    var options =
        '<div class="row"><i class="fa fa-trash-o fa-2x col s6" onclick="deleteTask(\'' +
        id +
        '\', \'' + projectId +
        '\')"></i><i class="fa fa-check fa-2x col s6" onclick="validTask(\'' +
        id +
        '\',\'' + projectId +
        '\')"></i></div>';
    return options;
}

function getTaskPriority(priority) {
    var icone = null;
    switch (priority) {
        case "Important":
            icone =
                "<i class=' secondary-content fa fa-circle fa-lg orange-text'></i>";
            break;
        case "Urgent":
            icone =
                "<i class=' secondary-content fa fa-circle fa-lg red-text'></i>";
            break;
        default:
            icone =
                "<i class=' secondary-content fa fa-circle fa-lg yellow-text'></i>";
    }
    return icone;
}
