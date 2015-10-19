var workflowsLookup = {};
var jobsLookup = {};


function processWorkflows(/*Array*/ data){
	var i, imax, j, jmax, job;
	for(i = 0, imax = data.length; i < imax; i++){
		var workflow = data[i];
		workflows.innerHTML += '<option value="'+ workflow.id +'">'+ workflow.title +'</option>';
		workflowsLookup[workflow.id] = workflow;
		console.log(workflow);

		for(j = 0, jmax = workflow.jobs.length; j < jmax; j++) {
			job = workflow.jobs[j];
			jobsLookup[job.id] = job;
		}

		if(i === 0) {
			populateJobs(workflow.id);
		}
	}
}

function onWorkflowSelected(event){
	var wfId = event.target.value;
	populateJobs(wfId);
}

function populateJobs(wfId){
	var jobsData = workflowsLookup[wfId].jobs;
	var i, imax, job, htmlString = '';
 
	for(i = 0, imax = jobsData.length; i < imax; i++){
		job = jobsData[i];
		htmlString += '<option value="'+ job.id +'">'+ job.title +'</option>';

	}
	jobs.innerHTML = htmlString;

}
// app initialisation
function init(){
	// data is from the server; currently in in data.js
	processWorkflows(data);

	workflows.addEventListener('change', onWorkflowSelected);



	addWorkflow.addEventListener('click', function(){
		var source = $('#tpl').html();
		var RAND_TEMPLATE = Handlebars.compile(source);
		var workflow, selectedWorkflowId;

		selectedWorkflowId = workflows.value;
		workflow = workflowsLookup[selectedWorkflowId];


		var tr = view.querySelector('#' + workflow.id);
		console.log(tr + ' - this is the table row id');

		if(!tr) {
			var html = RAND_TEMPLATE({
				title: workflow.title,
				id: workflow.id,
				priceValue: 0,
				currency: '£'
			});
			view.innerHTML += html;

		} 
	});
	
	$('#workflowsView').on('click', '.btnRemove', function(event){
		$('tr#' + event.target.dataset.id).remove();
	});
	

	addJob.addEventListener('click', function(){
		var wfId = workflows.value;

		var jobsContainer = document.querySelector('#' + wfId + ' .wf-jobs');
		console.log(jobsContainer + ' ' + 'this is the jobs container');
		var jobsData = workflowsLookup[wfId].jobs;

		var jobValue = jobsLookup[jobs.value].id;
		var jobTitle = jobsLookup[jobs.value].title;

		// var myPrice = $('.priceWrap').append('<div id="'+ jobValue +'"><input type="text" class="price" value=""></div>');

		var wrapper = document.createElement('div');
		wrapper.innerHTML = '<div id="'+ jobValue +'"></div>' + jobTitle + '<button class="xbutton glyphicon glyphicon-remove" data-job-id="'+ jobValue +'" ></button>'

		jobsContainer.appendChild(wrapper);
		
	});
	
	$('#workflowsView').on('click', '.btnClearJobs', function(event){
		// $('div#' + event.target.dataset.jobid.remove();
		var jobId = $('.btnClearJobs').data('jobid');
		$('.wf-jobs').html('');		
	});

	$('#workflowsView').on('click', '[data-job-id]', function(event){
		var parinte = event.target.parentElement;
		var jd = $('.xbutton').data('job-id');
		var p = $('#' + jd);

		$(parinte).remove();
		$(p).remove();
		// data.html('');
		
		// $('#' + jobData).remove();
		// console.log(p);
		
	});

	$('#submitMyForm').click(function(){
		$('.workflow_tr').remove();
		$('input, select').val('');
		alert('Form submited')
	});		
}
