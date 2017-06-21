import CODES from '../../services/ean/constants/CODES';
import STRUCTURE from '../../services/ean/constants/STRUCTURE';
// import barcodeImage from './img/test4.png';

export default class DecodeEANController {
  constructor($http, $scope) {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.$http = $http;
    this.$scope = $scope;
    this.subscribe();
  }

  subscribe() {
    document.getElementById('file-selector')
      .addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length) {
          this.handleLocalFile(files[0]);
        }
      });
  }

  handleLocalFile(file) {
    if (file.type.match(/image.*/)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.loadImageToCanvas(e.target.result)
          .then(() => {
            this.normalizeImg();
          })
          .then(() => this.decode())
          .then((code) => {
            return this.$http.get(`http://localhost:8888/api/products/${code}`);
          })
          .then((response) => {
            this.product = response.data;
            this.$scope.$apply();
          })
          .catch(() => {
            this.product = 'Not found product';
            this.$scope.$apply();
          });
      };
      reader.readAsDataURL(file);
    }
  }

  loadImageToCanvas(file) {
    return new Promise((resolve) => {
      let image = new Image();
      image.onload = (event) => {
        let img = event.currentTarget;
        this.context.drawImage(img, 0, 0, img.width, img.height,
          0, 0, this.canvas.width, this.canvas.height);
        resolve();
      };
      image.src = file;
    });
  }

  normalizeImg() {
    return new Promise((resolve) => {
      let imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      let pixels = imgData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        let y = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
        pixels[i] = y < 120 ? '0' : '255';
        pixels[i + 1] = y < 120 ? '0' : '255';
        pixels[i + 2] = y < 120 ? '0' : '255';
      }
      this.context.putImageData(imgData, 0, 0);
      resolve();
    });
  }


  checkPixelsInRaw(param) {
    let imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height),
      pixels = imgData.data,
      barcodeArr = [],
      barcodeStartIndex = null,
      barcodeEndIndex = null;

    /**
     * To search the row in the middle of img
     */
    let counter = Math.round(this.canvas.height / param) * this.canvas.width * 4;

    /**
     * Define start of the barcode
     */
    let i = counter;
    while (pixels[i] !== 0) {
      i += 4;
      barcodeStartIndex = i;
    }
    /**
     * Define end of the barcode
     */
    let j = counter + this.canvas.width * 4;
    while (pixels[j] !== 0) {
      j -= 4;
      barcodeEndIndex = j;
    }

    /**
     * Define stroke width
     */

    let l = barcodeEndIndex;
    let strokeWidth = 0;
    while (pixels[l] !== 255) {
      strokeWidth += 1;
      l -= 4;
    }

    for (let i = barcodeStartIndex; i <= barcodeEndIndex + 16 /* because */; i += 4) {
      let y = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
      barcodeArr.push(+(y < 128)); // if black
    }

    let col = 0;
    let result = [];
    let prev = barcodeArr[0];
    let length = barcodeArr.length;
    let k = 1;

    while (k < length) {
      let current = barcodeArr[k];
      if (current !== prev) {
        const arr = new Array(Math.round(col / strokeWidth)).fill(prev);
        result.push(...arr);
        col = 0;
      } else {
        col++;
      }
      prev = current;
      k++;
    }
    return result;
  }

  decode() {
    let arr1 = this.checkPixelsInRaw(2);
    const coreIndex = 44;
    const leftPart = arr1.slice(3, coreIndex + 1);
    const rightPart = arr1.slice(coreIndex + 6, arr1.length - 3);
    let code = this.decodeLeftPart(leftPart).firstNumber +
      this.decodeLeftPart(leftPart).leftPart.join('') +
      this.decodeRightPart(rightPart).join('');
    document.getElementById('result').textContent = code;
    return code;
  }

  decodeLeftPart(leftPart) {
    let sequence = leftPart.join('');
    let tmp;
    let result = [];
    let firstNumberSequence = [];
    let firstNumber = null;
    while (sequence) {
      tmp = sequence.slice(0, 7);
      Object.keys(CODES.L).map(letter => {
        if (CODES.L[letter] === tmp) {
          result.push(parseInt(letter));
          firstNumberSequence.push('L');
        }
      });
      Object.keys(CODES.G).map(letter => {
        if (CODES.G[letter] === tmp) {
          result.push(parseInt(letter));
          firstNumberSequence.push('G');
        }
      });
      sequence = sequence.slice(7, sequence.length);
    }
    let firstNumberJoined = firstNumberSequence.join('');
    Object.keys(STRUCTURE).map(key => {
      if (firstNumberJoined === STRUCTURE[key]) {
        firstNumber = key;
      }
    });
    return {
      leftPart: result,
      firstNumber
    };
  }

  decodeRightPart(rightPart) {
    let sequence = rightPart.join('');
    let tmp;
    let result = [];
    while (sequence) {
      tmp = sequence.slice(0, 7);
      result.push(this.getKeyByValue(CODES.R, tmp));
      sequence = sequence.slice(7, sequence.length);
    }
    return result;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
};
