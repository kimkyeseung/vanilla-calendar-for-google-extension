function Component(options) {
}

Component.prototype.render = function() {
  var renderfunc = function (view, target) {
    for (var prop in view) {
      var node = view[prop];
      var buildEl = document.createElement(node.element);
  
      if (node.text) {
        buildEl.textContent = node.text;
      }
  
      if (node.attribute) {
        for (var attr in node.attribute) {
          buildEl.setAttribute(attr, node.attribute[attr]);
        }
      }
  
      target.appendChild(buildEl);

      if (node.children) {
        renderfunc(node.children, buildEl);
      }
    }
  }

  renderfunc(this.view, this.target);

  if (this.tasks) {//only for SignInProcess componenet
    var tasks = this.tasks;
    for (var prop in tasks) {
      if (!this.indicator.requirements[this.stage]) {
        this.indicator.requirements[this.stage] = {};
      }
      this.indicator.requirements[this.stage][prop] = false;
      var task = tasks[prop];
      var taskEl = document.createElement('input');

      var taskErr = document.createElement('p');
      taskErr.id = prop + 'Err';

      for (var attr in task) {
        if (attr === 'events') {
          if (Array.isArray(task[attr])) {
            for (let i = 0; i < task[attr].length; i++ ) {
              taskEl.addEventListener(task[attr][i].type, task[attr][i].handler);
            }
          } else {
            taskEl.addEventListener(task[attr].type, task[attr].handler);
          }
        } else {
          if (attr === 'title') {
            var title = document.createElement('p');
            title.textContent = task[attr];
            title.className = 'task_title';
            title.classList.add = task[attr];
            this.target.appendChild(title);
          } else if (attr === 'errorMessage') {
            taskErr.textContent = task[attr];
            taskErr.className = 'errorMessage';
            taskErr.style.display = 'none';
          } else {
            taskEl.setAttribute(attr, task[attr]);
          }
          
        }
      }
      this.target.appendChild(taskEl);
      this.target.appendChild(taskErr);
    }

    var submit = document.createElement('div');
    submit.className = 'btn disabled';
    submit.textContent = this.submit.text;
    submit.id = this.stage;
    submit.addEventListener('click', this.submit.handler);
    this.target.appendChild(submit);
  }
};

Component.prototype.destroy = function() {
  this.target.innerHTML = '';
}


//Base component
const Base = function(data) {
  this.view = data.node;
  this.target = data.target;
}

Base.prototype = Object.create(Component.prototype);
Base.prototype.constructor = Base;


//Sign in process component
const SignInProcess = function(data) {
  this.tasks = data.tasks;
  this.view = data.extra;
  this.target = data.target;   
  this.submit = data.submit;
  this.stage = data.stage;
};

SignInProcess.prototype = Object.create(Component.prototype);
SignInProcess.prototype.constructor = SignInProcess;

SignInProcess.prototype.indicator = {
  requirements: {},
  indicate: function(step) {
    let accept = true;
    for (var prop in this.requirements[step]) {
      if (!this.requirements[step][prop]) {
        accept = false;
      }
    }
    if (accept) {
      document.getElementById(step).classList.remove('disabled');
    } else {
      document.getElementById(step).classList.add('disabled');
    }
  }
}

SignInProcess.prototype.dataStorage = (function() {
  var storage = {};

  return {
    set: function(key, data) {
      Object.defineProperty(storage, key, {
        value: data,
        enumerable: true,
        writable: true
      });
      return storage[key];
    },
    get: function(key) {
      return storage[key];
    }
  }
})();