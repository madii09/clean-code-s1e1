//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const addButton = document.getElementById('add-task');
  const incompleteTaskHolder = document.getElementById('incompleteTasks');
  const completedTasksHolder = document.getElementById('completed-tasks');

  const createNewTaskElement = (taskString) => {
    const listItem = document.createElement('li');

    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const deleteButtonImg = document.createElement('img');

    checkBox.type = 'checkbox';
    editInput.type = 'text';
    editInput.className = 'task';

    label.innerText = taskString;
    label.className = 'task';

    editButton.innerText = 'Edit';
    editButton.className = 'edit';

    deleteButton.className = 'delete';
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
  };

  const addTask = () => {
    if (!taskInput.value.trim()) return;
    const listItem = createNewTaskElement(taskInput.value.trim());
    incompleteTaskHolder.appendChild(listItem);
    taskInput.value = '';
  };

  const editTask = (e) => {
    const listItem = e.target.closest('li');
    const editInput = listItem.querySelector('input[type="text"]');
    const label = listItem.querySelector('label');
    const editBtn = listItem.querySelector('.edit');

    if (listItem.classList.contains('editMode')) {
      label.innerText = editInput.value;
      editBtn.innerText = 'Edit';
    } else {
      editInput.value = label.innerText;
      editBtn.innerText = 'Save';
    }

    listItem.classList.toggle('editMode');
  };

  const deleteTask = (e) => {
    const listItem = e.target.closest('li');
    listItem.remove();
  };

  const taskCompleted = (e) => {
    const listItem = e.target.closest('li');
    completedTasksHolder.appendChild(listItem);
  };

  const taskIncomplete = (e) => {
    const listItem = e.target.closest('li');
    incompleteTaskHolder.appendChild(listItem);
  };

  incompleteTaskHolder.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit')) editTask(e);
    if (e.target.classList.contains('delete') || e.target.tagName === 'IMG')
      deleteTask(e);
  });

  completedTasksHolder.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete') || e.target.tagName === 'IMG')
      deleteTask(e);
  });

  incompleteTaskHolder.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') taskCompleted(e);
  });

  completedTasksHolder.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') taskIncomplete(e);
  });

  addButton.addEventListener('click', addTask);
});

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
