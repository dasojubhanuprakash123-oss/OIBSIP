const STORAGE_KEY='daymark-tasks-v1';
const form=document.getElementById('taskForm');
const input=document.getElementById('taskInput');
const list=document.getElementById('taskList');
const empty=document.getElementById('emptyState');
const toast=document.getElementById('toast');
let tasks=loadTasks();
let activeFilter='all';
let toastTimer;

function loadTasks(){try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(saved)?saved.filter(t=>t&&typeof t.id==='string'&&typeof t.text==='string'&&typeof t.completed==='boolean'):[]}catch{return []}}
function saveTasks(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));document.getElementById('footerMessage').textContent='Your tasks stay saved in this browser.'}catch{document.getElementById('footerMessage').textContent='Storage is unavailable; tasks may not persist after closing.'}}
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}
function visibleTasks(){return tasks.filter(task=>activeFilter==='all'||(activeFilter==='active'&&!task.completed)||(activeFilter==='completed'&&task.completed))}
function render(){
 const done=tasks.filter(t=>t.completed).length,remaining=tasks.length-done,percent=tasks.length?Math.round(done/tasks.length*100):0;
 document.getElementById('taskCount').textContent=`${tasks.length} ${tasks.length===1?'TASK':'TASKS'}`;
 document.getElementById('allCount').textContent=tasks.length;
 document.getElementById('activeCount').textContent=remaining;
 document.getElementById('completedCount').textContent=done;
 document.getElementById('remainingStat').textContent=remaining;
 document.getElementById('finishedStat').textContent=done;
 document.getElementById('progressPercent').textContent=`${percent}%`;
 document.getElementById('progressRing').style.setProperty('--progress',`${percent*3.6}deg`);
 document.getElementById('progressMessage').textContent=!tasks.length?'Every small step counts. Add a task to get started.':percent===100?'You did it. Take a moment to appreciate your progress.':`${remaining} ${remaining===1?'task':'tasks'} left. Keep going at your own pace.`;
 document.querySelectorAll('.filter').forEach(button=>{const active=button.dataset.filter===activeFilter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
 list.replaceChildren();
 const shown=visibleTasks();
 shown.forEach(task=>{
  const item=document.createElement('li');item.className=`task-item${task.completed?' done':''}`;
  const check=document.createElement('button');check.type='button';check.className='task-check';check.setAttribute('aria-label',task.completed?'Mark task as not completed':'Mark task as completed');check.setAttribute('aria-pressed',String(task.completed));check.textContent=task.completed?'✓':'';
  check.addEventListener('click',()=>{task.completed=!task.completed;saveTasks();render();notify(task.completed?'Task completed':'Task marked as to do')});
  const text=document.createElement('span');text.className='task-text';text.textContent=task.text;
  const remove=document.createElement('button');remove.type='button';remove.className='task-delete';remove.setAttribute('aria-label',`Delete task: ${task.text}`);remove.textContent='×';remove.addEventListener('click',()=>{tasks=tasks.filter(t=>t.id!==task.id);saveTasks();render();notify('Task deleted')});
  item.append(check,text,remove);list.appendChild(item);
 });
 empty.hidden=shown.length!==0;
 if(!shown.length){const title=empty.querySelector('h3'),copy=empty.querySelector('p');if(activeFilter==='active'){title.textContent='Nothing left to do.';copy.textContent='You have no active tasks right now.'}else if(activeFilter==='completed'){title.textContent='Not checked off yet.';copy.textContent='Completed tasks will appear here.'}else{title.textContent='Clear space, clear mind.';copy.textContent='Add your first task above and make a little progress.'}}
 document.getElementById('clearCompleted').disabled=done===0;
 document.getElementById('clearCompleted').style.opacity=done===0?'.45':'1';
}
form.addEventListener('submit',event=>{event.preventDefault();const text=input.value.trim();if(!text){notify('Enter a task first');input.focus();return}tasks.unshift({id:globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`,text,completed:false,createdAt:Date.now()});saveTasks();activeFilter='all';input.value='';render();input.focus();notify('Task added')});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;render()}));
document.getElementById('clearCompleted').addEventListener('click',()=>{const before=tasks.length;tasks=tasks.filter(task=>!task.completed);if(tasks.length===before)return;saveTasks();render();notify('Completed tasks cleared')});
const date=new Date();document.getElementById('todayLabel').textContent=date.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'}).toUpperCase();
render();
