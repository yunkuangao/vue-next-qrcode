import { defineComponent as Ie, ref as Se, onMounted as Fe, createVNode as nt, Fragment as Qe } from "vue";
import { NSpin as Ne, NButton as Oe } from "naive-ui";
const Ue = {
  status: {
    type: String,
    default: "success"
  },
  errorDescription: {
    type: [String, Object],
    default: "二维码已过期"
  },
  errorActionDescription: {
    type: String,
    default: "重新加载"
  },
  text: {
    /**
     *
     * Text to be encoded in the QR code
     */
    type: String,
    required: !0
  },
  size: {
    /**
     *
     * Size of the QR code in pixel.
     *
     * @default 160
     */
    type: Number,
    default: 160
  },
  margin: {
    /**
     *
     * Size of margins around the QR code body in pixel.
     *
     * @default 12
     */
    type: Number,
    default: 12
  },
  correctLevel: {
    /**
     *
     * Error correction level of the QR code
     * Accepts a value provided by _QRErrorCorrectLevel_
     *
     * @default 1
     */
    type: Number,
    default: 1,
    validator: (e) => [0, 1, 2, 3].includes(e)
  },
  maskPattern: {
    /**
     *
     * Specify the mask pattern to be used in QR code encoding
     * Accepts a value provided by _QRMaskPattern_
     */
    type: Number
  },
  version: {
    /**
     *
     * Specify the version to be used in QR code encoding
     * Accepts an integer in range [1, 40]
     */
    type: Number
  },
  components: {
    /**
     *
     * Options to control components in the QR code.
     *
     * @default {data:{scale...},...}
     */
    type: Object,
    default: () => ({
      data: {
        scale: 1
      },
      timing: {
        scale: 1,
        protectors: !1
      },
      alignment: {
        scale: 1,
        protectors: !1
      },
      cornerAlignment: {
        scale: 1,
        protectors: !0
      }
    })
  },
  colorDark: {
    /**
     *
     * Color of the blocks on the QR code
     * Accepts a CSS &lt;color&gt;
     *
     * @default #000000
     */
    type: String,
    default: "#000000"
  },
  colorLight: {
    /**
     *
     * Color of the blocks on the QR code
     * Accepts a CSS &lt;color&gt;
     *
     * @default #ffffff
     */
    type: String,
    default: "#ffffff"
  },
  autoColor: {
    /**
     *
     * Automatically calculate the _colorLight_ value from the QR code's background
     *
     * @default true
     */
    type: Boolean,
    default: !0
  },
  backgroundImage: {
    /**
     *
     * Background image to be used in the QR code
     * Accepts a `data:` string in web browsers or a Buffer in Node.js
     *
     * @default undefined
     */
    type: String
  },
  backgroundDimming: {
    /**
     *
     * Color of the dimming mask above the background image
     * Accepts a CSS &lt;color&gt;
     *
     * @default rgba(0, 0, 0, 0)
     */
    type: String,
    default: "rgba(0, 0, 0, 0)"
  },
  gifBackground: {
    /**
     *
     * GIF background image to be used in the QR code
     *
     * @default undefined
     */
    type: ArrayBuffer
  },
  whiteMargin: {
    /**
     *
     * Use a white margin instead of a transparent one which reveals the background of the QR code on margins
     *
     * @default true
     */
    type: Boolean,
    default: !0
  },
  logoImage: {
    /**
     *
     * Logo image to be displayed at the center of the QR code
     * Accepts a `data:` string in web browsers or a Buffer in Node.js
     * When set to `undefined` or `null`, the logo is disabled
     *
     * @default undefined
     */
    type: String
  },
  logoScale: {
    /**
     *
     * Ratio of the logo size to the QR code size
     *
     * @default 0.4
     */
    type: Number,
    default: 0.4
  },
  logoMargin: {
    /**
     *
     * Size of margins around the logo image in pixels
     *
     * @default 6
     */
    type: Number,
    default: 6
  },
  logoCornerRadius: {
    /**
     * Corner radius of the logo image in pixels.
     *
     * @default 8
     */
    type: Number,
    default: 8
  },
  onSuccess: {
    /**
     *
     * When the QR code is successfully generated, this callback is called
     */
    type: [Function, Array],
    default: null
  },
  onError: {
    /**
     *
     * When the QR code generation fails, this callback is called
     */
    type: [Function, Array],
    default: null
  },
  onReload: {
    /**
     *
     * When reload button is clicked, this callback is called
     * This method will not execute if the errorAction slot is used
     */
    type: [Function, Array],
    default: null
  }
};
var U = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pe = {}, ee = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.QRMath = e.QRUtil = e.QRMaskPattern = e.QRErrorCorrectLevel = e.QRCodeModel = void 0;
  function a(s, r, o) {
    var c = l(r), i = s - 1, n = 0;
    switch (o) {
      case e.QRErrorCorrectLevel.L:
        n = b[i][0];
        break;
      case e.QRErrorCorrectLevel.M:
        n = b[i][1];
        break;
      case e.QRErrorCorrectLevel.Q:
        n = b[i][2];
        break;
      case e.QRErrorCorrectLevel.H:
        n = b[i][3];
        break;
    }
    return c <= n;
  }
  function t(s, r) {
    for (var o = 1, c = l(s), i = 0, n = b.length; i < n; i++) {
      var v = 0;
      switch (r) {
        case e.QRErrorCorrectLevel.L:
          v = b[i][0];
          break;
        case e.QRErrorCorrectLevel.M:
          v = b[i][1];
          break;
        case e.QRErrorCorrectLevel.Q:
          v = b[i][2];
          break;
        case e.QRErrorCorrectLevel.H:
          v = b[i][3];
          break;
      }
      if (c <= v)
        break;
      o++;
    }
    if (o > b.length)
      throw new Error("Too long data");
    return o;
  }
  function l(s) {
    var r = encodeURI(s).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
    return r.length + (r.length != Number(s) ? 3 : 0);
  }
  var u = (
    /** @class */
    function() {
      function s(r) {
        this.mode = h.MODE_8BIT_BYTE, this.parsedData = [], this.data = r;
        for (var o = [], c = 0, i = this.data.length; c < i; c++) {
          var n = [], v = this.data.charCodeAt(c);
          v > 65536 ? (n[0] = 240 | (v & 1835008) >>> 18, n[1] = 128 | (v & 258048) >>> 12, n[2] = 128 | (v & 4032) >>> 6, n[3] = 128 | v & 63) : v > 2048 ? (n[0] = 224 | (v & 61440) >>> 12, n[1] = 128 | (v & 4032) >>> 6, n[2] = 128 | v & 63) : v > 128 ? (n[0] = 192 | (v & 1984) >>> 6, n[1] = 128 | v & 63) : n[0] = v, o.push(n);
        }
        this.parsedData = Array.prototype.concat.apply([], o), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239));
      }
      return s.prototype.getLength = function() {
        return this.parsedData.length;
      }, s.prototype.write = function(r) {
        for (var o = 0, c = this.parsedData.length; o < c; o++)
          r.put(this.parsedData[o], 8);
      }, s;
    }()
  ), f = (
    /** @class */
    function() {
      function s(r, o) {
        r === void 0 && (r = -1), o === void 0 && (o = e.QRErrorCorrectLevel.L), this.moduleCount = 0, this.dataList = [], this.typeNumber = r, this.errorCorrectLevel = o, this.moduleCount = 0, this.dataList = [];
      }
      return s.prototype.addData = function(r) {
        if (this.typeNumber <= 0)
          this.typeNumber = t(r, this.errorCorrectLevel);
        else {
          if (this.typeNumber > 40)
            throw new Error("Invalid QR version: " + this.typeNumber);
          if (!a(this.typeNumber, r, this.errorCorrectLevel))
            throw new Error("Data is too long for QR version: " + this.typeNumber);
        }
        var o = new u(r);
        this.dataList.push(o), this.dataCache = void 0;
      }, s.prototype.isDark = function(r, o) {
        if (r < 0 || this.moduleCount <= r || o < 0 || this.moduleCount <= o)
          throw new Error(r + "," + o);
        return this.modules[r][o];
      }, s.prototype.getModuleCount = function() {
        return this.moduleCount;
      }, s.prototype.make = function() {
        this.makeImpl(!1, this.getBestMaskPattern());
      }, s.prototype.makeImpl = function(r, o) {
        this.moduleCount = this.typeNumber * 4 + 17, this.modules = new Array(this.moduleCount);
        for (var c = 0; c < this.moduleCount; c++) {
          this.modules[c] = new Array(this.moduleCount);
          for (var i = 0; i < this.moduleCount; i++)
            this.modules[c][i] = null;
        }
        this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(r, o), this.typeNumber >= 7 && this.setupTypeNumber(r), this.dataCache == null && (this.dataCache = s.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, o);
      }, s.prototype.setupPositionProbePattern = function(r, o) {
        for (var c = -1; c <= 7; c++)
          if (!(r + c <= -1 || this.moduleCount <= r + c))
            for (var i = -1; i <= 7; i++)
              o + i <= -1 || this.moduleCount <= o + i || (0 <= c && c <= 6 && (i == 0 || i == 6) || 0 <= i && i <= 6 && (c == 0 || c == 6) || 2 <= c && c <= 4 && 2 <= i && i <= 4 ? this.modules[r + c][o + i] = !0 : this.modules[r + c][o + i] = !1);
      }, s.prototype.getBestMaskPattern = function() {
        if (Number.isInteger(this.maskPattern) && Object.values(e.QRMaskPattern).includes(this.maskPattern))
          return this.maskPattern;
        for (var r = 0, o = 0, c = 0; c < 8; c++) {
          this.makeImpl(!0, c);
          var i = y.getLostPoint(this);
          (c == 0 || r > i) && (r = i, o = c);
        }
        return o;
      }, s.prototype.setupTimingPattern = function() {
        for (var r = 8; r < this.moduleCount - 8; r++)
          this.modules[r][6] == null && (this.modules[r][6] = r % 2 == 0);
        for (var o = 8; o < this.moduleCount - 8; o++)
          this.modules[6][o] == null && (this.modules[6][o] = o % 2 == 0);
      }, s.prototype.setupPositionAdjustPattern = function() {
        for (var r = y.getPatternPosition(this.typeNumber), o = 0; o < r.length; o++)
          for (var c = 0; c < r.length; c++) {
            var i = r[o], n = r[c];
            if (this.modules[i][n] == null)
              for (var v = -2; v <= 2; v++)
                for (var d = -2; d <= 2; d++)
                  v == -2 || v == 2 || d == -2 || d == 2 || v == 0 && d == 0 ? this.modules[i + v][n + d] = !0 : this.modules[i + v][n + d] = !1;
          }
      }, s.prototype.setupTypeNumber = function(r) {
        for (var o = y.getBCHTypeNumber(this.typeNumber), c = 0; c < 18; c++) {
          var i = !r && (o >> c & 1) == 1;
          this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = i;
        }
        for (var c = 0; c < 18; c++) {
          var i = !r && (o >> c & 1) == 1;
          this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = i;
        }
      }, s.prototype.setupTypeInfo = function(r, o) {
        for (var c = this.errorCorrectLevel << 3 | o, i = y.getBCHTypeInfo(c), n = 0; n < 15; n++) {
          var v = !r && (i >> n & 1) == 1;
          n < 6 ? this.modules[n][8] = v : n < 8 ? this.modules[n + 1][8] = v : this.modules[this.moduleCount - 15 + n][8] = v;
        }
        for (var n = 0; n < 15; n++) {
          var v = !r && (i >> n & 1) == 1;
          n < 8 ? this.modules[8][this.moduleCount - n - 1] = v : n < 9 ? this.modules[8][15 - n - 1 + 1] = v : this.modules[8][15 - n - 1] = v;
        }
        this.modules[this.moduleCount - 8][8] = !r;
      }, s.prototype.mapData = function(r, o) {
        for (var c = -1, i = this.moduleCount - 1, n = 7, v = 0, d = this.moduleCount - 1; d > 0; d -= 2)
          for (d == 6 && d--; ; ) {
            for (var p = 0; p < 2; p++)
              if (this.modules[i][d - p] == null) {
                var _ = !1;
                v < r.length && (_ = (r[v] >>> n & 1) == 1);
                var R = y.getMask(o, i, d - p);
                R && (_ = !_), this.modules[i][d - p] = _, n--, n == -1 && (v++, n = 7);
              }
            if (i += c, i < 0 || this.moduleCount <= i) {
              i -= c, c = -c;
              break;
            }
          }
      }, s.createData = function(r, o, c) {
        for (var i = E.getRSBlocks(r, o), n = new B(), v = 0; v < c.length; v++) {
          var d = c[v];
          n.put(d.mode, 4), n.put(d.getLength(), y.getLengthInBits(d.mode, r)), d.write(n);
        }
        for (var p = 0, v = 0; v < i.length; v++)
          p += i[v].dataCount;
        if (n.getLengthInBits() > p * 8)
          throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + p * 8 + ")");
        for (n.getLengthInBits() + 4 <= p * 8 && n.put(0, 4); n.getLengthInBits() % 8 != 0; )
          n.putBit(!1);
        for (; !(n.getLengthInBits() >= p * 8 || (n.put(s.PAD0, 8), n.getLengthInBits() >= p * 8)); )
          n.put(s.PAD1, 8);
        return s.createBytes(n, i);
      }, s.createBytes = function(r, o) {
        for (var c = 0, i = 0, n = 0, v = new Array(o.length), d = new Array(o.length), p = 0; p < o.length; p++) {
          var _ = o[p].dataCount, R = o[p].totalCount - _;
          i = Math.max(i, _), n = Math.max(n, R), v[p] = new Array(_);
          for (var C = 0; C < v[p].length; C++)
            v[p][C] = 255 & r.buffer[C + c];
          c += _;
          var x = y.getErrorCorrectPolynomial(R), k = new w(v[p], x.getLength() - 1), g = k.mod(x);
          d[p] = new Array(x.getLength() - 1);
          for (var C = 0; C < d[p].length; C++) {
            var T = C + g.getLength() - d[p].length;
            d[p][C] = T >= 0 ? g.get(T) : 0;
          }
        }
        for (var A = 0, C = 0; C < o.length; C++)
          A += o[C].totalCount;
        for (var D = new Array(A), P = 0, C = 0; C < i; C++)
          for (var p = 0; p < o.length; p++)
            C < v[p].length && (D[P++] = v[p][C]);
        for (var C = 0; C < n; C++)
          for (var p = 0; p < o.length; p++)
            C < d[p].length && (D[P++] = d[p][C]);
        return D;
      }, s.PAD0 = 236, s.PAD1 = 17, s;
    }()
  );
  e.QRCodeModel = f, e.QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
  var h = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 };
  e.QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  var y = (
    /** @class */
    function() {
      function s() {
      }
      return s.getBCHTypeInfo = function(r) {
        for (var o = r << 10; s.getBCHDigit(o) - s.getBCHDigit(s.G15) >= 0; )
          o ^= s.G15 << s.getBCHDigit(o) - s.getBCHDigit(s.G15);
        return (r << 10 | o) ^ s.G15_MASK;
      }, s.getBCHTypeNumber = function(r) {
        for (var o = r << 12; s.getBCHDigit(o) - s.getBCHDigit(s.G18) >= 0; )
          o ^= s.G18 << s.getBCHDigit(o) - s.getBCHDigit(s.G18);
        return r << 12 | o;
      }, s.getBCHDigit = function(r) {
        for (var o = 0; r != 0; )
          o++, r >>>= 1;
        return o;
      }, s.getPatternPosition = function(r) {
        return s.PATTERN_POSITION_TABLE[r - 1];
      }, s.getMask = function(r, o, c) {
        switch (r) {
          case e.QRMaskPattern.PATTERN000:
            return (o + c) % 2 == 0;
          case e.QRMaskPattern.PATTERN001:
            return o % 2 == 0;
          case e.QRMaskPattern.PATTERN010:
            return c % 3 == 0;
          case e.QRMaskPattern.PATTERN011:
            return (o + c) % 3 == 0;
          case e.QRMaskPattern.PATTERN100:
            return (Math.floor(o / 2) + Math.floor(c / 3)) % 2 == 0;
          case e.QRMaskPattern.PATTERN101:
            return o * c % 2 + o * c % 3 == 0;
          case e.QRMaskPattern.PATTERN110:
            return (o * c % 2 + o * c % 3) % 2 == 0;
          case e.QRMaskPattern.PATTERN111:
            return (o * c % 3 + (o + c) % 2) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + r);
        }
      }, s.getErrorCorrectPolynomial = function(r) {
        for (var o = new w([1], 0), c = 0; c < r; c++)
          o = o.multiply(new w([1, m.gexp(c)], 0));
        return o;
      }, s.getLengthInBits = function(r, o) {
        if (1 <= o && o < 10)
          switch (r) {
            case h.MODE_NUMBER:
              return 10;
            case h.MODE_ALPHA_NUM:
              return 9;
            case h.MODE_8BIT_BYTE:
              return 8;
            case h.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + r);
          }
        else if (o < 27)
          switch (r) {
            case h.MODE_NUMBER:
              return 12;
            case h.MODE_ALPHA_NUM:
              return 11;
            case h.MODE_8BIT_BYTE:
              return 16;
            case h.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + r);
          }
        else if (o < 41)
          switch (r) {
            case h.MODE_NUMBER:
              return 14;
            case h.MODE_ALPHA_NUM:
              return 13;
            case h.MODE_8BIT_BYTE:
              return 16;
            case h.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + r);
          }
        else
          throw new Error("type:" + o);
      }, s.getLostPoint = function(r) {
        for (var o = r.getModuleCount(), c = 0, i = 0; i < o; i++)
          for (var n = 0; n < o; n++) {
            for (var v = 0, d = r.isDark(i, n), p = -1; p <= 1; p++)
              if (!(i + p < 0 || o <= i + p))
                for (var _ = -1; _ <= 1; _++)
                  n + _ < 0 || o <= n + _ || p == 0 && _ == 0 || d == r.isDark(i + p, n + _) && v++;
            v > 5 && (c += 3 + v - 5);
          }
        for (var i = 0; i < o - 1; i++)
          for (var n = 0; n < o - 1; n++) {
            var R = 0;
            r.isDark(i, n) && R++, r.isDark(i + 1, n) && R++, r.isDark(i, n + 1) && R++, r.isDark(i + 1, n + 1) && R++, (R == 0 || R == 4) && (c += 3);
          }
        for (var i = 0; i < o; i++)
          for (var n = 0; n < o - 6; n++)
            r.isDark(i, n) && !r.isDark(i, n + 1) && r.isDark(i, n + 2) && r.isDark(i, n + 3) && r.isDark(i, n + 4) && !r.isDark(i, n + 5) && r.isDark(i, n + 6) && (c += 40);
        for (var n = 0; n < o; n++)
          for (var i = 0; i < o - 6; i++)
            r.isDark(i, n) && !r.isDark(i + 1, n) && r.isDark(i + 2, n) && r.isDark(i + 3, n) && r.isDark(i + 4, n) && !r.isDark(i + 5, n) && r.isDark(i + 6, n) && (c += 40);
        for (var C = 0, n = 0; n < o; n++)
          for (var i = 0; i < o; i++)
            r.isDark(i, n) && C++;
        var x = Math.abs(100 * C / o / o - 50) / 5;
        return c += x * 10, c;
      }, s.PATTERN_POSITION_TABLE = [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ], s.G15 = 1335, s.G18 = 7973, s.G15_MASK = 21522, s;
    }()
  );
  e.QRUtil = y;
  var m = (
    /** @class */
    function() {
      function s() {
      }
      return s.glog = function(r) {
        if (r < 1)
          throw new Error("glog(" + r + ")");
        return s.LOG_TABLE[r];
      }, s.gexp = function(r) {
        for (; r < 0; )
          r += 255;
        for (; r >= 256; )
          r -= 255;
        return s.EXP_TABLE[r];
      }, s.EXP_TABLE = new Array(256), s.LOG_TABLE = new Array(256), s._constructor = function() {
        for (var r = 0; r < 8; r++)
          s.EXP_TABLE[r] = 1 << r;
        for (var r = 8; r < 256; r++)
          s.EXP_TABLE[r] = s.EXP_TABLE[r - 4] ^ s.EXP_TABLE[r - 5] ^ s.EXP_TABLE[r - 6] ^ s.EXP_TABLE[r - 8];
        for (var r = 0; r < 255; r++)
          s.LOG_TABLE[s.EXP_TABLE[r]] = r;
      }(), s;
    }()
  );
  e.QRMath = m;
  var w = (
    /** @class */
    function() {
      function s(r, o) {
        if (r.length == null)
          throw new Error(r.length + "/" + o);
        for (var c = 0; c < r.length && r[c] == 0; )
          c++;
        this.num = new Array(r.length - c + o);
        for (var i = 0; i < r.length - c; i++)
          this.num[i] = r[i + c];
      }
      return s.prototype.get = function(r) {
        return this.num[r];
      }, s.prototype.getLength = function() {
        return this.num.length;
      }, s.prototype.multiply = function(r) {
        for (var o = new Array(this.getLength() + r.getLength() - 1), c = 0; c < this.getLength(); c++)
          for (var i = 0; i < r.getLength(); i++)
            o[c + i] ^= m.gexp(m.glog(this.get(c)) + m.glog(r.get(i)));
        return new s(o, 0);
      }, s.prototype.mod = function(r) {
        if (this.getLength() - r.getLength() < 0)
          return this;
        for (var o = m.glog(this.get(0)) - m.glog(r.get(0)), c = new Array(this.getLength()), i = 0; i < this.getLength(); i++)
          c[i] = this.get(i);
        for (var i = 0; i < r.getLength(); i++)
          c[i] ^= m.gexp(m.glog(r.get(i)) + o);
        return new s(c, 0).mod(r);
      }, s;
    }()
  ), E = (
    /** @class */
    function() {
      function s(r, o) {
        this.totalCount = r, this.dataCount = o;
      }
      return s.getRSBlocks = function(r, o) {
        var c = s.getRsBlockTable(r, o);
        if (c == null)
          throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + o);
        for (var i = c.length / 3, n = [], v = 0; v < i; v++)
          for (var d = c[v * 3 + 0], p = c[v * 3 + 1], _ = c[v * 3 + 2], R = 0; R < d; R++)
            n.push(new s(p, _));
        return n;
      }, s.getRsBlockTable = function(r, o) {
        switch (o) {
          case e.QRErrorCorrectLevel.L:
            return s.RS_BLOCK_TABLE[(r - 1) * 4 + 0];
          case e.QRErrorCorrectLevel.M:
            return s.RS_BLOCK_TABLE[(r - 1) * 4 + 1];
          case e.QRErrorCorrectLevel.Q:
            return s.RS_BLOCK_TABLE[(r - 1) * 4 + 2];
          case e.QRErrorCorrectLevel.H:
            return s.RS_BLOCK_TABLE[(r - 1) * 4 + 3];
          default:
            return;
        }
      }, s.RS_BLOCK_TABLE = [
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12],
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16]
      ], s;
    }()
  ), B = (
    /** @class */
    function() {
      function s() {
        this.buffer = [], this.length = 0;
      }
      return s.prototype.get = function(r) {
        var o = Math.floor(r / 8);
        return (this.buffer[o] >>> 7 - r % 8 & 1) == 1;
      }, s.prototype.put = function(r, o) {
        for (var c = 0; c < o; c++)
          this.putBit((r >>> o - c - 1 & 1) == 1);
      }, s.prototype.getLengthInBits = function() {
        return this.length;
      }, s.prototype.putBit = function(r) {
        var o = Math.floor(this.length / 8);
        this.buffer.length <= o && this.buffer.push(0), r && (this.buffer[o] |= 128 >>> this.length % 8), this.length++;
      }, s;
    }()
  ), b = [
    [17, 14, 11, 7],
    [32, 26, 20, 14],
    [53, 42, 32, 24],
    [78, 62, 46, 34],
    [106, 84, 60, 44],
    [134, 106, 74, 58],
    [154, 122, 86, 64],
    [192, 152, 108, 84],
    [230, 180, 130, 98],
    [271, 213, 151, 119],
    [321, 251, 177, 137],
    [367, 287, 203, 155],
    [425, 331, 241, 177],
    [458, 362, 258, 194],
    [520, 412, 292, 220],
    [586, 450, 322, 250],
    [644, 504, 364, 280],
    [718, 560, 394, 310],
    [792, 624, 442, 338],
    [858, 666, 482, 382],
    [929, 711, 509, 403],
    [1003, 779, 565, 439],
    [1091, 857, 611, 461],
    [1171, 911, 661, 511],
    [1273, 997, 715, 535],
    [1367, 1059, 751, 593],
    [1465, 1125, 805, 625],
    [1528, 1190, 868, 658],
    [1628, 1264, 908, 698],
    [1732, 1370, 982, 742],
    [1840, 1452, 1030, 790],
    [1952, 1538, 1112, 842],
    [2068, 1628, 1168, 898],
    [2188, 1722, 1228, 958],
    [2303, 1809, 1283, 983],
    [2431, 1911, 1351, 1051],
    [2563, 1989, 1423, 1093],
    [2699, 2099, 1499, 1139],
    [2809, 2213, 1579, 1219],
    [2953, 2331, 1663, 1273]
  ];
})(ee);
var Ot = {}, Ct = {};
const Ge = "bold|bolder|lighter|[1-9]00", ze = "italic|oblique", He = "small-caps", je = "ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded", $e = "px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q", pe = `'([^']+)'|"([^"]+)"|[\\w\\s-]+`, Ke = new RegExp(`(${Ge}) +`, "i"), Xe = new RegExp(`(${ze}) +`, "i"), Je = new RegExp(`(${He}) +`, "i"), We = new RegExp(`(${je}) +`, "i"), Ze = new RegExp(
  `([\\d\\.]+)(${$e}) *((?:${pe})( *, *(?:${pe}))*)`
), Yt = {}, qe = 16;
var Ve = (e) => {
  if (Yt[e])
    return Yt[e];
  const a = Ze.exec(e);
  if (!a)
    return;
  const t = {
    weight: "normal",
    style: "normal",
    stretch: "normal",
    variant: "normal",
    size: parseFloat(a[1]),
    unit: a[2],
    family: a[3].replace(/["']/g, "").replace(/ *, */g, ",")
  };
  let l, u, f, h;
  const y = e.substring(0, a.index);
  switch ((l = Ke.exec(y)) && (t.weight = l[1]), (u = Xe.exec(y)) && (t.style = u[1]), (f = Je.exec(y)) && (t.variant = f[1]), (h = We.exec(y)) && (t.stretch = h[1]), t.unit) {
    case "pt":
      t.size /= 0.75;
      break;
    case "pc":
      t.size *= 16;
      break;
    case "in":
      t.size *= 96;
      break;
    case "cm":
      t.size *= 96 / 2.54;
      break;
    case "mm":
      t.size *= 96 / 25.4;
      break;
    case "%":
      break;
    case "em":
    case "rem":
      t.size *= qe / 0.75;
      break;
    case "q":
      t.size *= 96 / 25.4 / 4;
      break;
  }
  return Yt[e] = t;
};
const Ye = Ve;
Ct.parseFont = Ye;
Ct.createCanvas = function(e, a) {
  return Object.assign(document.createElement("canvas"), { width: e, height: a });
};
Ct.createImageData = function(e, a, t) {
  switch (arguments.length) {
    case 0:
      return new ImageData();
    case 1:
      return new ImageData(e);
    case 2:
      return new ImageData(e, a);
    default:
      return new ImageData(e, a, t);
  }
};
Ct.loadImage = function(e, a) {
  return new Promise(function(t, l) {
    const u = Object.assign(document.createElement("img"), a);
    function f() {
      u.onload = null, u.onerror = null;
    }
    u.onload = function() {
      f(), t(u);
    }, u.onerror = function() {
      f(), l(new Error('Failed to load the image "' + e + '"'));
    }, u.src = e;
  });
};
var Ae = {}, Ee = {}, Y = {};
Object.defineProperty(Y, "__esModule", {
  value: !0
});
Y.loop = Y.conditional = Y.parse = void 0;
var tr = function e(a, t) {
  var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : l;
  if (Array.isArray(t))
    t.forEach(function(h) {
      return e(a, h, l, u);
    });
  else if (typeof t == "function")
    t(a, l, u, e);
  else {
    var f = Object.keys(t)[0];
    Array.isArray(t[f]) ? (u[f] = {}, e(a, t[f], l, u[f])) : u[f] = t[f](a, l, u, e);
  }
  return l;
};
Y.parse = tr;
var er = function(a, t) {
  return function(l, u, f, h) {
    t(l, u, f) && h(l, a, u, f);
  };
};
Y.conditional = er;
var rr = function(a, t) {
  return function(l, u, f, h) {
    for (var y = [], m = l.pos; t(l, u, f); ) {
      var w = {};
      if (h(l, a, u, w), l.pos === m)
        break;
      m = l.pos, y.push(w);
    }
    return y;
  };
};
Y.loop = rr;
var S = {};
Object.defineProperty(S, "__esModule", {
  value: !0
});
S.readBits = S.readArray = S.readUnsigned = S.readString = S.peekBytes = S.readBytes = S.peekByte = S.readByte = S.buildStream = void 0;
var ir = function(a) {
  return {
    data: a,
    pos: 0
  };
};
S.buildStream = ir;
var xe = function() {
  return function(a) {
    return a.data[a.pos++];
  };
};
S.readByte = xe;
var nr = function() {
  var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
  return function(t) {
    return t.data[t.pos + a];
  };
};
S.peekByte = nr;
var Ut = function(a) {
  return function(t) {
    return t.data.subarray(t.pos, t.pos += a);
  };
};
S.readBytes = Ut;
var ar = function(a) {
  return function(t) {
    return t.data.subarray(t.pos, t.pos + a);
  };
};
S.peekBytes = ar;
var or = function(a) {
  return function(t) {
    return Array.from(Ut(a)(t)).map(function(l) {
      return String.fromCharCode(l);
    }).join("");
  };
};
S.readString = or;
var sr = function(a) {
  return function(t) {
    var l = Ut(2)(t);
    return a ? (l[1] << 8) + l[0] : (l[0] << 8) + l[1];
  };
};
S.readUnsigned = sr;
var lr = function(a, t) {
  return function(l, u, f) {
    for (var h = typeof t == "function" ? t(l, u, f) : t, y = Ut(a), m = new Array(h), w = 0; w < h; w++)
      m[w] = y(l);
    return m;
  };
};
S.readArray = lr;
var ur = function(a, t, l) {
  for (var u = 0, f = 0; f < l; f++)
    u += a[t + f] && Math.pow(2, l - f - 1);
  return u;
}, fr = function(a) {
  return function(t) {
    for (var l = xe()(t), u = new Array(8), f = 0; f < 8; f++)
      u[7 - f] = !!(l & 1 << f);
    return Object.keys(a).reduce(function(h, y) {
      var m = a[y];
      return m.length ? h[y] = ur(u, m.index, m.length) : h[y] = u[m.index], h;
    }, {});
  };
};
S.readBits = fr;
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0;
  var a = Y, t = S, l = {
    blocks: function(b) {
      for (var s = 0, r = [], o = b.data.length, c = 0, i = (0, t.readByte)()(b); i !== s && i; i = (0, t.readByte)()(b)) {
        if (b.pos + i >= o) {
          var n = o - b.pos;
          r.push((0, t.readBytes)(n)(b)), c += n;
          break;
        }
        r.push((0, t.readBytes)(i)(b)), c += i;
      }
      for (var v = new Uint8Array(c), d = 0, p = 0; p < r.length; p++)
        v.set(r[p], d), d += r[p].length;
      return v;
    }
  }, u = (0, a.conditional)({
    gce: [{
      codes: (0, t.readBytes)(2)
    }, {
      byteSize: (0, t.readByte)()
    }, {
      extras: (0, t.readBits)({
        future: {
          index: 0,
          length: 3
        },
        disposal: {
          index: 3,
          length: 3
        },
        userInput: {
          index: 6
        },
        transparentColorGiven: {
          index: 7
        }
      })
    }, {
      delay: (0, t.readUnsigned)(!0)
    }, {
      transparentColorIndex: (0, t.readByte)()
    }, {
      terminator: (0, t.readByte)()
    }]
  }, function(B) {
    var b = (0, t.peekBytes)(2)(B);
    return b[0] === 33 && b[1] === 249;
  }), f = (0, a.conditional)({
    image: [{
      code: (0, t.readByte)()
    }, {
      descriptor: [{
        left: (0, t.readUnsigned)(!0)
      }, {
        top: (0, t.readUnsigned)(!0)
      }, {
        width: (0, t.readUnsigned)(!0)
      }, {
        height: (0, t.readUnsigned)(!0)
      }, {
        lct: (0, t.readBits)({
          exists: {
            index: 0
          },
          interlaced: {
            index: 1
          },
          sort: {
            index: 2
          },
          future: {
            index: 3,
            length: 2
          },
          size: {
            index: 5,
            length: 3
          }
        })
      }]
    }, (0, a.conditional)({
      lct: (0, t.readArray)(3, function(B, b, s) {
        return Math.pow(2, s.descriptor.lct.size + 1);
      })
    }, function(B, b, s) {
      return s.descriptor.lct.exists;
    }), {
      data: [{
        minCodeSize: (0, t.readByte)()
      }, l]
    }]
  }, function(B) {
    return (0, t.peekByte)()(B) === 44;
  }), h = (0, a.conditional)({
    text: [{
      codes: (0, t.readBytes)(2)
    }, {
      blockSize: (0, t.readByte)()
    }, {
      preData: function(b, s, r) {
        return (0, t.readBytes)(r.text.blockSize)(b);
      }
    }, l]
  }, function(B) {
    var b = (0, t.peekBytes)(2)(B);
    return b[0] === 33 && b[1] === 1;
  }), y = (0, a.conditional)({
    application: [{
      codes: (0, t.readBytes)(2)
    }, {
      blockSize: (0, t.readByte)()
    }, {
      id: function(b, s, r) {
        return (0, t.readString)(r.blockSize)(b);
      }
    }, l]
  }, function(B) {
    var b = (0, t.peekBytes)(2)(B);
    return b[0] === 33 && b[1] === 255;
  }), m = (0, a.conditional)({
    comment: [{
      codes: (0, t.readBytes)(2)
    }, l]
  }, function(B) {
    var b = (0, t.peekBytes)(2)(B);
    return b[0] === 33 && b[1] === 254;
  }), w = [
    {
      header: [{
        signature: (0, t.readString)(3)
      }, {
        version: (0, t.readString)(3)
      }]
    },
    {
      lsd: [{
        width: (0, t.readUnsigned)(!0)
      }, {
        height: (0, t.readUnsigned)(!0)
      }, {
        gct: (0, t.readBits)({
          exists: {
            index: 0
          },
          resolution: {
            index: 1,
            length: 3
          },
          sort: {
            index: 4
          },
          size: {
            index: 5,
            length: 3
          }
        })
      }, {
        backgroundColorIndex: (0, t.readByte)()
      }, {
        pixelAspectRatio: (0, t.readByte)()
      }]
    },
    (0, a.conditional)({
      gct: (0, t.readArray)(3, function(B, b) {
        return Math.pow(2, b.lsd.gct.size + 1);
      })
    }, function(B, b) {
      return b.lsd.gct.exists;
    }),
    // content frames
    {
      frames: (0, a.loop)([u, y, m, f, h], function(B) {
        var b = (0, t.peekByte)()(B);
        return b === 33 || b === 44;
      })
    }
  ], E = w;
  e.default = E;
})(Ee);
var Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.deinterlace = void 0;
Gt.deinterlace = function(e, a) {
  for (var t = new Array(e.length), l = e.length / a, u = function(E, B) {
    var b = e.slice(B * a, (B + 1) * a);
    t.splice.apply(t, [E * a, a].concat(b));
  }, f = [0, 4, 2, 1], h = [8, 8, 4, 2], y = 0, m = 0; m < 4; m++)
    for (var w = f[m]; w < l; w += h[m])
      u(w, y), y++;
  return t;
};
var zt = {};
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.lzw = void 0;
zt.lzw = function(e, a, t) {
  var l = 4096, u = -1, f = t, h, y, m, w, E, B, b, p, s, r, d, o, _, R, x, C, c = new Array(t), i = new Array(l), n = new Array(l), v = new Array(l + 1);
  for (o = e, y = 1 << o, E = y + 1, h = y + 2, b = u, w = o + 1, m = (1 << w) - 1, s = 0; s < y; s++)
    i[s] = 0, n[s] = s;
  var d, p, _, R, C, x;
  for (d = p = _ = R = C = x = 0, r = 0; r < f; ) {
    if (R === 0) {
      if (p < w) {
        d += a[x] << p, p += 8, x++;
        continue;
      }
      if (s = d & m, d >>= w, p -= w, s > h || s == E)
        break;
      if (s == y) {
        w = o + 1, m = (1 << w) - 1, h = y + 2, b = u;
        continue;
      }
      if (b == u) {
        v[R++] = n[s], b = s, _ = s;
        continue;
      }
      for (B = s, s == h && (v[R++] = _, s = b); s > y; )
        v[R++] = n[s], s = i[s];
      _ = n[s] & 255, v[R++] = _, h < l && (i[h] = b, n[h] = _, h++, !(h & m) && h < l && (w++, m += h)), b = B;
    }
    R--, c[C++] = v[R], r++;
  }
  for (r = C; r < f; r++)
    c[r] = 0;
  return c;
};
(function(e) {
  var a = U && U.__importDefault || function(m) {
    return m && m.__esModule ? m : { default: m };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.decompressFrames = e.decompressFrame = e.parseGIF = void 0;
  var t = a(Ee), l = Y, u = S, f = Gt, h = zt;
  e.parseGIF = function(m) {
    var w = new Uint8Array(m);
    return l.parse(u.buildStream(w), t.default);
  };
  var y = function(m) {
    for (var w = m.pixels.length, E = new Uint8ClampedArray(w * 4), B = 0; B < w; B++) {
      var b = B * 4, s = m.pixels[B], r = m.colorTable[s];
      E[b] = r[0], E[b + 1] = r[1], E[b + 2] = r[2], E[b + 3] = s !== m.transparentIndex ? 255 : 0;
    }
    return E;
  };
  e.decompressFrame = function(m, w, E) {
    if (!m.image) {
      console.warn("gif frame does not have associated image.");
      return;
    }
    var B = m.image, b = B.descriptor.width * B.descriptor.height, s = h.lzw(B.data.minCodeSize, B.data.blocks, b);
    B.descriptor.lct.interlaced && (s = f.deinterlace(s, B.descriptor.width));
    var r = {
      pixels: s,
      dims: {
        top: m.image.descriptor.top,
        left: m.image.descriptor.left,
        width: m.image.descriptor.width,
        height: m.image.descriptor.height
      }
    };
    return B.descriptor.lct && B.descriptor.lct.exists ? r.colorTable = B.lct : r.colorTable = w, m.gce && (r.delay = (m.gce.delay || 10) * 10, r.disposalType = m.gce.extras.disposal, m.gce.extras.transparentColorGiven && (r.transparentIndex = m.gce.transparentColorIndex)), E && (r.patch = y(r)), r;
  }, e.decompressFrames = function(m, w) {
    return m.frames.filter(function(E) {
      return E.image;
    }).map(function(E) {
      return e.decompressFrame(E, m.gct, w);
    });
  };
})(Ae);
var cr = 100, F = 256, me = F - 1, at = 4, De = 16, re = 1 << De, ke = 10, ie = 10, hr = re >> ie, dr = re << ke - ie, vr = F >> 3, te = 6, gr = 1 << te, pr = vr * gr, mr = 30, Te = 10, Tt = 1 << Te, Me = 8, ye = 1 << Me, yr = Te + Me, ct = 1 << yr, we = 499, be = 491, _e = 487, Le = 503, wr = 3 * Le;
function br(e, a) {
  var t, l, u, f, h;
  function y() {
    t = [], l = new Int32Array(256), u = new Int32Array(F), f = new Int32Array(F), h = new Int32Array(F >> 3);
    var i, n;
    for (i = 0; i < F; i++)
      n = (i << at + 8) / F, t[i] = new Float64Array([n, n, n, 0]), f[i] = re / F, u[i] = 0;
  }
  function m() {
    for (var i = 0; i < F; i++)
      t[i][0] >>= at, t[i][1] >>= at, t[i][2] >>= at, t[i][3] = i;
  }
  function w(i, n, v, d, p) {
    t[n][0] -= i * (t[n][0] - v) / Tt, t[n][1] -= i * (t[n][1] - d) / Tt, t[n][2] -= i * (t[n][2] - p) / Tt;
  }
  function E(i, n, v, d, p) {
    for (var _ = Math.abs(n - i), R = Math.min(n + i, F), C = n + 1, x = n - 1, k = 1, g, T; C < R || x > _; )
      T = h[k++], C < R && (g = t[C++], g[0] -= T * (g[0] - v) / ct, g[1] -= T * (g[1] - d) / ct, g[2] -= T * (g[2] - p) / ct), x > _ && (g = t[x--], g[0] -= T * (g[0] - v) / ct, g[1] -= T * (g[1] - d) / ct, g[2] -= T * (g[2] - p) / ct);
  }
  function B(i, n, v) {
    var d = 2147483647, p = d, _ = -1, R = _, C, x, k, g, T;
    for (C = 0; C < F; C++)
      x = t[C], k = Math.abs(x[0] - i) + Math.abs(x[1] - n) + Math.abs(x[2] - v), k < d && (d = k, _ = C), g = k - (u[C] >> De - at), g < p && (p = g, R = C), T = f[C] >> ie, f[C] -= T, u[C] += T << ke;
    return f[_] += hr, u[_] -= dr, R;
  }
  function b() {
    var i, n, v, d, p, _, R = 0, C = 0;
    for (i = 0; i < F; i++) {
      for (v = t[i], p = i, _ = v[1], n = i + 1; n < F; n++)
        d = t[n], d[1] < _ && (p = n, _ = d[1]);
      if (d = t[p], i != p && (n = d[0], d[0] = v[0], v[0] = n, n = d[1], d[1] = v[1], v[1] = n, n = d[2], d[2] = v[2], v[2] = n, n = d[3], d[3] = v[3], v[3] = n), _ != R) {
        for (l[R] = C + i >> 1, n = R + 1; n < _; n++)
          l[n] = i;
        R = _, C = i;
      }
    }
    for (l[R] = C + me >> 1, n = R + 1; n < 256; n++)
      l[n] = me;
  }
  function s(i, n, v) {
    for (var d, p, _, R = 1e3, C = -1, x = l[n], k = x - 1; x < F || k >= 0; )
      x < F && (p = t[x], _ = p[1] - n, _ >= R ? x = F : (x++, _ < 0 && (_ = -_), d = p[0] - i, d < 0 && (d = -d), _ += d, _ < R && (d = p[2] - v, d < 0 && (d = -d), _ += d, _ < R && (R = _, C = p[3])))), k >= 0 && (p = t[k], _ = n - p[1], _ >= R ? k = -1 : (k--, _ < 0 && (_ = -_), d = p[0] - i, d < 0 && (d = -d), _ += d, _ < R && (d = p[2] - v, d < 0 && (d = -d), _ += d, _ < R && (R = _, C = p[3]))));
    return C;
  }
  function r() {
    var i, n = e.length, v = 30 + (a - 1) / 3, d = n / (3 * a), p = ~~(d / cr), _ = Tt, R = pr, C = R >> te;
    for (C <= 1 && (C = 0), i = 0; i < C; i++)
      h[i] = _ * ((C * C - i * i) * ye / (C * C));
    var x;
    n < wr ? (a = 1, x = 3) : n % we !== 0 ? x = 3 * we : n % be !== 0 ? x = 3 * be : n % _e !== 0 ? x = 3 * _e : x = 3 * Le;
    var k, g, T, A, D = 0;
    for (i = 0; i < d; )
      if (k = (e[D] & 255) << at, g = (e[D + 1] & 255) << at, T = (e[D + 2] & 255) << at, A = B(k, g, T), w(_, A, k, g, T), C !== 0 && E(C, A, k, g, T), D += x, D >= n && (D -= n), i++, p === 0 && (p = 1), i % p === 0)
        for (_ -= _ / v, R -= R / mr, C = R >> te, C <= 1 && (C = 0), A = 0; A < C; A++)
          h[A] = _ * ((C * C - A * A) * ye / (C * C));
  }
  function o() {
    y(), r(), m(), b();
  }
  this.buildColormap = o;
  function c() {
    for (var i = [], n = [], v = 0; v < F; v++)
      n[t[v][3]] = v;
    for (var d = 0, p = 0; p < F; p++) {
      var _ = n[p];
      i[d++] = t[_][0], i[d++] = t[_][1], i[d++] = t[_][2];
    }
    return i;
  }
  this.getColormap = c, this.lookupRGB = s;
}
var _r = br, Be = -1, Mt = 12, Bt = 5003, Br = [
  0,
  1,
  3,
  7,
  15,
  31,
  63,
  127,
  255,
  511,
  1023,
  2047,
  4095,
  8191,
  16383,
  32767,
  65535
];
function Cr(e, a, t, l) {
  var u = Math.max(2, l), f = new Uint8Array(256), h = new Int32Array(Bt), y = new Int32Array(Bt), m, w = 0, E, B = 0, b, s = !1, r, o, c, i, n, v;
  function d(A, D) {
    f[E++] = A, E >= 254 && x(D);
  }
  function p(A) {
    _(Bt), B = o + 2, s = !0, T(o, A);
  }
  function _(A) {
    for (var D = 0; D < A; ++D)
      h[D] = -1;
  }
  function R(A, D) {
    var P, tt, I, $, Z, et, K;
    for (r = A, s = !1, v = r, b = k(v), o = 1 << A - 1, c = o + 1, B = o + 2, E = 0, $ = g(), K = 0, P = Bt; P < 65536; P *= 2)
      ++K;
    K = 8 - K, et = Bt, _(et), T(o, D);
    t:
      for (; (tt = g()) != Be; ) {
        if (P = (tt << Mt) + $, I = tt << K ^ $, h[I] === P) {
          $ = y[I];
          continue;
        } else if (h[I] >= 0) {
          Z = et - I, I === 0 && (Z = 1);
          do
            if ((I -= Z) < 0 && (I += et), h[I] === P) {
              $ = y[I];
              continue t;
            }
          while (h[I] >= 0);
        }
        T($, D), $ = tt, B < 1 << Mt ? (y[I] = B++, h[I] = P) : p(D);
      }
    T($, D), T(c, D);
  }
  function C(A) {
    A.writeByte(u), i = e * a, n = 0, R(u + 1, A), A.writeByte(0);
  }
  function x(A) {
    E > 0 && (A.writeByte(E), A.writeBytes(f, 0, E), E = 0);
  }
  function k(A) {
    return (1 << A) - 1;
  }
  function g() {
    if (i === 0)
      return Be;
    --i;
    var A = t[n++];
    return A & 255;
  }
  function T(A, D) {
    for (m &= Br[w], w > 0 ? m |= A << w : m = A, w += v; w >= 8; )
      d(m & 255, D), m >>= 8, w -= 8;
    if ((B > b || s) && (s ? (b = k(v = r), s = !1) : (++v, v == Mt ? b = 1 << Mt : b = k(v))), A == c) {
      for (; w > 0; )
        d(m & 255, D), m >>= 8, w -= 8;
      x(D);
    }
  }
  this.encode = C;
}
var Rr = Cr, Pr = _r, Ar = Rr;
function G() {
  this.page = -1, this.pages = [], this.newPage();
}
G.pageSize = 4096;
G.charMap = {};
for (var Lt = 0; Lt < 256; Lt++)
  G.charMap[Lt] = String.fromCharCode(Lt);
G.prototype.newPage = function() {
  this.pages[++this.page] = new Uint8Array(G.pageSize), this.cursor = 0;
};
G.prototype.getData = function() {
  for (var e = "", a = 0; a < this.pages.length; a++)
    for (var t = 0; t < G.pageSize; t++)
      e += G.charMap[this.pages[a][t]];
  return e;
};
G.prototype.toFlattenUint8Array = function() {
  for (var e = [], a = 0; a < this.pages.length; a++)
    if (a === this.pages.length - 1) {
      var t = Uint8Array.from(this.pages[a].slice(0, this.cursor));
      e.push(t);
    } else
      e.push(this.pages[a]);
  var l = new Uint8Array(e.reduce(function(u, f) {
    return u + f.length;
  }, 0));
  return e.reduce(function(u, f) {
    return l.set(f, u), u + f.length;
  }, 0), l;
};
G.prototype.writeByte = function(e) {
  this.cursor >= G.pageSize && this.newPage(), this.pages[this.page][this.cursor++] = e;
};
G.prototype.writeUTFBytes = function(e) {
  for (var a = e.length, t = 0; t < a; t++)
    this.writeByte(e.charCodeAt(t));
};
G.prototype.writeBytes = function(e, a, t) {
  for (var l = t || e.length, u = a || 0; u < l; u++)
    this.writeByte(e[u]);
};
function L(e, a) {
  this.width = ~~e, this.height = ~~a, this.transparent = null, this.transIndex = 0, this.repeat = -1, this.delay = 0, this.image = null, this.pixels = null, this.indexedPixels = null, this.colorDepth = null, this.colorTab = null, this.neuQuant = null, this.usedEntry = new Array(), this.palSize = 7, this.dispose = -1, this.firstFrame = !0, this.sample = 10, this.dither = !1, this.globalPalette = !1, this.out = new G();
}
L.prototype.setDelay = function(e) {
  this.delay = Math.round(e / 10);
};
L.prototype.setFrameRate = function(e) {
  this.delay = Math.round(100 / e);
};
L.prototype.setDispose = function(e) {
  e >= 0 && (this.dispose = e);
};
L.prototype.setRepeat = function(e) {
  this.repeat = e;
};
L.prototype.setTransparent = function(e) {
  this.transparent = e;
};
L.prototype.addFrame = function(e) {
  this.image = e, this.colorTab = this.globalPalette && this.globalPalette.slice ? this.globalPalette : null, this.getImagePixels(), this.analyzePixels(), this.globalPalette === !0 && (this.globalPalette = this.colorTab), this.firstFrame && (this.writeHeader(), this.writeLSD(), this.writePalette(), this.repeat >= 0 && this.writeNetscapeExt()), this.writeGraphicCtrlExt(), this.writeImageDesc(), !this.firstFrame && !this.globalPalette && this.writePalette(), this.writePixels(), this.firstFrame = !1;
};
L.prototype.finish = function() {
  this.out.writeByte(59);
};
L.prototype.setQuality = function(e) {
  e < 1 && (e = 1), this.sample = e;
};
L.prototype.setDither = function(e) {
  e === !0 && (e = "FloydSteinberg"), this.dither = e;
};
L.prototype.setGlobalPalette = function(e) {
  this.globalPalette = e;
};
L.prototype.getGlobalPalette = function() {
  return this.globalPalette && this.globalPalette.slice && this.globalPalette.slice(0) || this.globalPalette;
};
L.prototype.writeHeader = function() {
  this.out.writeUTFBytes("GIF89a");
};
L.prototype.analyzePixels = function() {
  this.colorTab || (this.neuQuant = new Pr(this.pixels, this.sample), this.neuQuant.buildColormap(), this.colorTab = this.neuQuant.getColormap()), this.dither ? this.ditherPixels(this.dither.replace("-serpentine", ""), this.dither.match(/-serpentine/) !== null) : this.indexPixels(), this.pixels = null, this.colorDepth = 8, this.palSize = 7, this.transparent !== null && (this.transIndex = this.findClosest(this.transparent, !0));
};
L.prototype.indexPixels = function(e) {
  var a = this.pixels.length / 3;
  this.indexedPixels = new Uint8Array(a);
  for (var t = 0, l = 0; l < a; l++) {
    var u = this.findClosestRGB(this.pixels[t++] & 255, this.pixels[t++] & 255, this.pixels[t++] & 255);
    this.usedEntry[u] = !0, this.indexedPixels[l] = u;
  }
};
L.prototype.ditherPixels = function(e, a) {
  var t = {
    FalseFloydSteinberg: [
      [0.375, 1, 0],
      [0.375, 0, 1],
      [0.25, 1, 1]
    ],
    FloydSteinberg: [
      [0.4375, 1, 0],
      [0.1875, -1, 1],
      [0.3125, 0, 1],
      [0.0625, 1, 1]
    ],
    Stucki: [
      [0.19047619047619047, 1, 0],
      [0.09523809523809523, 2, 0],
      [0.047619047619047616, -2, 1],
      [0.09523809523809523, -1, 1],
      [0.19047619047619047, 0, 1],
      [0.09523809523809523, 1, 1],
      [0.047619047619047616, 2, 1],
      [0.023809523809523808, -2, 2],
      [0.047619047619047616, -1, 2],
      [0.09523809523809523, 0, 2],
      [0.047619047619047616, 1, 2],
      [0.023809523809523808, 2, 2]
    ],
    Atkinson: [
      [0.125, 1, 0],
      [0.125, 2, 0],
      [0.125, -1, 1],
      [0.125, 0, 1],
      [0.125, 1, 1],
      [0.125, 0, 2]
    ]
  };
  if (!e || !t[e])
    throw "Unknown dithering kernel: " + e;
  var l = t[e], u = 0, f = this.height, h = this.width, y = this.pixels, m = a ? -1 : 1;
  this.indexedPixels = new Uint8Array(this.pixels.length / 3);
  for (var w = 0; w < f; w++) {
    a && (m = m * -1);
    for (var E = m == 1 ? 0 : h - 1, B = m == 1 ? h : 0; E !== B; E += m) {
      u = w * h + E;
      var b = u * 3, s = y[b], r = y[b + 1], o = y[b + 2];
      b = this.findClosestRGB(s, r, o), this.usedEntry[b] = !0, this.indexedPixels[u] = b, b *= 3;
      for (var c = this.colorTab[b], i = this.colorTab[b + 1], n = this.colorTab[b + 2], v = s - c, d = r - i, p = o - n, _ = m == 1 ? 0 : l.length - 1, R = m == 1 ? l.length : 0; _ !== R; _ += m) {
        var C = l[_][1], x = l[_][2];
        if (C + E >= 0 && C + E < h && x + w >= 0 && x + w < f) {
          var k = l[_][0];
          b = u + C + x * h, b *= 3, y[b] = Math.max(0, Math.min(255, y[b] + v * k)), y[b + 1] = Math.max(0, Math.min(255, y[b + 1] + d * k)), y[b + 2] = Math.max(0, Math.min(255, y[b + 2] + p * k));
        }
      }
    }
  }
};
L.prototype.findClosest = function(e, a) {
  return this.findClosestRGB((e & 16711680) >> 16, (e & 65280) >> 8, e & 255, a);
};
L.prototype.findClosestRGB = function(e, a, t, l) {
  if (this.colorTab === null)
    return -1;
  if (this.neuQuant && !l)
    return this.neuQuant.lookupRGB(e, a, t);
  for (var u = 0, f = 256 * 256 * 256, h = this.colorTab.length, y = 0, m = 0; y < h; m++) {
    var w = e - (this.colorTab[y++] & 255), E = a - (this.colorTab[y++] & 255), B = t - (this.colorTab[y++] & 255), b = w * w + E * E + B * B;
    (!l || this.usedEntry[m]) && b < f && (f = b, u = m);
  }
  return u;
};
L.prototype.getImagePixels = function() {
  var e = this.width, a = this.height;
  this.pixels = new Uint8Array(e * a * 3);
  for (var t = this.image, l = 0, u = 0, f = 0; f < a; f++)
    for (var h = 0; h < e; h++)
      this.pixels[u++] = t[l++], this.pixels[u++] = t[l++], this.pixels[u++] = t[l++], l++;
};
L.prototype.writeGraphicCtrlExt = function() {
  this.out.writeByte(33), this.out.writeByte(249), this.out.writeByte(4);
  var e, a;
  this.transparent === null ? (e = 0, a = 0) : (e = 1, a = 2), this.dispose >= 0 && (a = this.dispose & 7), a <<= 2, this.out.writeByte(
    0 | // 1:3 reserved
    a | // 4:6 disposal
    0 | // 7 user input - 0 = none
    e
    // 8 transparency flag
  ), this.writeShort(this.delay), this.out.writeByte(this.transIndex), this.out.writeByte(0);
};
L.prototype.writeImageDesc = function() {
  this.out.writeByte(44), this.writeShort(0), this.writeShort(0), this.writeShort(this.width), this.writeShort(this.height), this.firstFrame || this.globalPalette ? this.out.writeByte(0) : this.out.writeByte(
    128 | // 4-5 reserved
    this.palSize
    // 6-8 size of color table
  );
};
L.prototype.writeLSD = function() {
  this.writeShort(this.width), this.writeShort(this.height), this.out.writeByte(
    240 | // 5 : gct sort flag = 0
    this.palSize
    // 6-8 : gct size
  ), this.out.writeByte(0), this.out.writeByte(0);
};
L.prototype.writeNetscapeExt = function() {
  this.out.writeByte(33), this.out.writeByte(255), this.out.writeByte(11), this.out.writeUTFBytes("NETSCAPE2.0"), this.out.writeByte(3), this.out.writeByte(1), this.writeShort(this.repeat), this.out.writeByte(0);
};
L.prototype.writePalette = function() {
  this.out.writeBytes(this.colorTab);
  for (var e = 3 * 256 - this.colorTab.length, a = 0; a < e; a++)
    this.out.writeByte(0);
};
L.prototype.writeShort = function(e) {
  this.out.writeByte(e & 255), this.out.writeByte(e >> 8 & 255);
};
L.prototype.writePixels = function() {
  var e = new Ar(this.width, this.height, this.indexedPixels, this.colorDepth);
  e.encode(this.out);
};
L.prototype.stream = function() {
  return this.out;
};
var Er = L, Nt = U && U.__assign || function() {
  return Nt = Object.assign || function(e) {
    for (var a, t = 1, l = arguments.length; t < l; t++) {
      a = arguments[t];
      for (var u in a)
        Object.prototype.hasOwnProperty.call(a, u) && (e[u] = a[u]);
    }
    return e;
  }, Nt.apply(this, arguments);
}, xr = U && U.__awaiter || function(e, a, t, l) {
  function u(f) {
    return f instanceof t ? f : new t(function(h) {
      h(f);
    });
  }
  return new (t || (t = Promise))(function(f, h) {
    function y(E) {
      try {
        w(l.next(E));
      } catch (B) {
        h(B);
      }
    }
    function m(E) {
      try {
        w(l.throw(E));
      } catch (B) {
        h(B);
      }
    }
    function w(E) {
      E.done ? f(E.value) : u(E.value).then(y, m);
    }
    w((l = l.apply(e, a || [])).next());
  });
}, Dr = U && U.__generator || function(e, a) {
  var t = { label: 0, sent: function() {
    if (f[0] & 1)
      throw f[1];
    return f[1];
  }, trys: [], ops: [] }, l, u, f, h;
  return h = { next: y(0), throw: y(1), return: y(2) }, typeof Symbol == "function" && (h[Symbol.iterator] = function() {
    return this;
  }), h;
  function y(w) {
    return function(E) {
      return m([w, E]);
    };
  }
  function m(w) {
    if (l)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (l = 1, u && (f = w[0] & 2 ? u.return : w[0] ? u.throw || ((f = u.return) && f.call(u), 0) : u.next) && !(f = f.call(u, w[1])).done)
          return f;
        switch (u = 0, f && (w = [w[0] & 2, f.value]), w[0]) {
          case 0:
          case 1:
            f = w;
            break;
          case 4:
            return t.label++, { value: w[1], done: !1 };
          case 5:
            t.label++, u = w[1], w = [0];
            continue;
          case 7:
            w = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (f = t.trys, !(f = f.length > 0 && f[f.length - 1]) && (w[0] === 6 || w[0] === 2)) {
              t = 0;
              continue;
            }
            if (w[0] === 3 && (!f || w[1] > f[0] && w[1] < f[3])) {
              t.label = w[1];
              break;
            }
            if (w[0] === 6 && t.label < f[1]) {
              t.label = f[1], f = w;
              break;
            }
            if (f && t.label < f[2]) {
              t.label = f[2], t.ops.push(w);
              break;
            }
            f[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        w = a.call(e, t);
      } catch (E) {
        w = [6, E], u = 0;
      } finally {
        l = f = 0;
      }
    if (w[0] & 5)
      throw w[1];
    return { value: w[0] ? w[1] : void 0, done: !0 };
  }
}, kr = U && U.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.AwesomeQR = void 0;
var J = Ct, Ce = Ae, It = ee, Tr = kr(Er), St = 0.4, Mr = (
  /** @class */
  function() {
    function e(a) {
      var t = Object.assign({}, a);
      if (Object.keys(e.defaultOptions).forEach(function(l) {
        l in t || Object.defineProperty(t, l, { value: e.defaultOptions[l], enumerable: !0, writable: !0 });
      }), t.components ? typeof t.components == "object" && Object.keys(e.defaultComponentOptions).forEach(function(l) {
        l in t.components ? Object.defineProperty(t.components, l, {
          value: Nt(Nt({}, e.defaultComponentOptions[l]), t.components[l]),
          enumerable: !0,
          writable: !0
        }) : Object.defineProperty(t.components, l, {
          value: e.defaultComponentOptions[l],
          enumerable: !0,
          writable: !0
        });
      }) : t.components = e.defaultComponentOptions, t.dotScale !== null && t.dotScale !== void 0) {
        if (t.dotScale <= 0 || t.dotScale > 1)
          throw new Error("dotScale should be in range (0, 1].");
        t.components.data.scale = t.dotScale, t.components.timing.scale = t.dotScale, t.components.alignment.scale = t.dotScale;
      }
      this.options = t, this.canvas = J.createCanvas(a.size, a.size), this.canvasContext = this.canvas.getContext("2d"), this.qrCode = new It.QRCodeModel(-1, this.options.correctLevel), Number.isInteger(this.options.maskPattern) && (this.qrCode.maskPattern = this.options.maskPattern), Number.isInteger(this.options.version) && (this.qrCode.typeNumber = this.options.version), this.qrCode.addData(this.options.text), this.qrCode.make();
    }
    return e.prototype.draw = function() {
      var a = this;
      return new Promise(function(t) {
        return a._draw().then(t);
      });
    }, e.prototype._clear = function() {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, e._prepareRoundedCornerClip = function(a, t, l, u, f, h) {
      a.beginPath(), a.moveTo(t, l), a.arcTo(t + u, l, t + u, l + f, h), a.arcTo(t + u, l + f, t, l + f, h), a.arcTo(t, l + f, t, l, h), a.arcTo(t, l, t + u, l, h), a.closePath();
    }, e._getAverageRGB = function(a) {
      var t = 5, l = {
        r: 0,
        g: 0,
        b: 0
      }, u, f, h = -4, y = {
        r: 0,
        g: 0,
        b: 0
      }, m = 0;
      f = a.naturalHeight || a.height, u = a.naturalWidth || a.width;
      var w = J.createCanvas(u, f), E = w.getContext("2d");
      if (!E)
        return l;
      E.drawImage(a, 0, 0);
      var B;
      try {
        B = E.getImageData(0, 0, u, f);
      } catch {
        return l;
      }
      for (; (h += t * 4) < B.data.length; )
        B.data[h] > 200 || B.data[h + 1] > 200 || B.data[h + 2] > 200 || (++m, y.r += B.data[h], y.g += B.data[h + 1], y.b += B.data[h + 2]);
      return y.r = ~~(y.r / m), y.g = ~~(y.g / m), y.b = ~~(y.b / m), y;
    }, e._drawDot = function(a, t, l, u, f, h) {
      f === void 0 && (f = 0), h === void 0 && (h = 1), a.fillRect((t + f) * u, (l + f) * u, h * u, h * u);
    }, e._drawAlignProtector = function(a, t, l, u) {
      a.clearRect((t - 2) * u, (l - 2) * u, 5 * u, 5 * u), a.fillRect((t - 2) * u, (l - 2) * u, 5 * u, 5 * u);
    }, e._drawAlign = function(a, t, l, u, f, h, y, m) {
      f === void 0 && (f = 0), h === void 0 && (h = 1);
      var w = a.fillStyle;
      a.fillStyle = y, new Array(4).fill(0).map(function(E, B) {
        e._drawDot(a, t - 2 + B, l - 2, u, f, h), e._drawDot(a, t + 2, l - 2 + B, u, f, h), e._drawDot(a, t + 2 - B, l + 2, u, f, h), e._drawDot(a, t - 2, l + 2 - B, u, f, h);
      }), e._drawDot(a, t, l, u, f, h), m || (a.fillStyle = "rgba(255, 255, 255, 0.6)", new Array(2).fill(0).map(function(E, B) {
        e._drawDot(a, t - 1 + B, l - 1, u, f, h), e._drawDot(a, t + 1, l - 1 + B, u, f, h), e._drawDot(a, t + 1 - B, l + 1, u, f, h), e._drawDot(a, t - 1, l + 1 - B, u, f, h);
      })), a.fillStyle = w;
    }, e.prototype._draw = function() {
      var a, t, l, u, f, h, y, m, w, E, B, b, s, r, o, c, i, n, v;
      return xr(this, void 0, void 0, function() {
        var d, p, _, R, C, x, k, g, T, A, D, P, tt, I, $, Z, et, K, ht, dt, vt, M, W, gt, Rt, Q, st, Ht, N, O, jt, lt, ne, X, M, $t, Kt, ae, z, oe, M, q, H, j, Pt, Xt, M, Jt, se, Wt, le, M, q, H, j, ue, pt, rt, mt, it, yt, At, fe, V, ut, wt, ft, Zt, Et, ce, he, qt, de;
        return Dr(this, function(bt) {
          switch (bt.label) {
            case 0:
              if (d = (a = this.qrCode) === null || a === void 0 ? void 0 : a.moduleCount, p = this.options.size, _ = this.options.margin, (_ < 0 || _ * 2 >= p) && (_ = 0), R = Math.ceil(_), C = p - 2 * _, x = this.options.whiteMargin, k = this.options.backgroundDimming, g = Math.ceil(C / d), T = g * d, A = T + 2 * R, D = J.createCanvas(A, A), P = D.getContext("2d"), this._clear(), P.save(), P.translate(R, R), tt = J.createCanvas(A, A), I = tt.getContext("2d"), $ = null, Z = [], !this.options.gifBackground)
                return [3, 1];
              if (et = Ce.parseGIF(this.options.gifBackground), $ = et, Z = Ce.decompressFrames(et, !0), this.options.autoColor) {
                for (K = 0, ht = 0, dt = 0, vt = 0, M = 0; M < Z[0].colorTable.length; M++)
                  W = Z[0].colorTable[M], !(W[0] > 200 || W[1] > 200 || W[2] > 200) && (W[0] === 0 && W[1] === 0 && W[2] === 0 || (vt++, K += W[0], ht += W[1], dt += W[2]));
                K = ~~(K / vt), ht = ~~(ht / vt), dt = ~~(dt / vt), this.options.colorDark = "rgb(" + K + "," + ht + "," + dt + ")";
              }
              return [3, 4];
            case 1:
              return this.options.backgroundImage ? [4, J.loadImage(this.options.backgroundImage)] : [3, 3];
            case 2:
              return gt = bt.sent(), this.options.autoColor && (Rt = e._getAverageRGB(gt), this.options.colorDark = "rgb(" + Rt.r + "," + Rt.g + "," + Rt.b + ")"), I.drawImage(gt, 0, 0, gt.width, gt.height, 0, 0, A, A), I.rect(0, 0, A, A), I.fillStyle = k, I.fill(), [3, 4];
            case 3:
              I.rect(0, 0, A, A), I.fillStyle = this.options.colorLight, I.fill(), bt.label = 4;
            case 4:
              for (Q = It.QRUtil.getPatternPosition(this.qrCode.typeNumber), st = ((l = (t = this.options.components) === null || t === void 0 ? void 0 : t.data) === null || l === void 0 ? void 0 : l.scale) || St, Ht = (1 - st) * 0.5, N = 0; N < d; N++)
                for (O = 0; O < d; O++) {
                  for (jt = this.qrCode.isDark(N, O), lt = O < 8 && (N < 8 || N >= d - 8) || O >= d - 8 && N < 8, ne = N == 6 && O >= 8 && O <= d - 8 || O == 6 && N >= 8 && N <= d - 8, X = lt || ne, M = 1; M < Q.length - 1; M++)
                    X = X || N >= Q[M] - 2 && N <= Q[M] + 2 && O >= Q[M] - 2 && O <= Q[M] + 2;
                  $t = O * g + (X ? 0 : Ht * g), Kt = N * g + (X ? 0 : Ht * g), P.strokeStyle = jt ? this.options.colorDark : this.options.colorLight, P.lineWidth = 0.5, P.fillStyle = jt ? this.options.colorDark : "rgba(255, 255, 255, 0.6)", Q.length === 0 ? X || P.fillRect($t, Kt, (X ? 1 : st) * g, (X ? 1 : st) * g) : (ae = O < d - 4 && O >= d - 4 - 5 && N < d - 4 && N >= d - 4 - 5, !X && !ae && P.fillRect($t, Kt, (X ? 1 : st) * g, (X ? 1 : st) * g));
                }
              if (z = Q[Q.length - 1], oe = "rgba(255, 255, 255, 0.6)", P.fillStyle = oe, P.fillRect(0, 0, 8 * g, 8 * g), P.fillRect(0, (d - 8) * g, 8 * g, 8 * g), P.fillRect((d - 8) * g, 0, 8 * g, 8 * g), !((f = (u = this.options.components) === null || u === void 0 ? void 0 : u.timing) === null || f === void 0) && f.protectors && (P.fillRect(8 * g, 6 * g, (d - 8 - 8) * g, g), P.fillRect(6 * g, 8 * g, g, (d - 8 - 8) * g)), !((y = (h = this.options.components) === null || h === void 0 ? void 0 : h.cornerAlignment) === null || y === void 0) && y.protectors && e._drawAlignProtector(P, z, z, g), !((w = (m = this.options.components) === null || m === void 0 ? void 0 : m.alignment) === null || w === void 0) && w.protectors) {
                for (M = 0; M < Q.length; M++)
                  for (q = 0; q < Q.length; q++)
                    if (H = Q[q], j = Q[M], !(H === 6 && (j === 6 || j === z))) {
                      if (j === 6 && (H === 6 || H === z))
                        continue;
                      if (H === z && j === z)
                        continue;
                      e._drawAlignProtector(P, H, j, g);
                    }
              }
              for (P.fillStyle = this.options.colorDark, P.fillRect(0, 0, 7 * g, g), P.fillRect((d - 7) * g, 0, 7 * g, g), P.fillRect(0, 6 * g, 7 * g, g), P.fillRect((d - 7) * g, 6 * g, 7 * g, g), P.fillRect(0, (d - 7) * g, 7 * g, g), P.fillRect(0, (d - 7 + 6) * g, 7 * g, g), P.fillRect(0, 0, g, 7 * g), P.fillRect(6 * g, 0, g, 7 * g), P.fillRect((d - 7) * g, 0, g, 7 * g), P.fillRect((d - 7 + 6) * g, 0, g, 7 * g), P.fillRect(0, (d - 7) * g, g, 7 * g), P.fillRect(6 * g, (d - 7) * g, g, 7 * g), P.fillRect(2 * g, 2 * g, 3 * g, 3 * g), P.fillRect((d - 7 + 2) * g, 2 * g, 3 * g, 3 * g), P.fillRect(2 * g, (d - 7 + 2) * g, 3 * g, 3 * g), Pt = ((B = (E = this.options.components) === null || E === void 0 ? void 0 : E.timing) === null || B === void 0 ? void 0 : B.scale) || St, Xt = (1 - Pt) * 0.5, M = 0; M < d - 8; M += 2)
                e._drawDot(P, 8 + M, 6, g, Xt, Pt), e._drawDot(P, 6, 8 + M, g, Xt, Pt);
              for (Jt = ((s = (b = this.options.components) === null || b === void 0 ? void 0 : b.cornerAlignment) === null || s === void 0 ? void 0 : s.scale) || St, se = (1 - Jt) * 0.5, e._drawAlign(P, z, z, g, se, Jt, this.options.colorDark, ((o = (r = this.options.components) === null || r === void 0 ? void 0 : r.cornerAlignment) === null || o === void 0 ? void 0 : o.protectors) || !1), Wt = ((i = (c = this.options.components) === null || c === void 0 ? void 0 : c.alignment) === null || i === void 0 ? void 0 : i.scale) || St, le = (1 - Wt) * 0.5, M = 0; M < Q.length; M++)
                for (q = 0; q < Q.length; q++)
                  if (H = Q[q], j = Q[M], !(H === 6 && (j === 6 || j === z))) {
                    if (j === 6 && (H === 6 || H === z))
                      continue;
                    if (H === z && j === z)
                      continue;
                    e._drawAlign(P, H, j, g, le, Wt, this.options.colorDark, ((v = (n = this.options.components) === null || n === void 0 ? void 0 : n.alignment) === null || v === void 0 ? void 0 : v.protectors) || !1);
                  }
              return x && (P.fillStyle = "#FFFFFF", P.fillRect(-R, -R, A, R), P.fillRect(-R, T, A, R), P.fillRect(T, -R, R, A), P.fillRect(-R, -R, R, A)), this.options.logoImage ? [4, J.loadImage(this.options.logoImage)] : [3, 6];
            case 5:
              ue = bt.sent(), pt = this.options.logoScale, rt = this.options.logoMargin, mt = this.options.logoCornerRadius, (pt <= 0 || pt >= 1) && (pt = 0.2), rt < 0 && (rt = 0), mt < 0 && (mt = 0), it = T * pt, yt = 0.5 * (A - it), At = yt, P.restore(), P.fillStyle = "#FFFFFF", P.save(), e._prepareRoundedCornerClip(P, yt - rt, At - rt, it + 2 * rt, it + 2 * rt, mt + rt), P.clip(), fe = P.globalCompositeOperation, P.globalCompositeOperation = "destination-out", P.fill(), P.globalCompositeOperation = fe, P.restore(), P.save(), e._prepareRoundedCornerClip(P, yt, At, it, it, mt), P.clip(), P.drawImage(ue, yt, At, it, it), P.restore(), P.save(), P.translate(R, R), bt.label = 6;
            case 6:
              if ($) {
                if (Z.forEach(function(ot) {
                  V || (V = new Tr.default(p, p), V.setDelay(ot.delay), V.setRepeat(0));
                  var xt = ot.dims, Dt = xt.width, kt = xt.height;
                  ut || (ut = J.createCanvas(Dt, kt), wt = ut.getContext("2d"), wt.rect(0, 0, ut.width, ut.height), wt.fillStyle = "#ffffff", wt.fill()), (!ft || !Et || Dt !== ft.width || kt !== ft.height) && (ft = J.createCanvas(Dt, kt), Zt = ft.getContext("2d"), Et = Zt.createImageData(Dt, kt)), Et.data.set(ot.patch), Zt.putImageData(Et, 0, 0), wt.drawImage(ft, ot.dims.left, ot.dims.top);
                  var ve = J.createCanvas(A, A), _t = ve.getContext("2d");
                  _t.drawImage(ut, 0, 0, A, A), _t.rect(0, 0, A, A), _t.fillStyle = k, _t.fill(), _t.drawImage(D, 0, 0, A, A);
                  var Vt = J.createCanvas(p, p), ge = Vt.getContext("2d");
                  ge.drawImage(ve, 0, 0, p, p), V.addFrame(ge.getImageData(0, 0, Vt.width, Vt.height).data);
                }), !V)
                  throw new Error("No frames.");
                return V.finish(), Re(this.canvas) ? (ce = V.stream().toFlattenUint8Array(), he = ce.reduce(function(ot, xt) {
                  return ot + String.fromCharCode(xt);
                }, ""), [2, Promise.resolve("data:image/gif;base64," + window.btoa(he))]) : [2, Promise.resolve(Buffer.from(V.stream().toFlattenUint8Array()))];
              } else
                return I.drawImage(D, 0, 0, A, A), P.drawImage(tt, -R, -R, A, A), qt = J.createCanvas(p, p), de = qt.getContext("2d"), de.drawImage(D, 0, 0, p, p), this.canvas = qt, Re(this.canvas) ? [2, Promise.resolve(this.canvas.toDataURL())] : [2, Promise.resolve(this.canvas.toBuffer())];
          }
        });
      });
    }, e.CorrectLevel = It.QRErrorCorrectLevel, e.defaultComponentOptions = {
      data: {
        scale: 1
      },
      timing: {
        scale: 1,
        protectors: !1
      },
      alignment: {
        scale: 1,
        protectors: !1
      },
      cornerAlignment: {
        scale: 1,
        protectors: !0
      }
    }, e.defaultOptions = {
      text: "",
      size: 400,
      margin: 20,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: It.QRErrorCorrectLevel.M,
      backgroundImage: void 0,
      backgroundDimming: "rgba(0,0,0,0)",
      logoImage: void 0,
      logoScale: 0.2,
      logoMargin: 4,
      logoCornerRadius: 8,
      whiteMargin: !0,
      components: e.defaultComponentOptions,
      autoColor: !0
    }, e;
  }()
);
Ot.AwesomeQR = Mr;
function Re(e) {
  try {
    return e instanceof HTMLElement;
  } catch {
    return typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object";
  }
}
(function(e) {
  var a = U && U.__createBinding || (Object.create ? function(u, f, h, y) {
    y === void 0 && (y = h), Object.defineProperty(u, y, { enumerable: !0, get: function() {
      return f[h];
    } });
  } : function(u, f, h, y) {
    y === void 0 && (y = h), u[y] = f[h];
  }), t = U && U.__exportStar || function(u, f) {
    for (var h in u)
      h !== "default" && !f.hasOwnProperty(h) && a(f, u, h);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), t(ee, e);
  var l = Ot;
  Object.defineProperty(e, "AwesomeQR", { enumerable: !0, get: function() {
    return l.AwesomeQR;
  } });
})(Pe);
function Ft(e, ...a) {
  if (Array.isArray(e))
    e.forEach((t) => Ft(t, ...a));
  else
    return e(...a);
}
const Qt = /* @__PURE__ */ Ie({
  name: "QRCode",
  props: Ue,
  setup(e, a) {
    const {
      expose: t
    } = a, l = Se(), u = {
      opacitySpinning: "0.1"
    }, f = () => {
      new Pe.AwesomeQR({
        ...e
      }).draw().then((y) => {
        const {
          onSuccess: m
        } = e;
        m && Ft(m, y), l.value = y;
      }).catch((y) => {
        const {
          onError: m
        } = e;
        m && Ft(m, y);
      });
    }, h = () => {
      if (a.slots.errorAction)
        return;
      const {
        onReload: y
      } = e;
      y && Ft(y);
    };
    return t({}), Fe(() => {
      f();
    }), {
      qrcodeURL: l,
      spinOverrides: u,
      errorActionClick: h
    };
  },
  render() {
    return nt("div", {
      class: "ray-qrcode"
    }, [nt(Ne, {
      show: this.status === "loading",
      themeOverrides: this.spinOverrides
    }, {
      default: () => [nt("img", {
        src: this.qrcodeURL
      }, null)]
    }), this.status === "error" ? nt("div", {
      class: "ray-qrcode__error"
    }, [nt("div", {
      class: "ray-qrcode__error-content"
    }, [typeof this.errorDescription == "string" ? this.errorDescription : () => this.errorDescription]), nt("div", {
      class: "ray-qrcode__error-btn",
      onClick: this.errorActionClick.bind(this)
    }, [this.$slots.errorAction ? this.$slots.errorAction() : nt(Qe, null, [nt(Oe, {
      text: !0,
      color: "#ffffff"
    }, {
      default: () => this.errorActionDescription
    })])])]) : null]);
  }
});
Qt.install = (e) => {
  e.component(Qt.name, Qt);
};
const Lr = [Qt], Ir = (e) => {
  Lr.forEach((a) => {
    e.component(a.name, a);
  });
}, Qr = {
  install: Ir
};
export {
  Qr as default
};
