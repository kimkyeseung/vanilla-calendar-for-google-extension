const base = new Base({
  target: document.getElementById('root'),
  node: {
    container: {
      element: 'div',
      attribute: {
        class: 'container',
        id: 'container'
      },
      children: {
        head: {
          element: 'h1',
          text: '회원가입 마법사',
          attribute: {
            id: 'title',
            class: 'head'
          }
        },
        subtitle: {
          element: 'p',
          text: '회원가입하시고 마일리지 쌓으세요',
          attribute: {
            class: 'head sub'
          }
        },
        form: {
          element: 'form',
          attribute: {
            id: 'form'
          }
        }
      }
    }
  }
});

base.render();


const step1 = new SignInProcess({
  stage: 'step1',
  target: document.getElementById('form'),
  tasks: {
    agreementCheck: {
      type: 'checkbox',
      id: 'agree',
      events: {
        type: 'click',
        handler: function (ev) {
          if (ev.target.checked === true) {
            step1.indicator.requirements.step1.agreementCheck = true;
            step1.indicator.indicate(step1.stage);
          }
          if (ev.target.checked === false) {
            step1.indicator.requirements.step1.agreementCheck = false;
            step1.indicator.indicate(step1.stage);
          }
        }
      }
    }
  },
  extra: {
    terms: {
      element: 'textarea',
      text: '제1조(목적)\n이 약관은 그냥 공부를 위한 샘플 약관입니다.\n\n제2조(내용)\n귀하는 소중한 정보는 불우이웃을 위해 사용됩니다.\n\n제3조(기타)\n옛날 옛날 한 옛날에 다섯 아이가 아주 멀리 아주 멀리 사라졌다네...',
      attribute: {
        class: 'terms',
        readonly: 'true'
      }
    },
    agreementLabel: {
      element: 'label',
      text: '이용약관을 잘 읽었으며 동의합니다.',
      attribute: {
        for: 'agree'
      }
    }
  },
  submit: {
    text: 'Go Next',
    handler: function (ev) {
      if (ev.target.classList.contains('disabled')) {
        return;
      } else {
        step1.destroy();
        step2.render();
      }
    }
  }
});

const step2 = new SignInProcess({
  stage: 'step2',
  target: document.getElementById('form'),
  tasks: {
    email: {
      title: '이메일',
      type: 'email',
      placeholder: 'something@vanilla.co',
      events: [{
        type: 'keyup',
        handler: function(ev) {
          let flag = true;
          let mark = ev.target.value.indexOf('@');
          let dot = ev.target.value.indexOf('.');
          let space = ev.target.value.indexOf(' ');
          if (mark < 1) {
            flag = false;
          }
          if (dot <= mark + 2) {
            flag = false;
          }
          if (space > 0) {
            flag = false;
          }

          if (flag) {
            document.getElementById('emailErr').style.display = 'none';
            step2.indicator.requirements.step2.email = true;
            step2.indicator.indicate(step2.stage);
          } else {
            document.getElementById('emailErr').style.display = 'block';
            step2.indicator.requirements.step2.email = false;
            step2.indicator.indicate(step2.stage);
          }
        },
      }, {
        type: 'blur',
        handler: function(ev) {
          step2.dataStorage.set('email', ev.target.value);
        }
      }],
      errorMessage: "이메일 형식에 맞지 않습니다."
    },
    password: {
      title: '비밀번호',
      type: 'password',
      events: [{
        type: 'keyup',
        handler: function(ev) {
          if (ev.target.value.length > 6) {
            document.getElementById('passwordErr').style.display = 'none';
            step2.indicator.requirements.step2.password = true;
            step2.indicator.indicate(step2.stage);
          } else {
            document.getElementById('passwordErr').style.display = 'block';
            step2.indicator.requirements.step2.password = false;
            step2.indicator.indicate(step2.stage);
          }
        },
      }, {
        type: 'blur',
        handler: function(ev) {
          step2.dataStorage.set('password', ev.target.value)
        }
      },{
        type: 'focus',
        handler: function() {
          document.querySelectorAll('input[type=password]')[1].value = null;
          document.getElementById('passwordConfirmErr').style.display = 'none';
        }
      }],
      errorMessage: "비밀번호는 6자리 이상이어야 합니다."
    },
    passwordConfirm: {
      title: '비밀번호 확인',
      type: 'password',
      events: {
        type: 'keyup',
        handler: function(ev) {
          var password = step2.dataStorage.get('password');
          if (ev.target.value === password) {
            document.getElementById('passwordConfirmErr').style.display = 'none';
            step2.indicator.requirements.step2.passwordConfirm = true;
            step2.indicator.indicate(step2.stage);
          } else {
            document.getElementById('passwordConfirmErr').style.display = 'block';
            step2.indicator.requirements.step2.passwordConfirm = false;
            step2.indicator.indicate(step2.stage);
          }
        },
      },
      errorMessage: "입력하신 비밀번호를 다시 입력해주세요"
    }
  },
  submit: {
    text: 'Sign In',
    handler: function(ev) {
      if (ev.target.classList.contains('disabled')) {
        return;
      } else {
        step2.destroy();
        step3.render();
      }
    }
  }
});

const step3 = new SignInProcess({
  stage: 'step3',
  target: document.getElementById('form'),
  tasks: {
    fullName: {
      title: '이름',
      type: 'text',
      placeholder: '배춘식',
      events: [{
        type: 'keyup',
        handler: function(ev) {
          if (ev.target.value.length > 2) {
            document.getElementById('fullNameErr').style.display = 'none';
            step3.indicator.requirements.step3.fullName = true;
            step3.indicator.indicate(step3.stage);
          } else {
            document.getElementById('fullNameErr').style.display = 'block';
            step3.indicator.requirements.step3.fullName = false;
            step3.indicator.indicate(step3.stage);
          }
        },
      }, {
        type: 'blur',
        handler: function(ev) {
          step3.dataStorage.set('fullName', ev.target.value);
        }
      }],
      errorMessage: "이름을 입력하세요"
    },
    phoneNumber: {
      title: '전화 번호',
      type: 'text',
      maxlength: '13',
      placeholder: '000-0000-0000',
      events: [{
        type:'keyup',
        handler: function(ev) {
          let value = ev.target.value.split('-');
          let flag = true;console.log(value);
          for (let i = 0; i < value.length; i++) {
            if (isNaN(Number(value[i])) || value[i].length > 5 || value[i].length < 2) {
              flag = false;
              break;
            }
          }
          if (flag) {
            document.getElementById('phoneNumberErr').style.display = 'none';
            step3.indicator.requirements.step3.phoneNumber = true;
            step3.indicator.indicate(step3.stage);
          } else {
            document.getElementById('phoneNumberErr').style.display = 'block';
            step3.indicator.requirements.step3.phoneNumber = false;
            step3.indicator.indicate(step3.stage);
          }
        },
      }, {
        type: 'blur',
        handler: function(ev) {
          step3.dataStorage.set('phoneNumber', ev.target.value)
        }
      }],
      errorMessage: "000-0000-0000 형식에 맞춰 입력하세요"
    },
    address: {
      title: '주소',
      type: 'text',
      placeholder: '허리도 가늘군 만지면 부서지리.....ㅎㅎㅎ',
      events: [{
        type:'keyup',
        handler: function(ev) {
          if (ev.target.value.length > 6) {
            document.getElementById('addressErr').style.display = 'none';
            step3.indicator.requirements.step3.address = true;
            step3.indicator.indicate(step3.stage);
          } else {
            document.getElementById('addressErr').style.display = 'block';
            step3.indicator.requirements.step3.address = false;
            step3.indicator.indicate(step3.stage);
          }
        },
      }, {
        type: 'blur',
        handler: function(ev) {
          step3.dataStorage.set('address', ev.target.value);
        }
      }],
      errorMessage: " 주소를 정확히 입력하세요."
    },
    homepage: {
      title: '홈페이지',
      type: 'text',
      events: [{
        type:'keyup',
        handler: function(ev) {
          let dot = ev.target.value.indexOf('.');
          if (dot > 0 && dot < ev.target.value.length - 2) {
            document.getElementById('homepageErr').style.display = 'none';
            step3.indicator.requirements.step3.homepage = true;
            step3.indicator.indicate(step3.stage);
          } else {
            document.getElementById('homepageErr').style.display = 'block';
            step3.indicator.requirements.step3.homepage = false;
            step3.indicator.indicate(step3.stage);
          }
        },
      }, {
        type: 'blur',
        handler: function(ev) {
          step3.dataStorage.set('homepage', ev.target.value);
        }
      }],
      errorMessage: "유효하지 않은 홈페이지 URL입니다."
    }
  },
  submit: {
    text: 'Done',
    handler: function (ev) {
      if (ev.target.classList.contains('disabled')) {
        return;
      } else {
        step3.destroy();
        document.querySelector('.sub').textContent = '회원가입이 완료되었습니다.';
        result.view.emailData.text = SignInProcess.prototype.dataStorage.get('email');
        result.view.fullNameData.text = SignInProcess.prototype.dataStorage.get('fullName');
        result.view.phoneNumberData.text = SignInProcess.prototype.dataStorage.get('phoneNumber');
        result.view.addressData.text = SignInProcess.prototype.dataStorage.get('address');
        result.view.homepageData.text = SignInProcess.prototype.dataStorage.get('homepage');
        result.render();
      }
    }
  }
});


const result = new Base({
  target: document.getElementById('form'),
  node: {
    email: {
      element: 'p',
      text:'이메일',
      attribute: {
        class: 'task_title'
      }
    },
    emailData: {
      element: 'h3',
      text: null
    },
    fullName: {
      element: 'p',
      text:'이름',
      attribute: {
        class: 'task_title'
      }},
    fullNameData: {
      element: 'h3',
      text: null
    },
    phoneNumber: {
      element: 'p',
      text:'전화번호',
      attribute: {
        class: 'task_title'
      }},
    phoneNumberData: {
      element: 'h3',
      text: null
    },
    address: {
      element: 'p',
      text:'주소',
      attribute: {
        class: 'task_title'
      }},
    addressData: {
      element: 'h3',
      text: null
    },
    homepage: {
      element: 'p',
      text:'홈페이지',
      attribute: {
        class: 'task_title'
      }},
    homepageData: {
      element: 'h3',
      text: null
    }
  }
});

step1.render();
