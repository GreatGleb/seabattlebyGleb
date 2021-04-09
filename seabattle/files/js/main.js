function dragNDropShip() {
  this.style.position = 'absolute';
  this.style.zIndex = 1000;
  // переместим в body, чтобы мяч был точно не внутри position:relative
  document.body.append(this);
  // и установим абсолютно спозиционированный мяч под курсор

  let element = this;
  deleteDarkReserved();
  moveAt(event.pageX, event.pageY, this);

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(pageX, pageY) {
    element.style.left = pageX - element.offsetWidth / 2 + 'px';
    if(element.classList.contains('ship-one')) {
      element.style.top = pageY - element.offsetHeight / 2 + 'px';
    } else if(element.classList.contains('ship-two')) {
      element.style.top = pageY - element.offsetHeight / 4 + 'px';
    } else if(element.classList.contains('ship-three')) {
      element.style.top = pageY - element.offsetHeight / 6 + 'px';
    } else if(element.classList.contains('ship-four')) {
      element.style.top = pageY - element.offsetHeight / 8 + 'px';
    }

    shipToField(pageX, pageY);
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) перемещать по экрану
  document.addEventListener('mousemove', onMouseMove);

  // (4) положить мяч, удалить более ненужные обработчики событий
  this.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    this.onmouseup = null;

    element.hidden = true;
    let field = document.elementFromPoint(event.clientX, event.clientY);
    if(field.classList.contains('player-td')) {
      (function () {
        let hField = field.getBoundingClientRect().top + pageYOffset;
        let xField = field.getBoundingClientRect().left + pageXOffset;
        element.style.left = xField + 5 + 'px';

        field.classList.remove('dark');

        let numberOfTr = parseInt(field.parentNode.dataset.numberOfTr);
        let numberOfTd = parseInt(field.dataset.numberOfTd);

        if (element.classList.contains('ship-one')) {
          if(field.classList.contains('dark-reserved')) {
            shipToBack(element);

            return;
          }

          element.style.top = hField + 5 + 'px';
          if (numberOfTd > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
          }
          if (numberOfTd < 10) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
          }

          if (numberOfTr > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
          if (numberOfTr < 10) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
        } else if (element.classList.contains('ship-two')) {
          let next1field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + numberOfTd + '"]');
          if(next1field) {
            next1field.classList.remove('dark');
          }

          if(field.classList.contains('dark-reserved')) {
            shipToBack(element);

            return;
          }

          if (numberOfTr < 10) {
            element.style.top = hField + 2.5 + 'px';

            if(next1field && !next1field.classList.contains('dark-reserved')) {
              next1field.classList.add('dark-reserved');
            } else {
              shipToBack(element);
              return;
            }
          } else {
            shipToBack(element);
            return;
          }

          if (numberOfTd > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 9) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
          }
          if (numberOfTd < 10) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 9) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
          }

          if (numberOfTr > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
          if (numberOfTr < 9) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
        } else if (element.classList.contains('ship-three')) {
          let next1field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + numberOfTd + '"]');
          let next2field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + numberOfTd + '"]');

          if(next1field) {
            next1field.classList.remove('dark');
          }
          if(next2field) {
            next2field.classList.remove('dark');
          }

          if(field.classList.contains('dark-reserved')) {
            shipToBack(element);

            return;
          }

          if (numberOfTr < 9) {
            if(next1field && !next1field.classList.contains('dark-reserved') &&
                next2field && !next2field.classList.contains('dark-reserved')) {
                  next1field.classList.add('dark-reserved');
                  next2field.classList.add('dark-reserved');
            } else {
                  shipToBack(element);
                  return;
            }

            element.style.top = hField + 5 + 'px';
          } else {
            shipToBack(element);
            return;
          }
          if (numberOfTd > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 9) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 8) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 3) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
          }
          if (numberOfTd < 10) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 9) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 8) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 3) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
          }

          if (numberOfTr > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
          if (numberOfTr < 8) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 3) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
        } else if (element.classList.contains('ship-four')) {
          let next1field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + numberOfTd + '"]');
          let next2field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + numberOfTd + '"]');
          let next3field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 3) + '"] td[data-number-of-td="' + numberOfTd + '"]');

          if(next1field) {
            next1field.classList.remove('dark');
          }
          if(next2field) {
            next2field.classList.remove('dark');
          }
          if(next3field) {
            next3field.classList.remove('dark');
          }

          if(field.classList.contains('dark-reserved') ||
              next1field.classList.contains('dark-reserved') ||
              next2field.classList.contains('dark-reserved') ||
              next3field.classList.contains('dark-reserved')) {
              shipToBack(element);
              return;
          }

          if(next1field) {
            next1field.classList.add('dark-reserved');
          }
          if(next2field) {
            next2field.classList.add('dark-reserved');
          }
          if(next3field) {
            next3field.classList.add('dark-reserved');
          }

          if (numberOfTr < 8) {
            element.style.top = hField + 2.5 + 'px';
          } else {
            shipToBack(element);
            return;
          }
          if (numberOfTd > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 9) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 8) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 3) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 7) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 4) + '"] td[data-number-of-td="' + (numberOfTd - 1) + '"]').classList.add('dark-reserved');
            }
          }
          if (numberOfTd < 10) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + numberOfTr + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            if (numberOfTr > 1) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 10) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 9) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 8) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 3) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
            if (numberOfTr < 7) {
              document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 4) + '"] td[data-number-of-td="' + (numberOfTd + 1) + '"]').classList.add('dark-reserved');
            }
          }

          if (numberOfTr > 1) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr - 1) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
          if (numberOfTr < 7) {
            document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 4) + '"] td[data-number-of-td="' + numberOfTd + '"]').classList.add('dark-reserved');
          }
        }

        field.classList.add('dark-reserved');
      })();
    } else {
      element.style.position = 'inherit';
      if(element.classList.contains('ship-one')) {
        document.querySelector('#left .ships .one-ships').append(element);
      } else if(element.classList.contains('ship-two')) {
        document.querySelector('#left .ships .two-ships').append(element);
      } else if(element.classList.contains('ship-three')) {
        document.querySelector('#left .ships .three-ships').append(element);
      } else if(element.classList.contains('ship-four')) {
        document.querySelector('#left .ships').append(element);
      }
    }
    element.hidden = false;
  };

  this.ondragstart = function() {
    return false;
  };

  function shipToField(pageX, pageY) {
    element.hidden = true;
    let field = document.elementFromPoint(event.clientX, event.clientY);
    deleteAllDarkFields();
    if(field.classList.contains('player-td')) {
      field.classList.add('dark');

      let numberOfTr = parseInt(field.parentNode.dataset.numberOfTr);
      let numberOfTd = field.dataset.numberOfTd;

      if(element.classList.contains('ship-two')) {
        let next1field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + numberOfTd + '"]');
        if(next1field) {
          next1field.classList.add('dark');
        }
      } else if(element.classList.contains('ship-three')) {
        let next1field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + numberOfTd + '"]');
        let next2field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + numberOfTd + '"]');
        if(next1field) {
          next1field.classList.add('dark');
        }
        if(next2field) {
          next2field.classList.add('dark');
        }
      } else if(element.classList.contains('ship-four')) {
        let next1field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 1) + '"] td[data-number-of-td="' + numberOfTd + '"]');
        let next2field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 2) + '"] td[data-number-of-td="' + numberOfTd + '"]');
        let next3field = document.querySelector('#left table tbody tr[data-number-of-tr="' + (numberOfTr + 3) + '"] td[data-number-of-td="' + numberOfTd + '"]');

        if(next1field) {
          next1field.classList.add('dark');
        }
        if(next2field) {
          next2field.classList.add('dark');
        }
        if(next3field) {
          next3field.classList.add('dark');
        }
      }
    }
    element.hidden = false;
  }

  function deleteDarkReserved() {
    element.hidden = true;
    let field = document.elementFromPoint(event.clientX, event.clientY);
    deleteAllDarkFields();
    if(field.classList.contains('dark-reserved')) {
      let numberOfTr = parseInt(field.parentNode.dataset.numberOfTr);
      let numberOfTd = parseInt(field.dataset.numberOfTd);

      let elTop = parseFloat(window.getComputedStyle(element,null).getPropertyValue("top").replace('px', ''));
      let elLeft = parseFloat(window.getComputedStyle(element,null).getPropertyValue("left").replace('px', ''));

      let scrollX = window.pageXOffset;
      let scrollY = window.pageYOffset;

      window.scrollTo(0, 0);
      let firstField = document.elementFromPoint(elLeft, elTop);
      window.scrollTo(scrollX, scrollY);

      let numberOfFirstFieldTr = parseInt(firstField.parentNode.dataset.numberOfTr);
      let numberOfFirstFieldTd = parseInt(firstField.dataset.numberOfTd);

      let allFieldsOfShip = [];
      let firstFieldsOfShipArr = getAllFieldsOfCoord([numberOfFirstFieldTr, numberOfFirstFieldTd]);

      for(let item of firstFieldsOfShipArr) {
        let nextfield = document.querySelector('#left table tbody tr[data-number-of-tr="' + item[0] + '"] td[data-number-of-td="' + item[1] + '"]');
        console.log(nextfield);
        if (nextfield) {
          if (!checkFieldOnNeighboringShips(nextfield, [numberOfFirstFieldTr, numberOfFirstFieldTd])) {
            nextfield.classList.remove('dark-reserved');
          }
        }
      }
      if(element.classList.contains('ship-two') || element.classList.contains('ship-three') || element.classList.contains('ship-four')) {

        let secondFieldsOfShipArr = getAllFieldsOfCoord([numberOfFirstFieldTr+1, numberOfFirstFieldTd]);

        let secondFieldsLength = secondFieldsOfShipArr.length;
        for (let i = 0, k = 0; k < secondFieldsLength; i++, k++) {
          let item = secondFieldsOfShipArr[i];
          for(let item2 of firstFieldsOfShipArr) {
            if(item[0] == item2[0] && item[1] == item2[1]) {
              secondFieldsOfShipArr.splice(i, 1);
              i--;
            }
          }
        }
        for(let item of secondFieldsOfShipArr) {
          let nextfield = document.querySelector('#left table tbody tr[data-number-of-tr="' + item[0] + '"] td[data-number-of-td="' + item[1] + '"]');
          if (nextfield) {
            if (!checkFieldOnNeighboringShips(nextfield, [(numberOfTr-1), numberOfTd])) {
              nextfield.classList.remove('dark-reserved');
            }
          }
        }
      }
      if(element.classList.contains('ship-three') || element.classList.contains('ship-four')) {

        let threeFieldsOfShipArr = getAllFieldsOfCoord([numberOfFirstFieldTr+2, numberOfFirstFieldTd]);

        let threeFieldsLength = threeFieldsOfShipArr.length;
        for (let i = 0, k = 0; k < threeFieldsLength; i++, k++) {
          let item = threeFieldsOfShipArr[i];
          for(let item2 of firstFieldsOfShipArr) {
            if(item[0] == item2[0] && item[1] == item2[1]) {
              threeFieldsOfShipArr.splice(i, 1);
              i--;
            }
          }
        }
        for(let item of threeFieldsOfShipArr) {
          let nextfield = document.querySelector('#left table tbody tr[data-number-of-tr="' + item[0] + '"] td[data-number-of-td="' + item[1] + '"]');
          if (nextfield) {
            if (!checkFieldOnNeighboringShips(nextfield, [(numberOfTr-1), numberOfTd])) {
              nextfield.classList.remove('dark-reserved');
            }
          }
        }
      }
      if(element.classList.contains('ship-four')) {

        let fourFieldsOfShipArr = getAllFieldsOfCoord([numberOfFirstFieldTr+3, numberOfFirstFieldTd]);

        let fourFieldsLength = fourFieldsOfShipArr.length;
        for (let i = 0, k = 0; k < fourFieldsLength; i++, k++) {
          let item = fourFieldsOfShipArr[i];
          for(let item2 of firstFieldsOfShipArr) {
            if(item[0] == item2[0] && item[1] == item2[1]) {
              fourFieldsOfShipArr.splice(i, 1);
              i--;
            }
          }
        }
        for(let item of fourFieldsOfShipArr) {
          let nextfield = document.querySelector('#left table tbody tr[data-number-of-tr="' + item[0] + '"] td[data-number-of-td="' + item[1] + '"]');
          if (nextfield) {
            if (!checkFieldOnNeighboringShips(nextfield, [(numberOfTr-1), numberOfTd])) {
              nextfield.classList.remove('dark-reserved');
            }
          }
        }
      }
    }
    element.hidden = false;
  }
}

function deleteAllDarkFields() {
  let darkFields = document.querySelectorAll('.player-td.dark');
  for(el of darkFields) {
    el.classList.remove('dark');
  }
}

function checkFieldOnNeighboringShips(field, coords) {
  // console.log();
  // console.log(coords);

  let fieldCoords = [parseInt(field.parentNode.dataset.numberOfTr), parseInt(field.dataset.numberOfTd)];

  let neighbornsOfField = getAllFieldsOfCoord(fieldCoords);

  neighbornsOfField.forEach(function(item, index, array) {
    if(item[0] == coords[0] && item[1] == coords[1]) {
      neighbornsOfField.splice(index, 1);
    }
  });

  let isHereShip = false;

  for(let item of neighbornsOfField) {
    if(checkShipOnField(item)) {
      isHereShip = true;
      break;
    }
  }

  return isHereShip;
}



function getAllFieldsOfCoord(fieldCoords) {
  let arrOfCoords = [];

  arrOfCoords.push(fieldCoords);
  if(fieldCoords[1] > 1) {
    arrOfCoords.push([fieldCoords[0], fieldCoords[1]-1]);
    if(fieldCoords[0] > 1) {
      arrOfCoords.push([fieldCoords[0] - 1, fieldCoords[1]-1]);
    }
    if(fieldCoords[0] < 10) {
      arrOfCoords.push([fieldCoords[0] + 1, fieldCoords[1]-1]);
    }
  }
  if(fieldCoords[1] < 10) {
    arrOfCoords.push([fieldCoords[0], fieldCoords[1]+1]);
    if(fieldCoords[0] > 1) {
      arrOfCoords.push([fieldCoords[0] - 1, fieldCoords[1]+1]);
    }
    if(fieldCoords[0] < 10) {
      arrOfCoords.push([fieldCoords[0] + 1, fieldCoords[1]+1]);
    }
  }
  if(fieldCoords[0] > 1) {
    arrOfCoords.push([fieldCoords[0]-1, fieldCoords[1]]);
  }
  if(fieldCoords[0] < 10) {
    arrOfCoords.push([fieldCoords[0]+1, fieldCoords[1]]);
  }

  return arrOfCoords;
}

function checkShipOnField(coords) {
  let field = document.querySelector('#left table tbody tr[data-number-of-tr="' + coords[0]  + '"] td[data-number-of-td="' + coords[1] + '"]');


  let scrollX = window.pageXOffset;
  let scrollY = window.pageYOffset;

  window.scrollTo(0, 0);

  let x = field.getBoundingClientRect().left + 15;
  let y = field.getBoundingClientRect().top + 15;

  let elem = document.elementFromPoint(x, y);
  window.scrollTo(scrollX, scrollY);

   return (elem.tagName.toLowerCase() == 'img');
}

function shipToBack(ship) {
  ship.style.position = 'inherit';
  if (ship.classList.contains('ship-one')) {
    document.querySelector('#left .ships .one-ships').append(ship);
  } else if(ship.classList.contains('ship-two')) {
    document.querySelector('#left .ships .two-ships').append(ship);
  } else if(ship.classList.contains('ship-three')) {
    document.querySelector('#left .ships .three-ships').append(ship);
  } else if(ship.classList.contains('ship-four')) {
    document.querySelector('#left .ships').append(ship);
  }
}

let allShips = document.querySelectorAll('.a-ship');

for(let el of allShips) {
  el.addEventListener('mousedown', dragNDropShip);
}

