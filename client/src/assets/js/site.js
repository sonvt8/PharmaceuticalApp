
$(document).ready(function() {
    $('#tblData').dataTable({
        "bDestroy": true
    }).fnDestroy();

    $('#tblData').dataTable({
        "aoColumnDefs": [{
            "bSortable": false,
            "aTargets": ["sorting_disabled"]
        }],
        "bDestroy": true
    }).fnDestroy();
} );