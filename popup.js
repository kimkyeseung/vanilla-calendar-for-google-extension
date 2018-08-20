// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


var base = {
  target: document.getElementById('root'),
  node: {
    calendar: {
      element: 'div',
      attribute: {
        class: 'calendar',
        id: 'calendar'
      },
      children: {
        selected: {
          element: 'div',
          attribute: {
            class: 'selected'
          }
        }
      }
    }
  }
}




// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

