ByteOrder = function() {};

(function(){

    // Note:
    //   Math.pow(2, 32) = 4294967296
    //   Math.pow(2, 16) = 65536
    //   Math.pow(2,  8) = 256

    /**
     * @ignore
     */
    var $prototype = ByteOrder.prototype;

    /**
     * Returns the string representation of a ByteOrder.
     *
     * @return string
     *
     * @public
     * @function
     * @name toString
     * @memberOf ByteOrder
     */
    $prototype.toString = function() {
        throw new Error ("Abstract");
    }

    /**
     * Returns the single-byte representation of an 8-bit integer.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toUnsignedByte = function(v) {
        return (v & 255);
    }

    /**
     * Returns a signed 8-bit integer from a single-byte representation.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toByte = function(byte0) {
        return (byte0 & 128) ? (byte0 | -256) : byte0;
    }

    /**
     * Returns the big-endian 2-byte representation of a 16-bit integer.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _fromShort = function(v) {
        return [((v >> 8) & 255), (v & 255)];
    }

    /**
     * Returns a signed 16-bit integer from a big-endian two-byte representation.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toShort = function(byte1, byte0) {
        return (_toByte(byte1) << 8) | (byte0 & 255);
    }

    /**
     * Returns an unsigned 16-bit integer from a big-endian two-byte representation.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toUnsignedShort = function(byte1, byte0) {
        return ((byte1 & 255) << 8) | (byte0 & 255);
    }

    /**
     * Returns an unsigned 24-bit integer from a big-endian three-byte representation.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toUnsignedMediumInt = function(byte2, byte1, byte0) {
        return ((byte2 & 255) << 16) | ((byte1 & 255) << 8) | (byte0 & 255);
    }

    /**
     * Returns the big-endian three-byte representation of a 24-bit integer.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _fromMediumInt = function(v) {
        return [((v >> 16) & 255), ((v >> 8) & 255), (v & 255)];
    }

    /**
     * Returns a signed 24-bit integer from a big-endian three-byte representation.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toMediumInt = function(byte2, byte1, byte0) {
        return ((byte2 & 255) << 16) | ((byte1 & 255) << 8) | (byte0 & 255);
    }

    /**
     * Returns the big-endian four-byte representation of a 32-bit integer.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _fromInt = function(v) {
        return [((v >> 24) & 255), ((v >> 16) & 255), ((v >> 8) & 255), (v & 255)];
    }

    /**
     * Returns a signed 32-bit integer from a big-endian four-byte representation.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toInt = function(byte3, byte2, byte1, byte0) {
        return (_toByte(byte3) << 24) | ((byte2 & 255) << 16) | ((byte1 & 255) << 8) | (byte0 & 255);
    }

    /**
     * Returns an unsigned 32-bit integer from a big-endian four-byte representation.
     *
     * @private
     * @static
     * @function
     * @memberOf ByteOrder
     */
    var _toUnsignedInt = function(byte3, byte2, byte1, byte0) {
        var nibble1 = _toUnsignedShort(byte3, byte2);
        var nibble0 = _toUnsignedShort(byte1, byte0);
        return (nibble1 * 65536 + nibble0);
    }

    /**
     * The big-endian byte order.
     *
     * @public
     * @static
     * @final
     * @field
     * @name BIG_ENDIAN
     * @type ByteOrder
     * @memberOf ByteOrder
     */
    ByteOrder.BIG_ENDIAN = (function() {

        var BigEndian = function() {}
        BigEndian.prototype = new ByteOrder();
        var $prototype = BigEndian.prototype;

        $prototype._toUnsignedByte = _toUnsignedByte;
        $prototype._toByte = _toByte;
        $prototype._fromShort = _fromShort;
        $prototype._toShort = _toShort;
        $prototype._toUnsignedShort = _toUnsignedShort;
        $prototype._toUnsignedMediumInt = _toUnsignedMediumInt;
        $prototype._fromMediumInt = _fromMediumInt;
        $prototype._toMediumInt = _toMediumInt;
        $prototype._fromInt = _fromInt;
        $prototype._toInt = _toInt;
        $prototype._toUnsignedInt = _toUnsignedInt;

        $prototype.toString = function() {
            return "<ByteOrder.BIG_ENDIAN>";
        }

        return new BigEndian();
    })();

    /**
     * The little-endian byte order.
     *
     * @public
     * @static
     * @final
     * @field
     * @name BIG_ENDIAN
     * @type ByteOrder
     * @memberOf ByteOrder
     */
    ByteOrder.LITTLE_ENDIAN = (function() {
        var LittleEndian = function() {}
        LittleEndian.prototype = new ByteOrder();
        var $prototype = LittleEndian.prototype;

        $prototype._toByte = _toByte;
        $prototype._toUnsignedByte = _toUnsignedByte;

        $prototype._fromShort = function(v) {
            return _fromShort(v).reverse();
        }

        $prototype._toShort = function(byte1, byte0) {
            return _toShort(byte0, byte1);
        }

        $prototype._toUnsignedShort = function(byte1, byte0) {
            return _toUnsignedShort(byte0, byte1);
        }

        $prototype._toUnsignedMediumInt = function(byte2, byte1, byte0) {
            return _toUnsignedMediumInt(byte0, byte1, byte2);
        }

        $prototype._fromMediumInt = function(v) {
            return _fromMediumInt(v).reverse();
        }

        $prototype._toMediumInt = function(byte5, byte4, byte3, byte2, byte1, byte0) {
            return _toMediumInt(byte0, byte1, byte2, byte3, byte4, byte5);
        }

        $prototype._fromInt = function(v) {
            return _fromInt(v).reverse();
        }

        $prototype._toInt = function(byte3, byte2, byte1, byte0) {
            return _toInt(byte0, byte1, byte2, byte3);
        }

        $prototype._toUnsignedInt = function(byte3, byte2, byte1, byte0) {
            return _toUnsignedInt(byte0, byte1, byte2, byte3);
        }

        $prototype.toString = function() {
            return "<ByteOrder.LITTLE_ENDIAN>";
        }

        return new LittleEndian();
    })();


})();



/**
 * Copyright (c) 2007-2013, Kaazing Corporation. All rights reserved.
 */

/**
 * Charset is an abstract super class for all character set encoders and decoders.
 *
 * @constructor
 *
 * @class  Charset provides character set encoding and decoding for JavaScript.
 */
function Charset() {}

(function() {
    /**
     * @ignore
     */
    var $prototype = Charset.prototype;

    /**
     * Decodes a ByteBuffer into a String.  Bytes for partial characters remain
     * in the ByteBuffer after decode has completed.
     *
     * @param {ByteBuffer} buf  the ByteBuffer to decode
     *
     * @return {String}  the decoded String
     *
     * @public
     * @function
     * @name decode
     * @memberOf Charset
     */
    $prototype.decode = function(buf) {}

    /**
     * Encodes a String into a ByteBuffer.
     *
     * @param {String}     text  the String to encode
     * @param {ByteBuffer} buf   the target ByteBuffer
     *
     * @return {void}
     *
     * @public
     * @function
     * @name encode
     * @memberOf Charset
     */
    $prototype.encode = function(str, buf) {}

    /**
     * The UTF8 character set encoder and decoder.
     *
     * @public
     * @static
     * @final
     * @field
     * @name UTF8
     * @type Charset
     * @memberOf Charset
     */
    Charset.UTF8 = (function() {
        function UTF8() {}
        UTF8.prototype = new Charset();

        /**
         * @ignore
         */
        var $prototype = UTF8.prototype;

        $prototype.decode = function(buf) {

            var remainingData = buf.remaining();

            // use different strategies for building string sizes greater or
            // less than 10k.
            var shortBuffer = remainingData < 10000;

            var decoded = [];
            var sourceArray = buf.array;
            var beginIndex = buf.position;
            var endIndex = beginIndex + remainingData;
            var byte0, byte1, byte2, byte3;
            for (var i = beginIndex; i < endIndex; i++) {
                byte0 = (sourceArray[i] & 255);
                var byteCount = charByteCount(byte0);
                var remaining = endIndex - i;
                if (remaining < byteCount) {
                    break;
                }
                var charCode = null;
                switch (byteCount) {
                    case 1:
                        // 000000-00007f    0zzzzzzz
                        charCode = byte0;
                        break;
                    case 2:
                        // 000080-0007ff    110yyyyy 10zzzzzz
                        i++;
                        byte1 = (sourceArray[i] & 255);

                        charCode = ((byte0 & 31) << 6) | (byte1 & 63);
                        break;
                    case 3:
                        // 000800-00ffff    1110xxxx 10yyyyyy 10zzzzzz
                        i++;
                        byte1 = (sourceArray[i] & 255);

                        i++;
                        byte2 = (sourceArray[i] & 255);

                        charCode = ((byte0 & 15) << 12) | ((byte1 & 63) << 6) | (byte2 & 63);
                        break;
                    case 4:
                        // 010000-10ffff    11110www 10xxxxxx 10yyyyyy 10zzzzzz
                        i++;
                        byte1 = (sourceArray[i] & 255);

                        i++;
                        byte2 = (sourceArray[i] & 255);

                        i++;
                        byte3 = (sourceArray[i] & 255);

                        charCode = ((byte0 & 7) << 18) | ((byte1 & 63) << 12) | ((byte2 & 63) << 6) | (byte3 & 63);
                        break;
                }

                if (shortBuffer) {
                    decoded.push(charCode);
                } else {
                    decoded.push(String.fromCharCode(charCode));
                }
            }

            if (shortBuffer) {
                return String.fromCharCode.apply(null, decoded);
            } else {
                return decoded.join("");
            }
        };

        $prototype.encode = function(str, buf) {
            var currentPosition = buf.position;
            var mark = currentPosition;
            var array = buf.array;
            for (var i = 0; i < str.length; i++) {
                var charCode = str.charCodeAt(i);
                if (charCode < 0x80) {
                    // 000000-00007f    0zzzzzzz
                    array[currentPosition++] = charCode;
                }
                else if (charCode < 0x0800) {
                    // 000080-0007ff    110yyyyy 10zzzzzz
                    array[currentPosition++] = (charCode >> 6) | 192;
                    array[currentPosition++] = (charCode & 63) | 128;
                }
                else if (charCode < 0x10000) {
                    // 000800-00ffff  1110xxxx 10yyyyyy 10zzzzzz
                    array[currentPosition++] = (charCode >> 12) | 224;
                    array[currentPosition++] = ((charCode >> 6) & 63) | 128;
                    array[currentPosition++] = (charCode & 63) | 128;
                }
                else if (charCode < 0x110000) {
                    // 010000-10ffff  11110www 10xxxxxx 10yyyyyy 10zzzzzz
                    array[currentPosition++] = (charCode >> 18) | 240;
                    array[currentPosition++] = ((charCode >> 12) & 63) | 128;
                    array[currentPosition++] = ((charCode >> 6) & 63) | 128;
                    array[currentPosition++] = (charCode & 63) | 128;
                }
                else {
                    throw new Error("Invalid UTF-8 string");
                }
            }
            buf.position = currentPosition;
            buf.expandAt(currentPosition, currentPosition - mark);
        };

        $prototype.encodeAsByteArray = function(str) {
            var bytes = new Array();
            for (var i = 0; i < str.length; i++) {
                var charCode = str.charCodeAt(i);
                if (charCode < 0x80) {
                    // 000000-00007f    0zzzzzzz
                    bytes.push(charCode);
                }
                else if (charCode < 0x0800) {
                    // 000080-0007ff    110yyyyy 10zzzzzz
                    bytes.push((charCode >> 6) | 192);
                    bytes.push((charCode & 63) | 128);
                }
                else if (charCode < 0x10000) {
                    // 000800-00ffff  1110xxxx 10yyyyyy 10zzzzzz
                    bytes.push((charCode >> 12) | 224);
                    bytes.push(((charCode >> 6) & 63) | 128);
                    bytes.push((charCode & 63) | 128);
                }
                else if (charCode < 0x110000) {
                    // 010000-10ffff  11110www 10xxxxxx 10yyyyyy 10zzzzzz
                    bytes.push((charCode >> 18) | 240);
                    bytes.push(((charCode >> 12) & 63) | 128);
                    bytes.push(((charCode >> 6) & 63) | 128);
                    bytes.push((charCode & 63) | 128);
                }
                else {
                    throw new Error("Invalid UTF-8 string");
                }
            }
            return bytes;
        };

        // encode a byte array to UTF-8 string
        $prototype.encodeByteArray = function(array) {
            var strLen = array.length;
            var bytes = [];
            for (var i = 0; i < strLen; i++) {
                var charCode = array[i];
                if (charCode < 0x80) {
                    // 000000-00007f    0zzzzzzz
                    bytes.push(charCode);
                }
                else if (charCode < 0x0800) {
                    // 000080-0007ff    110yyyyy 10zzzzzz
                    bytes.push((charCode >> 6) | 192);
                    bytes.push((charCode & 63) | 128);
                }
                else if (charCode < 0x10000) {
                    // 000800-00ffff  1110xxxx 10yyyyyy 10zzzzzz
                    bytes.push((charCode >> 12) | 224);
                    bytes.push(((charCode >> 6) & 63) | 128);
                    bytes.push((charCode & 63) | 128);
                }
                else if (charCode < 0x110000) {
                    // 010000-10ffff  11110www 10xxxxxx 10yyyyyy 10zzzzzz
                    bytes.push((charCode >> 18) | 240);
                    bytes.push(((charCode >> 12) & 63) | 128);
                    bytes.push(((charCode >> 6) & 63) | 128);
                    bytes.push((charCode & 63) | 128);
                }
                else {
                    throw new Error("Invalid UTF-8 string");
                }
            }
            return String.fromCharCode.apply(null, bytes);
        };

        // encode an arraybuffer to UTF-8 string
        $prototype.encodeArrayBuffer = function(arraybuffer) {
            var buf = new Uint8Array(arraybuffer);
            var strLen = buf.length;
            var bytes = [];
            for (var i = 0; i < strLen; i++) {
                var charCode = buf[i];
                if (charCode < 0x80) {
                    // 000000-00007f    0zzzzzzz
                    bytes.push(charCode);
                }
                else if (charCode < 0x0800) {
                    // 000080-0007ff    110yyyyy 10zzzzzz
                    bytes.push((charCode >> 6) | 192);
                    bytes.push((charCode & 63) | 128);
                }
                else if (charCode < 0x10000) {
                    // 000800-00ffff  1110xxxx 10yyyyyy 10zzzzzz
                    bytes.push((charCode >> 12) | 224);
                    bytes.push(((charCode >> 6) & 63) | 128);
                    bytes.push((charCode & 63) | 128);
                }
                else if (charCode < 0x110000) {
                    // 010000-10ffff  11110www 10xxxxxx 10yyyyyy 10zzzzzz
                    bytes.push((charCode >> 18) | 240);
                    bytes.push(((charCode >> 12) & 63) | 128);
                    bytes.push(((charCode >> 6) & 63) | 128);
                    bytes.push((charCode & 63) | 128);
                }
                else {
                    throw new Error("Invalid UTF-8 string");
                }
            }
            return String.fromCharCode.apply(null, bytes);
        };

        //decode a UTF-8 string to byte array
        $prototype.toByteArray = function(str) {


            var decoded = [];
            var byte0, byte1, byte2, byte3;
            var strLen = str.length;
            for (var i = 0; i < strLen; i++) {
                byte0 = (str.charCodeAt(i) & 255);
                var byteCount = charByteCount(byte0);

                var charCode = null;
                if (byteCount + i > strLen) {
                    break;
                }
                switch (byteCount) {
                    case 1:
                        // 000000-00007f    0zzzzzzz
                        charCode = byte0;
                        break;
                    case 2:
                        // 000080-0007ff    110yyyyy 10zzzzzz
                        i++;
                        byte1 = (str.charCodeAt(i) & 255);

                        charCode = ((byte0 & 31) << 6) | (byte1 & 63);
                        break;
                    case 3:
                        // 000800-00ffff    1110xxxx 10yyyyyy 10zzzzzz
                        i++;
                        byte1 = (str.charCodeAt(i) & 255);

                        i++;
                        byte2 = (str.charCodeAt(i) & 255);

                        charCode = ((byte0 & 15) << 12) | ((byte1 & 63) << 6) | (byte2 & 63);
                        break;
                    case 4:
                        // 010000-10ffff    11110www 10xxxxxx 10yyyyyy 10zzzzzz
                        i++;
                        byte1 = (str.charCodeAt(i) & 255);

                        i++;
                        byte2 = (str.charCodeAt(i) & 255);

                        i++;
                        byte3 = (str.charCodeAt(i) & 255);

                        charCode = ((byte0 & 7) << 18) | ((byte1 & 63) << 12) | ((byte2 & 63) << 6) | (byte3 & 63);
                        break;
                }
                decoded.push(charCode & 255);
            }
            return decoded;
        };

        /**
         * Returns the number of bytes used to encode a UTF-8 character, based on the first byte.
         *
         * 000000-00007f  0zzzzzzz
         * 000080-0007ff  110yyyyy 10zzzzzz
         * 000800-00ffff  1110xxxx 10yyyyyy 10zzzzzz
         * 010000-10ffff  11110www 10xxxxxx 10yyyyyy 10zzzzzz
         *
         * @private
         * @static
         * @function
         * @memberOf UTF8
         */
        function charByteCount(b) {

            // determine number of bytes based on first zero bit,
            // starting with most significant bit

            if ((b & 128) === 0) {
                return 1;
            }

            if ((b & 32) === 0) {
                return 2;
            }

            if ((b & 16) === 0) {
                return 3;
            }

            if ((b & 8) === 0) {
                return 4;
            }

            throw new Error("Invalid UTF-8 bytes");
        }

        return new UTF8();
    })();
})();

/**
 * Copyright (c) 2007-2013, Kaazing Corporation. All rights reserved.
 */

/**
 * Creates a new ByteBuffer instance.
 *
 * @param {Array} bytes  the byte-valued Number array
 *
 * @constructor
 *
 * @class  ByteBuffer provides a compact byte array representation for
 *         sending, receiving and processing binary data using WebSocket.
 */
function ByteBuffer(bytes) {
    this.array = bytes || [];
    this._mark = -1;
    this.limit = this.capacity = this.array.length;
    // Default to network byte order
    this.order = ByteOrder.BIG_ENDIAN;
}
(function() {

    /**
     * Allocates a new ByteBuffer instance.
     * The new buffer's position will be zero, its limit will be its capacity,
     * and its mark will be undefined.
     *
     * @param {Number} capacity  the maximum buffer capacity
     *
     * @return {ByteBuffer} the allocated ByteBuffer
     *
     * @public
     * @static
     * @function
     * @memberOf ByteBuffer
     */
    ByteBuffer.allocate = function(capacity) {
        var buf = new ByteBuffer();
        buf.capacity = capacity;

        // setting limit to the given capacity, other it would be 0...
        buf.limit = capacity;
        return buf;
    };

    /**
     * Wraps a byte array as a new ByteBuffer instance.
     *
     * @param {Array} bytes  an array of byte-sized numbers
     *
     * @return {ByteBuffer} the bytes wrapped as a ByteBuffer
     *
     * @public
     * @static
     * @function
     * @memberOf ByteBuffer
     */
    ByteBuffer.wrap = function(bytes) {
        return new ByteBuffer(bytes);
    };

    var $prototype = ByteBuffer.prototype;

    /**
     * The autoExpand property enables writing variable length data,
     * and is on by default.
     *
     * @public
     * @field
     * @name autoExpand
     * @type Boolean
     * @memberOf ByteBuffer
     */
    $prototype.autoExpand = true;

    /**
     * The capacity property indicates the maximum number of bytes
     * of storage available if the buffer is not automatically expanding.
     *
     * @public
     * @field
     * @name capacity
     * @type Number
     * @memberOf ByteBuffer
     */
    $prototype.capacity = 0;

    /**
     * The position property indicates the progress through the buffer,
     * and indicates the position within the underlying array that
     * subsequent data will be read from or written to.
     *
     * @public
     * @field
     * @name position
     * @type Number
     * @memberOf ByteBuffer
     */
    $prototype.position = 0;

    /**
     * The limit property indicates the last byte of data available for
     * reading.
     *
     * @public
     * @field
     * @name limit
     * @type Number
     * @memberOf ByteBuffer
     */
    $prototype.limit = 0;


    /**
     * The order property indicates the endianness of multibyte integer types in
     * the buffer.
     *
     * @public
     * @field
     * @name order
     * @type ByteOrder
     * @memberOf ByteBuffer
     */
    $prototype.order = ByteOrder.BIG_ENDIAN;

    /**
     * The array property provides byte storage for the buffer.
     *
     * @public
     * @field
     * @name array
     * @type Array
     * @memberOf ByteBuffer
     */
    $prototype.array = [];

    /**
     * Marks a position in the buffer.
     *
     * @return {ByteBuffer} the buffer
     *
     * @see ByteBuffer#reset
     *
     * @public
     * @function
     * @name mark
     * @memberOf ByteBuffer
     */
    $prototype.mark = function() {
        this._mark = this.position;
        return this;
    };

    /**
     * Resets the buffer position using the mark.
     *
     * @throws {Error} if the mark is invalid
     *
     * @return {ByteBuffer} the buffer
     *
     * @see ByteBuffer#mark
     *
     * @public
     * @function
     * @name reset
     * @memberOf ByteBuffer
     */
    $prototype.reset = function() {
        var m = this._mark;
        if (m < 0) {
            throw new Error("Invalid mark");
        }
        this.position = m;
        return this;
    };

    /**
     * Compacts the buffer by removing leading bytes up
     * to the buffer position, and decrements the limit
     * and position values accordingly.
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name compact
     * @memberOf ByteBuffer
     */
    $prototype.compact = function() {
        this.array.splice(0, this.position);
        this.limit -= this.position;
        this.position = 0;
        return this;
    };

    /**
     * Duplicates the buffer by reusing the underlying byte
     * array but with independent position, limit and capacity.
     *
     * @return {ByteBuffer} the duplicated buffer
     *
     * @public
     * @function
     * @name duplicate
     * @memberOf ByteBuffer
     */
    $prototype.duplicate = function() {
        var buf = new ByteBuffer(this.array);
        buf.position = this.position;
        buf.limit = this.limit;
        buf.capacity = this.capacity;
        return buf;
    };

    /**
     * Fills the buffer with a repeated number of zeros.
     *
     * @param size  {Number}  the number of zeros to repeat
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name fill
     * @memberOf ByteBuffer
     */
    $prototype.fill = function(size) {
        _autoExpand(this, size);
        while (size-- > 0) {
            this.put(0);
        }
        return this;
    };

    /**
     * Fills the buffer with a specific number of repeated bytes.
     *
     * @param b     {Number}  the byte to repeat
     * @param size  {Number}  the number of times to repeat
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name fillWith
     * @memberOf ByteBuffer
     */
    $prototype.fillWith = function(b, size) {
        _autoExpand(this, size);
        while (size-- > 0) {
            this.put(b);
        }
        return this;
    };

    /**
     * Returns the index of the specified byte in the buffer.
     *
     * @param b     {Number}  the byte to find
     *
     * @return {Number} the index of the byte in the buffer, or -1 if not found
     *
     * @public
     * @function
     * @name indexOf
     * @memberOf ByteBuffer
     */
    $prototype.indexOf = function(b) {
        var limit = this.limit;
        var array = this.array;
        for (var i=this.position; i < limit; i++) {
            if (array[i] == b) {
                return i;
            }
        }
        return -1;
    };

    /**
     * Puts a single byte number into the buffer at the current position.
     *
     * @param v     {Number}  the single-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name put
     * @memberOf ByteBuffer
     */
    $prototype.put = function(v) {
        _autoExpand(this, 1);
        this.array[this.position++] = v & 255;
        return this;
    };

    /**
     * Puts a single byte number into the buffer at the specified index.
     *
     * @param index   {Number}  the index
     * @param v       {Number}  the byte
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putAt
     * @memberOf ByteBuffer
     */
    $prototype.putAt = function(index, v) {
        _checkForWriteAt(this,index,1);
        this.array[index] = v & 255;
        return this;
    };

    /**
     * Puts an unsigned single-byte number into the buffer at the current position.
     *
     * @param v     {Number}  the single-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putUnsigned
     * @memberOf ByteBuffer
     */
    $prototype.putUnsigned = function(v) {
        _autoExpand(this, 1);
        this.array[this.position++] = v & 0xFF;
        return this;
    }
    /**
     * Puts an unsigned single byte into the buffer at the specified position.
     *
     * @param index  {Number}  the index
     * @param v      {Number}  the single-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putUnsignedAt
     * @memberOf ByteBuffer
     */
    $prototype.putUnsignedAt = function(index, v) {
        _checkForWriteAt(this,index,1);
        this.array[index] = v & 0xFF;
        return this;
    }
    /**
     * Puts a two-byte short into the buffer at the current position.
     *
     * @param v     {Number} the two-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putShort
     * @memberOf ByteBuffer
     */
    $prototype.putShort = function(v) {
        _autoExpand(this, 2);
        _putBytesInternal(this, this.position, this.order._fromShort(v));
        this.position += 2;
        return this;
    };

    /**
     * Puts a two-byte short into the buffer at the specified index.
     *
     * @param index  {Number}  the index
     * @param v      {Number}  the two-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putShortAt
     * @memberOf ByteBuffer
     */
    $prototype.putShortAt = function(index, v) {
        _checkForWriteAt(this,index,2);
        _putBytesInternal(this, index, this.order._fromShort(v));
        return this;
    };

    /**
     * Puts a two-byte unsigned short into the buffer at the current position.
     *
     * @param v     {Number}  the two-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putUnsignedShort
     * @memberOf ByteBuffer
     */
    $prototype.putUnsignedShort = function(v) {
        _autoExpand(this, 2);
        _putBytesInternal(this, this.position, this.order._fromShort(v & 0xFFFF));
        this.position += 2;
        return this;
    }

    /**
     * Puts an unsigned two-byte unsigned short into the buffer at the position specified.
     *
     * @param index     {Number}  the index
     * @param v     {Number}  the two-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putUnsignedShort
     * @memberOf ByteBuffer
     */
    $prototype.putUnsignedShortAt = function(index, v) {
        _checkForWriteAt(this,index,2);
        _putBytesInternal(this, index, this.order._fromShort(v & 0xFFFF));
        return this;
    }

    /**
     * Puts a three-byte number into the buffer at the current position.
     *
     * @param v     {Number}  the three-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putMediumInt
     * @memberOf ByteBuffer
     */
    $prototype.putMediumInt = function(v) {
        _autoExpand(this, 3);
        this.putMediumIntAt(this.position, v);
        this.position += 3;
        return this;
    };

    /**
     * Puts a three-byte number into the buffer at the specified index.
     *
     * @param index     {Number}  the index
     * @param v     {Number}  the three-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putMediumIntAt
     * @memberOf ByteBuffer
     */
    $prototype.putMediumIntAt = function(index, v) {
        this.putBytesAt(index, this.order._fromMediumInt(v));
        return this;
    };

    /**
     * Puts a four-byte number into the buffer at the current position.
     *
     * @param v     {Number}  the four-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putInt
     * @memberOf ByteBuffer
     */
    $prototype.putInt = function(v) {
        _autoExpand(this, 4);
        _putBytesInternal(this, this.position, this.order._fromInt(v))
        this.position += 4;
        return this;
    };

    /**
     * Puts a four-byte number into the buffer at the specified index.
     *
     * @param index     {Number}  the index
     * @param v     {Number}  the four-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putIntAt
     * @memberOf ByteBuffer
     */
    $prototype.putIntAt = function(index, v) {
        _checkForWriteAt(this,index,4);
        _putBytesInternal(this, index, this.order._fromInt(v))
        return this;
    };

    /**
     * Puts an unsigned four-byte number into the buffer at the current position.
     *
     * @param i     {Number}  the index
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putUnsignedInt
     * @memberOf ByteBuffer
     */
    $prototype.putUnsignedInt = function(v) {
        _autoExpand(this, 4);
        this.putUnsignedIntAt(this.position, v & 0xFFFFFFFF);
        this.position += 4;
        return this;
    }

    /**
     * Puts an unsigned four-byte number into the buffer at the specified index.
     *
     * @param index     {Number}  the index
     * @param v     {Number}  the four-byte number
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putUnsignedIntAt
     * @memberOf ByteBuffer
     */
    $prototype.putUnsignedIntAt = function(index, v) {
        _checkForWriteAt(this,index,4);
        this.putIntAt(index, v & 0xFFFFFFFF);
        return this;
    }

    /**
     * Puts a string into the buffer at the current position, using the
     * character set to encode the string as bytes.
     *
     * @param v     {String}   the string
     * @param cs    {Charset}  the character set
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putString
     * @memberOf ByteBuffer
     */
    $prototype.putString = function(v, cs) {
        cs.encode(v, this);
        return this;
    };

    /**
     * Puts a string into the buffer at the specified index, using the
     * character set to encode the string as bytes.
     *
     * @param fieldSize  {Number}   the width in bytes of the prefixed length field
     * @param v          {String}   the string
     * @param cs         {Charset}  the character set
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putPrefixedString
     * @memberOf ByteBuffer
     */
    $prototype.putPrefixedString = function(fieldSize, v, cs) {
        if (typeof(cs) === "undefined" || typeof(cs.encode) === "undefined") {
            throw new Error("ByteBuffer.putPrefixedString: character set parameter missing");
        }

        if (fieldSize === 0) {
            return this;
        }

        _autoExpand(this, fieldSize);

        var len = v.length;
        switch (fieldSize) {
            case 1:
                this.put(len);
                break;
            case 2:
                this.putShort(len);
                break;
            case 4:
                this.putInt(len);
                break;
        }

        cs.encode(v, this);
        return this;
    };

    // encapsulates the logic to store byte array in the buffer
    function _putBytesInternal($this, index, v) {
        var array = $this.array;
        for (var i = 0; i < v.length; i++) {
            array[i + index] = v[i] & 255;
        }
    };

    /**
     * Puts a single-byte array into the buffer at the current position.
     *
     * @param v     {Array}  the single-byte array
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putBytes
     * @memberOf ByteBuffer
     */
    $prototype.putBytes = function(v) {
        _autoExpand(this, v.length);
        _putBytesInternal(this, this.position, v);
        this.position += v.length;
        return this;
    };

    /**
     * Puts a byte array into the buffer at the specified index.
     *
     * @param index     {Number} the index
     * @param v     {Array}  the single-byte array
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putBytesAt
     * @memberOf ByteBuffer
     */
    $prototype.putBytesAt = function(index, v) {
        _checkForWriteAt(this,index,v.length);
        _putBytesInternal(this, index, v);
        return this;
    };

    /**
     * Puts a ByteArray into the buffer at the current position.
     *
     * @param v     {ByteArray}  the ByteArray
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putByteArray
     * @memberOf ByteBuffer
     */
    $prototype.putByteArray = function(v) {
        _autoExpand(this, v.byteLength);
        var u = new Uint8Array(v);
        // copy bytes into ByteBuffer
        for (var i=0; i<u.byteLength; i++) {
            this.putAt(this.position + i, u[i] & 0xFF);
        }
        this.position += v.byteLength;
        return this;
    };
    /**
     * Puts a buffer into the buffer at the current position.
     *
     * @param v     {Array}  the single-byte array
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putBuffer
     * @memberOf ByteBuffer
     */
    $prototype.putBuffer = function(v) {

        var len = v.remaining();
        _autoExpand(this, len);

        var sourceArray = v.array;
        var sourceBufferPosition = v.position;
        var currentPosition = this.position;

        for (var i = 0; i < len; i++) {
            this.array[i + currentPosition] = sourceArray[i + sourceBufferPosition];
        }

        this.position += len;
        return this;
    };


    /**
     * Puts a buffer into the buffer at the specified index.
     *
     * @param index     {Number} the index
     * @param v     {Array}  the single-byte array
     *
     * @return {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name putBufferAt
     * @memberOf ByteBuffer
     */
    $prototype.putBufferAt = function(index, v) {
        var len = v.remaining();
        _autoExpand(this, len);

        var sourceArray = v.array;
        var sourceBufferPosition = v.position;
        var currentPosition = this.position;

        for (var i = 0; i < len; i++) {
            this.array[i + currentPosition] = sourceArray[i + sourceBufferPosition];
        }

        return this;
    };

    /**
     * Returns a single-byte number from the buffer at the current position.
     *
     * @return {Number}  the single-byte number
     *
     * @public
     * @function
     * @name get
     * @memberOf ByteBuffer
     */
    $prototype.get = function() {
        _checkForRead(this,1);
        return this.order._toByte(this.array[this.position++]);
    };

    /**
     * Returns a single-byte number from the buffer at the specified index.
     *
     * @param index     {Number} the index
     *
     * @return {Number}  the single-byte number
     *
     * @public
     * @function
     * @name getAt
     * @memberOf ByteBuffer
     */
    $prototype.getAt = function(index) {
        _checkForReadAt(this,index,1);
        return this.order._toByte(this.array[index]);
    };

    /**
     * Returns an unsigned single-byte number from the buffer at the current position.
     *
     * @return {Number}  the unsigned single-byte number
     *
     * @public
     * @function
     * @name getUnsigned
     * @memberOf ByteBuffer
     */
    $prototype.getUnsigned = function() {
        _checkForRead(this,1);
        var val = this.order._toUnsignedByte(this.array[this.position++]);
        return val;
    };
    /**
     * Returns an unsigned single-byte number from the buffer at the specified index.
     *
     * @param index  the index
     *
     * @return  the unsigned single-byte number
     * @public
     * @function
     * @name getUnsignedAt
     * @memberOf ByteBuffer

     */
    $prototype.getUnsignedAt = function(index) {
        _checkForReadAt(this,index,1);
        return this.order._toUnsignedByte(this.array[index]);
    }

    /**
     * Returns a n-byte number from the buffer at the current position.
     *
     * @param size     {Number} size the size of the buffer to be returned
     *
     * @return {Array}  a new byte array with bytes read from the buffer
     *
     * @public
     * @function
     * @name getBytes
     * @memberOf ByteBuffer
     */
    $prototype.getBytes = function(size) {
        _checkForRead(this,size);
        var byteArray = new Array();
        for(var i=0; i<size; i++) {
            byteArray.push(this.order._toByte(this.array[i+this.position]));
        }
        this.position += size;
        return byteArray;
    };

    /**
     * Returns a n-byte number from the buffer at the specified index.
     *
     * @param index    {Number} the index
     * @param size     {Number} size the size of the buffer to be returned
     *
     * @return {Array}  a new byte array with bytes read from the buffer
     *
     * @public
     * @function
     * @name getBytes
     * @memberOf ByteBuffer
     */
    $prototype.getBytesAt = function(index,size) {
        _checkForReadAt(this,index,size);
        var byteArray = new Array();
        var sourceArray = this.array;
        for (var i = 0; i < size; i++) {
            byteArray.push(sourceArray[i + index]);
        }
        return byteArray;
    };

    /**
     * Returns a Blob from the buffer at the current position.
     *
     * @param size     {Number} size the size of the Blob to be returned
     *
     * @return {Blob}  a new Blob with bytes read from the buffer
     *
     * @public
     * @function
     * @name getBlob
     * @memberOf ByteBuffer
     */
    $prototype.getBlob = function(size) {
        var bytes = this.array.slice(this.position, size);
        this.position += size;
        return BlobUtils.fromNumberArray(bytes);
    }

    /**
     * Returns a Blob from the buffer at the specified index.
     *
     * @param index    {Number} the index
     * @param size     {Number} size the size of the Blob to be returned
     *
     * @return {Blob}  a new Blob with bytes read from the buffer
     *
     * @public
     * @function
     * @name getBlobAt
     * @memberOf ByteBuffer
     */
    $prototype.getBlobAt = function(index, size) {
        var bytes = this.getBytesAt(index, size);
        return BlobUtils.fromNumberArray(bytes);

    }

    /**
     * Returns a ArrayBuffer from the buffer at the current position.
     *
     * @param size     {Number} size the size of the ArrayBuffer to be returned
     *
     * @return {ArrayBuffer}  a new ArrayBuffer with bytes read from the buffer
     *
     * @public
     * @function
     * @name getArrayBuffer
     * @memberOf ByteBuffer
     */
    $prototype.getArrayBuffer = function(size) {
        var u = new Uint8Array(size);
        u.set(this.array.slice(this.position, size));
        this.position += size;
        return u.buffer;
    }

    /**
     * Returns a two-byte number from the buffer at the current position.
     *
     * @return {Number}  the two-byte number
     *
     * @public
     * @function
     * @name getShort
     * @memberOf ByteBuffer
     */
    $prototype.getShort = function() {
        _checkForRead(this,2);
        var val = this.getShortAt(this.position);
        this.position += 2;
        return val;
    };

    /**
     * Returns a two-byte number from the buffer at the specified index.
     *
     * @param index     {Number} the index
     *
     * @return {Number}  the two-byte number
     *
     * @public
     * @function
     * @name getShortAt
     * @memberOf ByteBuffer
     */
    $prototype.getShortAt = function(index) {
        _checkForReadAt(this,index,2);
        var array = this.array;
        return this.order._toShort(array[index++], array[index++]);
    };

    /**
     * Returns an unsigned two-byte number from the buffer at the current position.
     *
     * @return {Number}  the unsigned two-byte number
     *
     * @public
     * @function
     * @name getUnsignedShort
     * @memberOf ByteBuffer
     */
    $prototype.getUnsignedShort = function() {
        _checkForRead(this,2);
        var val = this.getUnsignedShortAt(this.position);
        this.position += 2;
        return val;
    };

    /**
     * Returns an unsigned two-byte number from the buffer at the specified index.
     *
     *
     * @return  the unsigned two-byte number
     * @public
     * @function
     * @name getUnsignedShortAt
     * @memberOf ByteBuffer
     */
    $prototype.getUnsignedShortAt = function(index) {
        _checkForReadAt(this,index,2);
        var array = this.array;
        return this.order._toUnsignedShort(array[index++], array[index++]);
    }

    /**
     * Returns an unsigned three-byte number from the buffer at the current position.
     *
     * @return {Number}  the unsigned three-byte number
     *
     * @public
     * @function
     * @name getUnsignedMediumInt
     * @memberOf ByteBuffer
     */
    $prototype.getUnsignedMediumInt = function() {
        var array = this.array;
        return this.order._toUnsignedMediumInt(array[this.position++], array[this.position++], array[this.position++]);
    };

    /**
     * Returns a three-byte number from the buffer at the current position.
     *
     * @return {Number}  the three-byte number
     *
     * @public
     * @function
     * @name getMediumInt
     * @memberOf ByteBuffer
     */
    $prototype.getMediumInt = function() {
        var val = this.getMediumIntAt(this.position);
        this.position += 3;
        return val;
    };

    /**
     * Returns a three-byte number from the buffer at the specified index.
     *
     * @param i     {Number} the index
     *
     * @return {Number}  the three-byte number
     *
     * @public
     * @function
     * @name getMediumIntAt
     * @memberOf ByteBuffer
     */
    $prototype.getMediumIntAt = function(i) {
        var array = this.array;
        return this.order._toMediumInt(array[i++], array[i++], array[i++]);
    };

    /**
     * Returns a four-byte number from the buffer at the current position.
     *
     * @return {Number}  the four-byte number
     *
     * @public
     * @function
     * @name getInt
     * @memberOf ByteBuffer
     */
    $prototype.getInt = function() {
        _checkForRead(this,4);
        var val = this.getIntAt(this.position);
        this.position += 4;
        return val;
    };

    /**
     * Returns a four-byte number from the buffer at the specified index.
     *
     * @param index     {Number} the index
     *
     * @return {Number}  the four-byte number
     *
     * @public
     * @function
     * @name getIntAt
     * @memberOf ByteBuffer
     */
    $prototype.getIntAt = function(index) {
        _checkForReadAt(this,index,4);
        var array = this.array;
        return this.order._toInt(array[index++], array[index++], array[index++], array[index++]);
    };

    /**
     * Returns an unsigned four-byte number from the buffer at the current position.
     *
     * @return {Number}  the unsigned four-byte number
     *
     * @public
     * @function
     * @name getUnsignedInt
     * @memberOf ByteBuffer
     */
    $prototype.getUnsignedInt = function() {
        _checkForRead(this,4);
        var val = this.getUnsignedIntAt(this.position);
        this.position += 4;
        return val;
    };

    /**
     * Returns an unsigned four-byte number from the buffer at the specified position.
     *
     * @param index the index
     *
     * @return {Number}  the unsigned four-byte number
     *
     * @public
     * @function
     * @name getUnsignedIntAt
     * @memberOf ByteBuffer
     */
    $prototype.getUnsignedIntAt = function(index) {
        _checkForReadAt(this,index,4);
        var array = this.array;
        return this.order._toUnsignedInt(array[index++], array[index++], array[index++], array[index++]);
        return val;
    };

    /**
     * Returns a length-prefixed string from the buffer at the current position.
     *
     * @param  fieldSize {Number}   the width in bytes of the prefixed length field
     * @param  cs        {Charset}  the character set
     *
     * @return {String}  the length-prefixed string
     *
     * @public
     * @function
     * @name getPrefixedString
     * @memberOf ByteBuffer
     */
    $prototype.getPrefixedString = function(fieldSize, cs) {
        var len = 0;
        switch (fieldSize || 2) {
            case 1:
                len = this.getUnsigned();
                break;
            case 2:
                len = this.getUnsignedShort();
                break;
            case 4:
                len = this.getInt();
                break;
        }

        if (len === 0) {
            return "";
        }

        var oldLimit = this.limit;
        try {
            this.limit = this.position + len;
            return cs.decode(this);
        }
        finally {
            this.limit = oldLimit;
        }
    };

    /**
     * Returns a string from the buffer at the current position.
     *
     * @param  cs  {Charset}  the character set
     *
     * @return {String}  the string
     *
     * @public
     * @function
     * @name getString
     * @memberOf ByteBuffer
     */
    $prototype.getString = function(cs) {
        try {
            return cs.decode(this);
        }
        finally {
            this.position = this.limit;
        }
    };

    /**
     * Returns a sliced buffer, setting the position to zero, and
     * decrementing the limit accordingly.
     *
     * @return  {ByteBuffer} the sliced buffer
     *
     * @public
     * @function
     * @name slice
     * @memberOf ByteBuffer
     */
    $prototype.slice = function() {
        return new ByteBuffer(this.array.slice(this.position, this.limit));
    };

    /**
     * Flips the buffer. The limit is set to the current position,
     * the position is set to zero, and the mark is reset.
     *
     * @return  {ByteBuffer} the flipped buffer
     *
     * @public
     * @function
     * @name flip
     * @memberOf ByteBuffer
     */
    $prototype.flip = function() {
        this.limit = this.position;
        this.position = 0;
        this._mark = -1;
        return this;
    };

    /**
     * Rewinds the buffer. The position is set to zero and the mark is reset.
     *
     * @return  {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name rewind
     * @memberOf ByteBuffer
     */
    $prototype.rewind = function() {
        this.position = 0;
        this._mark = -1;
        return this;
    };

    /**
     * Clears the buffer. The position is set to zero, the limit is set to the
     * capacity and the mark is reset.
     *
     * @return  {ByteBuffer} the buffer
     *
     * @public
     * @function
     * @name clear
     * @memberOf ByteBuffer
     */
    $prototype.clear = function() {
        this.position = 0;
        this.limit = this.capacity;
        this._mark = -1;
        return this;
    };

    /**
     * Returns the number of bytes remaining from the current position to the limit.
     *
     * @return {Number} the number of bytes remaining
     *
     * @public
     * @function
     * @name remaining
     * @memberOf ByteBuffer
     */
    $prototype.remaining = function() {
        return (this.limit - this.position);
    };

    /**
     * Returns true   if this buffer has remaining bytes,
     *         false  otherwise.
     *
     * @return  {Boolean} whether this buffer has remaining bytes
     *
     * @public
     * @function
     * @name hasRemaining
     * @memberOf ByteBuffer
     */
    $prototype.hasRemaining = function() {
        return (this.limit > this.position);
    };

    /**
     * Skips the specified number of bytes from the current position.
     *
     * @param  size  {Number}  the number of bytes to skip
     *
     * @return  {ByteBuffer}  the buffer
     *
     * @public
     * @function
     * @name skip
     * @memberOf ByteBuffer
     */
    $prototype.skip = function(size) {
        this.position += size;
        return this;
    };

    /**
     * Returns a hex dump of this buffer.
     *
     * @return  {String}  the hex dump
     *
     * @public
     * @function
     * @name getHexDump
     * @memberOf ByteBuffer
     */
    $prototype.getHexDump = function() {
        var array = this.array;
        var pos = this.position;
        var limit = this.limit;

        if (pos == limit) {
            return "empty";
        }

        var hexDump = [];
        for (var i=pos; i < limit; i++) {
            var hex = (array[i] || 0).toString(16);
            if (hex.length == 1) {
                hex = "0" + hex;
            }
            hexDump.push(hex);
        }
        return hexDump.join(" ");
    };

    /**
     * Returns the string representation of this buffer.
     *
     * @return  {String}  the string representation
     *
     * @public
     * @function
     * @name toString
     * @memberOf ByteBuffer
     */
    $prototype.toString = $prototype.getHexDump;

    /**
     * Expands the buffer to support the expected number of remaining bytes
     * after the current position.
     *
     * @param  expectedRemaining  {Number}  the expected number of remaining bytes
     *
     * @return {ByteBuffer}  the buffer
     *
     * @public
     * @function
     * @name expand
     * @memberOf ByteBuffer
     */
    $prototype.expand = function(expectedRemaining) {
        return this.expandAt(this.position, expectedRemaining);
    };

    /**
     * Expands the buffer to support the expected number of remaining bytes
     * at the specified index.
     *
     * @param  i                  {Number} the index
     * @param  expectedRemaining  {Number}  the expected number of remaining bytes
     *
     * @return {ByteBuffer}  the buffer
     *
     * @public
     * @function
     * @name expandAt
     * @memberOf ByteBuffer
     */
    $prototype.expandAt = function(i, expectedRemaining) {
        var end = i + expectedRemaining;

        if (end > this.capacity) {
            this.capacity = end;
        }

        if (end > this.limit) {
            this.limit = end;
        }
        return this;
    };

    function _autoExpand($this, expectedRemaining) {
        if ($this.autoExpand) {
            $this.expand(expectedRemaining);
        }
        return $this;
    }

    function _checkForRead($this, expected) {
        var end = $this.position + expected;
        if (end > $this.limit) {
            throw new Error("Buffer underflow");
        }
        return $this;
    }

    function _checkForReadAt($this, index, expected) {
        var end = index + expected;
        if (index < 0 || end > $this.limit) {
            throw new Error("Index out of bounds");
        }
        return $this;
    }

    function _checkForWriteAt($this, index, expected) {
        var end = index + expected;
        if (index < 0 || end > $this.limit) {
            throw new Error("Index out of bounds");
        }
        return $this;
    }
})();

var $gwt_version = "2.5.1";
// var $wnd = window;
// var $doc = $wnd.document;
// var $moduleName, $moduleBase;
// var $strongName = '2D3489D84B426150F819AEAA07E2596F';
// var $stats = $wnd.__gwtStatsEvent ? function(a) {return $wnd.__gwtStatsEvent(a);} : null;
// var $sessionId = $wnd.__gwtStatsSessionId ? $wnd.__gwtStatsSessionId : null;
// $stats && $stats({moduleName:'JmsClient',sessionId:$sessionId,subSystem:'startup',evtGroup:'moduleStartup',millis:(new Date()).getTime(),type:'moduleEvalStart'});
var _, N20000000000000_longLit = {l:0, m:0, h:1048064}, N81_longLit = {l:4194175, m:4194303, h:1048575}, P0_longLit = {l:0, m:0, h:0}, P80_longLit = {l:128, m:0, h:0}, Pff_longLit = {l:255, m:0, h:0}, Pffff_longLit = {l:65535, m:0, h:0}, P20000000000000_longLit = {l:0, m:0, h:512}, P7fffffffffffffff_longLit = {l:4194303, m:4194303, h:524287}, seedTable = {}, Q$Object = 0, Q$String = 1, Q$byte_$1 = 2, Q$CloseHandler = 3, Q$EventHandler = 4, Q$LongLibBase$LongEmul = 5, Q$Timer = 6, Q$SimpleEventBus$Command = 7, Q$UmbrellaException = 8, Q$BytesMessage = 9, Q$JMSException = 10, Q$MapMessage = 11, Q$MessageEOFException = 12, Q$Queue = 13, Q$TemporaryQueue = 14, Q$TemporaryTopic = 15, Q$TextMessage = 16, Q$Topic = 17, Q$TopicSubscriber = 18, Q$BumpFrame = 19, Q$BumpFrame$FrameCode = 20, Q$BumpFrame$HeaderValueTypes = 21, Q$GenericAckReceipt = 22, Q$GenericBytesMessageImpl = 23, Q$GenericDestination = 24, Q$GenericMapMessage = 25, Q$GenericMapMessageImpl = 26, Q$GenericMessage = 27, Q$GenericMessageConsumer = 28, Q$GenericMessageProcessor = 29, Q$GenericMessageProducer = 30, Q$GenericSemaphoreListener = 31, Q$GenericSession = 32, Q$GenericStartStopHandlerImpl$GenericSubscriptionEntry = 33, Q$GenericSubscribeReceipt = 34, Q$GenericSubscriptionMessageProcessor = 35, Q$GenericTemporaryDestination = 36, Q$GenericTemporaryQueue = 37, Q$GenericTemporaryTopic = 38, Q$GenericTextMessage = 39, Q$GenericTopic = 40, Q$GenericTopicSubscriber = 41, Q$GenericTransaction = 42, Q$GenericUnsubscribeReceipt = 43, Q$IndexedPropertiesContent = 44, Q$JmsDataType = 45, Q$JmsExtension = 46, Q$JmsExtension$Kind = 47, Q$JmsHandlerImpl$SubscriptionEntry = 48, Q$JmsPropertiesContent = 49, Q$JmsPropertiesContent$Property = 50, Q$JmsPropertiesContent$Property_$1 = 51, Q$Serializable = 52, Q$Serializable_$1 = 53, Q$Boolean = 54, Q$Byte = 55, Q$CharSequence = 56, Q$CharSequence_$1 = 57, Q$Character = 58, Q$ClassCastException = 59, Q$Comparable = 60, Q$Comparable_$1 = 61, Q$Double = 62, Q$Enum = 63, Q$Exception = 64, Q$Float = 65, Q$IllegalStateException = 66, Q$Integer = 67, Q$Long = 68, Q$Number = 69, Q$Object_$1 = 70, Q$Short = 71, Q$StackTraceElement = 72, Q$String_$1 = 73, Q$Throwable = 74, Q$LinkedHashMap$ChainEntry = 75, Q$List = 76, Q$Map = 77, Q$Map$Entry = 78, Q$NoSuchElementException = 79, Q$Set = 80, CM$ = {};
function newSeed(id){
    return new seedTable[id];
}

function defineSeed(id, superSeed, castableTypeMap){
    var seed = seedTable[id];
    if (seed && !seed.___clazz$) {
        _ = seed.prototype;
    }
    else {
        !seed && (seed = seedTable[id] = function(){
        }
        );
        _ = seed.prototype = superSeed < 0?{}:newSeed(superSeed);
        _.castableTypeMap$ = castableTypeMap;
    }
    for (var i = 3; i < arguments.length; ++i) {
        arguments[i].prototype = _;
    }
    if (seed.___clazz$) {
        _.___clazz$ = seed.___clazz$;
        seed.___clazz$ = null;
    }
}

function makeCastMap(a){
    var result = {};
    for (var i = 0, c = a.length; i < c; ++i) {
        result[a[i]] = 1;
    }
    return result;
}

function nullMethod(){
}

defineSeed(1, -1, CM$);
_.equals$ = function equals(other){
    return this === other;
}
;
_.getClass$ = function getClass_0(){
    return this.___clazz$;
}
;
_.hashCode$ = function hashCode_0(){
    return getHashCode(this);
}
;
_.toString$ = function toString_0(){
    return this.___clazz$.typeName + '@' + toPowerOfTwoString(this.hashCode$());
}
;
_.toString = function(){
    return this.toString$();
}
;
_.typeMarker$ = nullMethod;
function $getStackTrace(this$static){
    if (this$static.stackTrace == null) {
        return initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Object_$1]), Q$StackTraceElement, 0, 0);
    }
    return this$static.stackTrace;
}

function $printStackTrace(this$static){
    var causeMessage, currentCause, msg;
    msg = new StringBuffer_0;
    currentCause = this$static;
    while (currentCause) {
        causeMessage = currentCause.getMessage_0();
        currentCause != this$static && (msg.impl.string += 'Caused by: ' , msg);
        $append_0(msg, currentCause.___clazz$.typeName);
        msg.impl.string += ': ';
        $append(msg.impl, causeMessage == null?'(No exception detail)':causeMessage);
        msg.impl.string += '\n';
        currentCause = currentCause.cause;
    }
}

function $setStackTrace(this$static, stackTrace){
    var c, copy, i;
    copy = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Object_$1]), Q$StackTraceElement, stackTrace.length, 0);
    for (i = 0 , c = stackTrace.length; i < c; ++i) {
        if (!stackTrace[i]) {
            throw new NullPointerException_0;
        }
        copy[i] = stackTrace[i];
    }
    this$static.stackTrace = copy;
}

function $toString(this$static){
    var className, msg;
    className = this$static.___clazz$.typeName;
    msg = this$static.getMessage_0();
    return msg != null?className + ': ' + msg:className;
}

function Throwable_0(message){
    $fillInStackTrace(this);
    this.detailMessage = message;
}

defineSeed(8, 1, makeCastMap([Q$Serializable, Q$Throwable]));
_.getMessage_0 = function getMessage(){
    return this.detailMessage;
}
;
_.toString$ = function toString_1(){
    return $toString(this);
}
;
_.cause = null;
_.detailMessage = null;
_.stackTrace = null;
function Exception_0(message){
    Throwable_0.call(this, message);
}

defineSeed(7, 8, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]));
function RuntimeException_0(message){
    Exception_0.call(this, message);
}

function RuntimeException_1(message, cause){
    $fillInStackTrace(this);
    this.cause = cause;
    this.detailMessage = message;
}

defineSeed(6, 7, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]));
function JavaScriptException_0(e){
    $fillInStackTrace(this);
    this.e = e;
    this.description = '';
    $createStackTrace(this);
}

function getExceptionDescription(e){
    return instanceOfJso(e)?getExceptionDescription0(dynamicCastJso(e)):e + '';
}

function getExceptionDescription0(e){
    return e == null?null:e.message;
}

function getExceptionName(e){
    return e == null?'null':instanceOfJso(e)?getExceptionName0(dynamicCastJso(e)):instanceOf(e, Q$String)?'String':getClass__devirtual$(e).typeName;
}

function getExceptionName0(e){
    return e == null?null:e.name;
}

function getExceptionProperties(e){
    return instanceOfJso(e)?$getProperties(dynamicCastJso(e)):'';
}

defineSeed(5, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), JavaScriptException_0);
_.getMessage_0 = function getMessage_0(){
    this.message_0 == null && (this.name_0 = getExceptionName(this.e) , this.description = this.description + ': ' + getExceptionDescription(this.e) , this.message_0 = '(' + this.name_0 + ') ' + getExceptionProperties(this.e) + this.description , undefined);
    return this.message_0;
}
;
_.description = '';
_.e = null;
_.message_0 = null;
_.name_0 = null;
function equals__devirtual$(this$static, other){
    var maybeJsoInvocation;
    return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.equals$(other):maybeJsoInvocation === other;
}

function getClass__devirtual$(this$static){
    var maybeJsoInvocation;
    return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.___clazz$:Lcom_google_gwt_core_client_JavaScriptObject_2_classLit;
}

function hashCode__devirtual$(this$static){
    var maybeJsoInvocation;
    return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.hashCode$():getHashCode(maybeJsoInvocation);
}

function toString__devirtual$(this$static){
    var maybeJsoInvocation;
    return maybeJsoInvocation = this$static , isJavaObject(maybeJsoInvocation)?maybeJsoInvocation.toString$():maybeJsoInvocation.toString?maybeJsoInvocation.toString():'[JavaScriptObject]';
}

defineSeed(14, 1, {});
function apply(jsFunction, thisObj, args){
    return jsFunction.apply(thisObj, args);
    var __0;
}

function enter(){
    var now;
    if (entryDepth != 0) {
        now = (new Date).getTime();
        if (now - watchdogEntryDepthLastScheduled > 2000) {
            watchdogEntryDepthLastScheduled = now;
            watchdogEntryDepthTimerId = watchdogEntryDepthSchedule();
        }
    }
    if (entryDepth++ == 0) {
        $flushEntryCommands(($clinit_SchedulerImpl() , INSTANCE));
        return true;
    }
    return false;
}

function entry_0(jsFunction){
    return function(){
        try {
            return entry0(jsFunction, this, arguments);
        }
        catch (e) {
            throw e;
        }
    }
        ;
}

function entry0(jsFunction, thisObj, args){
    var initialEntry;
    initialEntry = enter();
    try {
        return apply(jsFunction, thisObj, args);
    }
    finally {
        exit(initialEntry);
    }
}

function exit(initialEntry){
    initialEntry && $flushFinallyCommands(($clinit_SchedulerImpl() , INSTANCE));
    --entryDepth;
    if (initialEntry) {
        if (watchdogEntryDepthTimerId != -1) {
            watchdogEntryDepthCancel(watchdogEntryDepthTimerId);
            watchdogEntryDepthTimerId = -1;
        }
    }
}

function getHashCode(o){
    return o.$H || (o.$H = ++sNextHashId);
}

function watchdogEntryDepthCancel(timerId){
    // $wnd.clearTimeout(timerId);
    clearTimeout(timerId);
}

function watchdogEntryDepthSchedule(){
    return /*$wnd.*/setTimeout(function(){
        entryDepth != 0 && (entryDepth = 0);
        watchdogEntryDepthTimerId = -1;
    }, 10);
}

var entryDepth = 0, sNextHashId = 0, watchdogEntryDepthLastScheduled = 0, watchdogEntryDepthTimerId = -1;
function $clinit_SchedulerImpl(){
    $clinit_SchedulerImpl = nullMethod;
    INSTANCE = new SchedulerImpl_0;
}

function $flushEntryCommands(this$static){
    var oldQueue, rescheduled;
    if (this$static.entryCommands) {
        rescheduled = null;
        do {
            oldQueue = this$static.entryCommands;
            this$static.entryCommands = null;
            rescheduled = runScheduledTasks(oldQueue, rescheduled);
        }
        while (this$static.entryCommands);
        this$static.entryCommands = rescheduled;
    }
}

function $flushFinallyCommands(this$static){
    var oldQueue, rescheduled;
    if (this$static.finallyCommands) {
        rescheduled = null;
        do {
            oldQueue = this$static.finallyCommands;
            this$static.finallyCommands = null;
            rescheduled = runScheduledTasks(oldQueue, rescheduled);
        }
        while (this$static.finallyCommands);
        this$static.finallyCommands = rescheduled;
    }
}

function SchedulerImpl_0(){
}

function push(queue, task){
    !queue && (queue = []);
    queue[queue.length] = task;
    return queue;
}

function runScheduledTasks(tasks, rescheduled){
    /*var i, j, t;
     for (i = 0 , j = tasks.length; i < j; ++i) {
     t = tasks[i];
     try {
     t[1]?t[0].nullMethod() && (rescheduled = push(rescheduled, t)):($wnd.__gwt_initWindowCloseHandler($entry(onClosing), $entry(onClosed)) , undefined);
     }
     catch ($e0) {
     $e0 = caught($e0);
     if (!instanceOf($e0, Q$Throwable))
     throw $e0;
     }
     }*/
    return rescheduled;
}

defineSeed(16, 14, {}, SchedulerImpl_0);
_.entryCommands = null;
_.finallyCommands = null;
var INSTANCE;
function extractNameFromToString(fnToString){
    var index, start, toReturn;
    toReturn = '';
    fnToString = $trim(fnToString);
    index = fnToString.indexOf('(');
    start = fnToString.indexOf('function') == 0?8:0;
    if (index == -1) {
        index = $indexOf_0(fnToString, fromCodePoint(64));
        start = fnToString.indexOf('function ') == 0?9:0;
    }
    index != -1 && (toReturn = $trim(fnToString.substr(start, index - start)));
    return toReturn.length > 0?toReturn:'anonymous';
}

function splice(arr, length_0){
    arr.length >= length_0 && arr.splice(0, length_0);
    return arr;
}

function $createStackTrace(e){
    var i, j, stack, stackTrace;
    stack = $inferFrom(instanceOfJso(e.e)?dynamicCastJso(e.e):null);
    stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Object_$1]), Q$StackTraceElement, stack.length, 0);
    for (i = 0 , j = stackTrace.length; i < j; ++i) {
        stackTrace[i] = new StackTraceElement_0(stack[i]);
    }
    $setStackTrace(e, stackTrace);
}

function $fillInStackTrace(t){
    var i, j, stack, stackTrace;
    stack = splice($inferFrom($makeException()), 2);
    stackTrace = initDim(_3Ljava_lang_StackTraceElement_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Object_$1]), Q$StackTraceElement, stack.length, 0);
    for (i = 0 , j = stackTrace.length; i < j; ++i) {
        stackTrace[i] = new StackTraceElement_0(stack[i]);
    }
    $setStackTrace(t, stackTrace);
}

function $getProperties(e){
    var result = '';
    try {
        for (var prop in e) {
            if (prop != 'name' && prop != 'message' && prop != 'toString') {
                try {
                    result += '\n ' + prop + ': ' + e[prop];
                }
                catch (ignored) {
                }
            }
        }
    }
    catch (ignored) {
    }
    return result;
}

function $makeException(){
    try {
        null.a();
    }
    catch (e) {
        return e;
    }
}

function $inferFrom(e){
    var i, j, stack;
    stack = e && e.stack?e.stack.split('\n'):[];
    for (i = 0 , j = stack.length; i < j; ++i) {
        stack[i] = extractNameFromToString(stack[i]);
    }
    return stack;
}

defineSeed(21, 1, {});
function $append(this$static, x){
    this$static.string += x;
}

function StringBufferImplAppend_0(){
}

defineSeed(22, 21, {}, StringBufferImplAppend_0);
_.string = '';
defineSeed(28, 1, {});
_.toString$ = function toString_2(){
    return 'An event type';
}
;
_.source = null;
function $overrideSource(this$static, source){
    this$static.source = source;
}

defineSeed(27, 28, {});
_.dead = false;
function CloseEvent_0(){
}

function fire(source){
    var event_0;
    if (TYPE) {
        event_0 = new CloseEvent_0;
        $fireEvent(source, event_0);
    }
}

defineSeed(26, 27, {}, CloseEvent_0);
_.dispatch = function dispatch(handler){
    dynamicCast(handler, Q$CloseHandler);
    $onClose();
}
;
_.getAssociatedType = function getAssociatedType(){
    return TYPE;
}
;
var TYPE = null;
defineSeed(30, 1, {});
_.hashCode$ = function hashCode_1(){
    return this.index_0;
}
;
_.toString$ = function toString_3(){
    return 'Event type';
}
;
_.index_0 = 0;
var nextHashCode = 0;
function GwtEvent$Type_0(){
    this.index_0 = ++nextHashCode;
}

defineSeed(29, 30, {}, GwtEvent$Type_0);
function $addHandler(this$static, type, handler){
    return new LegacyHandlerWrapper_0($doAdd(this$static.eventBus, type, handler));
}

function $fireEvent(this$static, event_0){
    var e, oldSource;
    !event_0.dead || (event_0.dead = false , event_0.source = null);
    oldSource = event_0.source;
    $overrideSource(event_0, this$static.source);
    try {
        $doFire(this$static.eventBus, event_0);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$UmbrellaException)) {
            e = $e0;
            throw new UmbrellaException_2(e.causes);
        }
        else
            throw $e0;
    }
    finally {
        oldSource == null?(event_0.dead = true , event_0.source = null):(event_0.source = oldSource);
    }
}

defineSeed(31, 1, {});
_.eventBus = null;
_.source = null;
defineSeed(34, 1, {});
function $defer(this$static, command){
    !this$static.deferredDeltas && (this$static.deferredDeltas = new ArrayList_0);
    $add_4(this$static.deferredDeltas, command);
}

function $doAdd(this$static, type, handler){
    if (!type) {
        throw new NullPointerException_1('Cannot add a handler with a null type');
    }
    if (!handler) {
        throw new NullPointerException_1('Cannot add a null handler');
    }
    this$static.firingDepth > 0?$defer(this$static, new SimpleEventBus$2_0(this$static, type, handler)):$doAddNow(this$static, type, null, handler);
    return new SimpleEventBus$1_0;
}

function $doAddNow(this$static, type, source, handler){
    var l_0;
    l_0 = $ensureHandlerList(this$static, type, source);
    l_0.add(handler);
}

function $doFire(this$static, event_0){
    var causes, e, handler, handlers, it;
    if (!event_0) {
        throw new NullPointerException_1('Cannot fire null event');
    }
    try {
        ++this$static.firingDepth;
        handlers = $getDispatchList(this$static, event_0.getAssociatedType());
        causes = null;
        it = this$static.isReverseOrder?handlers.listIterator_0(handlers.size_0()):handlers.listIterator();
        while (this$static.isReverseOrder?it.hasPrevious():it.hasNext()) {
            handler = this$static.isReverseOrder?it.previous():it.next_0();
            try {
                event_0.dispatch(dynamicCast(handler, Q$EventHandler));
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (instanceOf($e0, Q$Throwable)) {
                    e = $e0;
                    !causes && (causes = new HashSet_0);
                    $add_5(causes, e);
                }
                else
                    throw $e0;
            }
        }
        if (causes) {
            throw new UmbrellaException_1(causes);
        }
    }
    finally {
        --this$static.firingDepth;
        this$static.firingDepth == 0 && $handleQueuedAddsAndRemoves(this$static);
    }
}

function $ensureHandlerList(this$static, type, source){
    var handlers, sourceMap;
    sourceMap = dynamicCast(this$static.map.get_0(type), Q$Map);
    if (!sourceMap) {
        sourceMap = new HashMap_0;
        this$static.map.put_0(type, sourceMap);
    }
    handlers = dynamicCast(sourceMap.get_0(source), Q$List);
    if (!handlers) {
        handlers = new ArrayList_0;
        sourceMap.put_0(source, handlers);
    }
    return handlers;
}

function $getDispatchList(this$static, type){
    var directHandlers;
    directHandlers = $getHandlerList(this$static, type);
    return directHandlers;
}

function $getHandlerList(this$static, type){
    var handlers, sourceMap;
    sourceMap = dynamicCast(this$static.map.get_0(type), Q$Map);
    if (!sourceMap) {
        return $clinit_Collections() , $clinit_Collections() , EMPTY_LIST;
    }
    handlers = dynamicCast(sourceMap.get_0(null), Q$List);
    if (!handlers) {
        return $clinit_Collections() , $clinit_Collections() , EMPTY_LIST;
    }
    return handlers;
}

function $handleQueuedAddsAndRemoves(this$static){
    var c, c$iterator;
    if (this$static.deferredDeltas) {
        try {
            for (c$iterator = new AbstractList$IteratorImpl_0(this$static.deferredDeltas); c$iterator.i < c$iterator.this$0_0.size_0();) {
                c = dynamicCast($next(c$iterator), Q$SimpleEventBus$Command);
                $doAddNow(c.this$0, c.val$type, c.val$source, c.val$handler);
            }
        }
        finally {
            this$static.deferredDeltas = null;
        }
    }
}

defineSeed(33, 34, {});
_.deferredDeltas = null;
_.firingDepth = 0;
_.isReverseOrder = false;
function HandlerManager$Bus_0(){
    this.map = new HashMap_0;
    this.isReverseOrder = false;
}

defineSeed(32, 33, {}, HandlerManager$Bus_0);
function LegacyHandlerWrapper_0(){
}

defineSeed(35, 1, {}, LegacyHandlerWrapper_0);
function UmbrellaException_1(causes){
    RuntimeException_1.call(this, makeMessage(causes), makeCause(causes));
    this.causes = causes;
}

function makeCause(causes){
    var iterator;
    iterator = causes.iterator();
    if (!iterator.hasNext()) {
        return null;
    }
    return dynamicCast(iterator.next_0(), Q$Throwable);
}

function makeMessage(causes){
    var b, count, first, t, t$iterator;
    count = causes.size_0();
    if (count == 0) {
        return null;
    }
    b = new StringBuilder_1(count == 1?'Exception caught: ':count + ' exceptions caught: ');
    first = true;
    for (t$iterator = causes.iterator(); t$iterator.hasNext();) {
        t = dynamicCast(t$iterator.next_0(), Q$Throwable);
        first?(first = false):(b.impl.string += '; ' , b);
        $append_1(b, t.getMessage_0());
    }
    return b.impl.string;
}

defineSeed(37, 6, makeCastMap([Q$UmbrellaException, Q$Serializable, Q$Exception, Q$Throwable]), UmbrellaException_1);
_.causes = null;
function UmbrellaException_2(causes){
    UmbrellaException_1.call(this, causes);
}

defineSeed(36, 37, makeCastMap([Q$UmbrellaException, Q$Serializable, Q$Exception, Q$Throwable]), UmbrellaException_2);
function Array_0(){
}

function cloneSubrange(array, fromIndex, toIndex){
    var a, result;
    a = array;
    result = a.slice(fromIndex, toIndex);
    initValues(a.___clazz$, a.castableTypeMap$, a.queryId$, result);
    return result;
}

function createFrom(array, length_0){
    var a, result;
    a = array;
    result = createFromSeed(0, length_0);
    initValues(a.___clazz$, a.castableTypeMap$, a.queryId$, result);
    return result;
}

function createFromSeed(seedType, length_0){
    var array = new Array(length_0);
    if (seedType == 3) {
        for (var i = 0; i < length_0; ++i) {
            var value = new Object;
            value.l = value.m = value.h = 0;
            array[i] = value;
        }
    }
    else if (seedType > 0) {
        var value = [null, 0, false][seedType];
        for (var i = 0; i < length_0; ++i) {
            array[i] = value;
        }
    }
    return array;
}

function initDim(arrayClass, castableTypeMap, queryId, length_0, seedType){
    var result;
    result = createFromSeed(seedType, length_0);
    initValues(arrayClass, castableTypeMap, queryId, result);
    return result;
}

function initValues(arrayClass, castableTypeMap, queryId, array){
    $clinit_Array$ExpandoWrapper();
    wrapArray(array, expandoNames_0, expandoValues_0);
    array.___clazz$ = arrayClass;
    array.castableTypeMap$ = castableTypeMap;
    array.queryId$ = queryId;
    return array;
}

function setCheck(array, index, value){
    if (value != null) {
        if (array.queryId$ > 0 && !canCastUnsafe(value, array.queryId$)) {
            throw new ArrayStoreException_0;
        }
        else if (array.queryId$ == -1 && (value.typeMarker$ == nullMethod || canCast(value, 1))) {
            throw new ArrayStoreException_0;
        }
        else if (array.queryId$ < -1 && !(value.typeMarker$ != nullMethod && !canCast(value, 1)) && !canCastUnsafe(value, -array.queryId$)) {
            throw new ArrayStoreException_0;
        }
    }
    return array[index] = value;
}

defineSeed(38, 1, {}, Array_0);
_.queryId$ = 0;
function $clinit_Array$ExpandoWrapper(){
    $clinit_Array$ExpandoWrapper = nullMethod;
    expandoNames_0 = [];
    expandoValues_0 = [];
    initExpandos(new Array_0, expandoNames_0, expandoValues_0);
}

function initExpandos(protoType, expandoNames, expandoValues){
    var i = 0, value;
    for (var name_0 in protoType) {
        if (value = protoType[name_0]) {
            expandoNames[i] = name_0;
            expandoValues[i] = value;
            ++i;
        }
    }
}

function wrapArray(array, expandoNames, expandoValues){
    $clinit_Array$ExpandoWrapper();
    for (var i = 0, c = expandoNames.length; i < c; ++i) {
        array[expandoNames[i]] = expandoValues[i];
    }
}

var expandoNames_0, expandoValues_0;
function canCast(src, dstId){
    return src.castableTypeMap$ && !!src.castableTypeMap$[dstId];
}

function canCastUnsafe(src, dstId){
    return src.castableTypeMap$ && src.castableTypeMap$[dstId];
}

function dynamicCast(src, dstId){
    if (src != null && !canCastUnsafe(src, dstId)) {
        throw new ClassCastException_0;
    }
    return src;
}

function dynamicCastJso(src){
    if (src != null && (src.typeMarker$ == nullMethod || canCast(src, 1))) {
        throw new ClassCastException_0;
    }
    return src;
}

function instanceOf(src, dstId){
    return src != null && canCast(src, dstId);
}

function instanceOfJso(src){
    return src != null && src.typeMarker$ != nullMethod && !canCast(src, 1);
}

function isJavaObject(src){
    return src.typeMarker$ == nullMethod || canCast(src, 1);
}

function maskUndefined(src){
    return src == null?null:src;
}

function round_int(x){
    return ~~Math.max(Math.min(x, 2147483647), -2147483648);
}

function throwClassCastExceptionUnlessNull(o){
    if (o != null) {
        throw new ClassCastException_0;
    }
    return null;
}

function init(){
    /*
     var runtimeValue;
     !!$stats && onModuleStart('com.google.gwt.useragent.client.UserAgentAsserter');
     runtimeValue = $getRuntimeValue();
     $equals_2('gecko1_8', runtimeValue) || ($wnd.alert('ERROR: Possible problem with your *.gwt.xml module file.\nThe compile time user.agent value (gecko1_8) does not match the runtime user.agent value (' + runtimeValue + '). Expect more errors.\n') , undefined);
     !!$stats && onModuleStart('com.google.gwt.user.client.DocumentModeAsserter');
     $onModuleLoad();
     !!$stats && onModuleStart('com.kaazing.gateway.jms.client.entry.Entry');
     */
    init_0();
}

function caught(e){
    if (instanceOf(e, Q$Throwable)) {
        return e;
    }
    return new JavaScriptException_0(e);
}

function create(value){
    var a0, a1, a2;
    a0 = value & 4194303;
    a1 = value >> 22 & 4194303;
    a2 = value < 0?1048575:0;
    return create0(a0, a1, a2);
}

function create_0(a){
    return create0(a.l, a.m, a.h);
}

function create0(l_0, m_0, h_0){
    return _ = new LongLibBase$LongEmul_0 , _.l = l_0 , _.m = m_0 , _.h = h_0 , _;
}

function divMod(a, b, computeRemainder){
    var aIsCopy, aIsMinValue, aIsNegative, bpower, c, negative;
    if (b.l == 0 && b.m == 0 && b.h == 0) {
        throw new ArithmeticException_0;
    }
    if (a.l == 0 && a.m == 0 && a.h == 0) {
        computeRemainder && (remainder = create0(0, 0, 0));
        return create0(0, 0, 0);
    }
    if (b.h == 524288 && b.m == 0 && b.l == 0) {
        return divModByMinValue(a, computeRemainder);
    }
    negative = false;
    if (b.h >> 19 != 0) {
        b = neg(b);
        negative = true;
    }
    bpower = powerOfTwo(b);
    aIsNegative = false;
    aIsMinValue = false;
    aIsCopy = false;
    if (a.h == 524288 && a.m == 0 && a.l == 0) {
        aIsMinValue = true;
        aIsNegative = true;
        if (bpower == -1) {
            a = create_0(($clinit_LongLib$Const() , MAX_VALUE));
            aIsCopy = true;
            negative = !negative;
        }
        else {
            c = shr(a, bpower);
            negative && negate(c);
            computeRemainder && (remainder = create0(0, 0, 0));
            return c;
        }
    }
    else if (a.h >> 19 != 0) {
        aIsNegative = true;
        a = neg(a);
        aIsCopy = true;
        negative = !negative;
    }
    if (bpower != -1) {
        return divModByShift(a, bpower, negative, aIsNegative, computeRemainder);
    }
    if (!gte_0(a, b)) {
        computeRemainder && (aIsNegative?(remainder = neg(a)):(remainder = create0(a.l, a.m, a.h)));
        return create0(0, 0, 0);
    }
    return divModHelper(aIsCopy?a:create0(a.l, a.m, a.h), b, negative, aIsNegative, aIsMinValue, computeRemainder);
}

function divModByMinValue(a, computeRemainder){
    if (a.h == 524288 && a.m == 0 && a.l == 0) {
        computeRemainder && (remainder = create0(0, 0, 0));
        return create_0(($clinit_LongLib$Const() , ONE));
    }
    computeRemainder && (remainder = create0(a.l, a.m, a.h));
    return create0(0, 0, 0);
}

function divModByShift(a, bpower, negative, aIsNegative, computeRemainder){
    var c;
    c = shr(a, bpower);
    negative && negate(c);
    if (computeRemainder) {
        a = maskRight(a, bpower);
        aIsNegative?(remainder = neg(a)):(remainder = create0(a.l, a.m, a.h));
    }
    return c;
}

function divModHelper(a, b, negative, aIsNegative, aIsMinValue, computeRemainder){
    var bshift, gte, quotient, shift, a1, a2, a0;
    shift = numberOfLeadingZeros(b) - numberOfLeadingZeros(a);
    bshift = shl(b, shift);
    quotient = create0(0, 0, 0);
    while (shift >= 0) {
        gte = trialSubtract(a, bshift);
        if (gte) {
            shift < 22?(quotient.l |= 1 << shift , undefined):shift < 44?(quotient.m |= 1 << shift - 22 , undefined):(quotient.h |= 1 << shift - 44 , undefined);
            if (a.l == 0 && a.m == 0 && a.h == 0) {
                break;
            }
        }
        a1 = bshift.m;
        a2 = bshift.h;
        a0 = bshift.l;
        bshift.h = a2 >>> 1;
        bshift.m = a1 >>> 1 | (a2 & 1) << 21;
        bshift.l = a0 >>> 1 | (a1 & 1) << 21;
        --shift;
    }
    negative && negate(quotient);
    if (computeRemainder) {
        if (aIsNegative) {
            remainder = neg(a);
            aIsMinValue && (remainder = sub(remainder, ($clinit_LongLib$Const() , ONE)));
        }
        else {
            remainder = create0(a.l, a.m, a.h);
        }
    }
    return quotient;
}

function maskRight(a, bits){
    var b0, b1, b2;
    if (bits <= 22) {
        b0 = a.l & (1 << bits) - 1;
        b1 = b2 = 0;
    }
    else if (bits <= 44) {
        b0 = a.l;
        b1 = a.m & (1 << bits - 22) - 1;
        b2 = 0;
    }
    else {
        b0 = a.l;
        b1 = a.m;
        b2 = a.h & (1 << bits - 44) - 1;
    }
    return create0(b0, b1, b2);
}

function negate(a){
    var neg0, neg1, neg2;
    neg0 = ~a.l + 1 & 4194303;
    neg1 = ~a.m + (neg0 == 0?1:0) & 4194303;
    neg2 = ~a.h + (neg0 == 0 && neg1 == 0?1:0) & 1048575;
    a.l = neg0;
    a.m = neg1;
    a.h = neg2;
}

function numberOfLeadingZeros(a){
    var b1, b2;
    b2 = numberOfLeadingZeros_0(a.h);
    if (b2 == 32) {
        b1 = numberOfLeadingZeros_0(a.m);
        return b1 == 32?numberOfLeadingZeros_0(a.l) + 32:b1 + 20 - 10;
    }
    else {
        return b2 - 12;
    }
}

function powerOfTwo(a){
    var h_0, l_0, m_0;
    l_0 = a.l;
    if ((l_0 & l_0 - 1) != 0) {
        return -1;
    }
    m_0 = a.m;
    if ((m_0 & m_0 - 1) != 0) {
        return -1;
    }
    h_0 = a.h;
    if ((h_0 & h_0 - 1) != 0) {
        return -1;
    }
    if (h_0 == 0 && m_0 == 0 && l_0 == 0) {
        return -1;
    }
    if (h_0 == 0 && m_0 == 0 && l_0 != 0) {
        return numberOfTrailingZeros(l_0);
    }
    if (h_0 == 0 && m_0 != 0 && l_0 == 0) {
        return numberOfTrailingZeros(m_0) + 22;
    }
    if (h_0 != 0 && m_0 == 0 && l_0 == 0) {
        return numberOfTrailingZeros(h_0) + 44;
    }
    return -1;
}

function toDoubleHelper(a){
    return a.l + a.m * 4194304 + a.h * 17592186044416;
}

function trialSubtract(a, b){
    var sum0, sum1, sum2;
    sum2 = a.h - b.h;
    if (sum2 < 0) {
        return false;
    }
    sum0 = a.l - b.l;
    sum1 = a.m - b.m + (sum0 >> 22);
    sum2 += sum1 >> 22;
    if (sum2 < 0) {
        return false;
    }
    a.l = sum0 & 4194303;
    a.m = sum1 & 4194303;
    a.h = sum2 & 1048575;
    return true;
}

var remainder = null;
function and(a, b){
    return create0(a.l & b.l, a.m & b.m, a.h & b.h);
}

function div(a, b){
    return divMod(a, b, false);
}

function eq(a, b){
    return a.l == b.l && a.m == b.m && a.h == b.h;
}

function fromDouble(value){
    var a0, a1, a2, negative, result;
    if (isNaN(value)) {
        return $clinit_LongLib$Const() , ZERO;
    }
    if (value < -9223372036854775808) {
        return $clinit_LongLib$Const() , MIN_VALUE;
    }
    if (value >= 9223372036854775807) {
        return $clinit_LongLib$Const() , MAX_VALUE;
    }
    negative = false;
    if (value < 0) {
        negative = true;
        value = -value;
    }
    a2 = 0;
    if (value >= 17592186044416) {
        a2 = round_int(value / 17592186044416);
        value -= a2 * 17592186044416;
    }
    a1 = 0;
    if (value >= 4194304) {
        a1 = round_int(value / 4194304);
        value -= a1 * 4194304;
    }
    a0 = round_int(value);
    result = create0(a0, a1, a2);
    negative && negate(result);
    return result;
}

function fromInt(value){
    var rebase, result;
    if (value > -129 && value < 128) {
        rebase = value + 128;
        boxedValues == null && (boxedValues = initDim(_3Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$LongLibBase$LongEmul, 256, 0));
        result = boxedValues[rebase];
        !result && (result = boxedValues[rebase] = create(value));
        return result;
    }
    return create(value);
}

function gt(a, b){
    var signa, signb;
    signa = a.h >> 19;
    signb = b.h >> 19;
    return signa == 0?signb != 0 || a.h > b.h || a.h == b.h && a.m > b.m || a.h == b.h && a.m == b.m && a.l > b.l:!(signb == 0 || a.h < b.h || a.h == b.h && a.m < b.m || a.h == b.h && a.m == b.m && a.l <= b.l);
}

function gte_0(a, b){
    var signa, signb;
    signa = a.h >> 19;
    signb = b.h >> 19;
    return signa == 0?signb != 0 || a.h > b.h || a.h == b.h && a.m > b.m || a.h == b.h && a.m == b.m && a.l >= b.l:!(signb == 0 || a.h < b.h || a.h == b.h && a.m < b.m || a.h == b.h && a.m == b.m && a.l < b.l);
}

function lt(a, b){
    return !gte_0(a, b);
}

function lte(a, b){
    return !gt(a, b);
}

function mul(a, b){
    var a0, a1, a2, a3, a4, b0, b1, b2, b3, b4, c0, c00, c01, c1, c10, c11, c12, c13, c2, c22, c23, c24, p0, p1, p2, p3, p4;
    a0 = a.l & 8191;
    a1 = a.l >> 13 | (a.m & 15) << 9;
    a2 = a.m >> 4 & 8191;
    a3 = a.m >> 17 | (a.h & 255) << 5;
    a4 = (a.h & 1048320) >> 8;
    b0 = b.l & 8191;
    b1 = b.l >> 13 | (b.m & 15) << 9;
    b2 = b.m >> 4 & 8191;
    b3 = b.m >> 17 | (b.h & 255) << 5;
    b4 = (b.h & 1048320) >> 8;
    p0 = a0 * b0;
    p1 = a1 * b0;
    p2 = a2 * b0;
    p3 = a3 * b0;
    p4 = a4 * b0;
    if (b1 != 0) {
        p1 += a0 * b1;
        p2 += a1 * b1;
        p3 += a2 * b1;
        p4 += a3 * b1;
    }
    if (b2 != 0) {
        p2 += a0 * b2;
        p3 += a1 * b2;
        p4 += a2 * b2;
    }
    if (b3 != 0) {
        p3 += a0 * b3;
        p4 += a1 * b3;
    }
    b4 != 0 && (p4 += a0 * b4);
    c00 = p0 & 4194303;
    c01 = (p1 & 511) << 13;
    c0 = c00 + c01;
    c10 = p0 >> 22;
    c11 = p1 >> 9;
    c12 = (p2 & 262143) << 4;
    c13 = (p3 & 31) << 17;
    c1 = c10 + c11 + c12 + c13;
    c22 = p2 >> 18;
    c23 = p3 >> 5;
    c24 = (p4 & 4095) << 8;
    c2 = c22 + c23 + c24;
    c1 += c0 >> 22;
    c0 &= 4194303;
    c2 += c1 >> 22;
    c1 &= 4194303;
    c2 &= 1048575;
    return create0(c0, c1, c2);
}

function neg(a){
    var neg0, neg1, neg2;
    neg0 = ~a.l + 1 & 4194303;
    neg1 = ~a.m + (neg0 == 0?1:0) & 4194303;
    neg2 = ~a.h + (neg0 == 0 && neg1 == 0?1:0) & 1048575;
    return create0(neg0, neg1, neg2);
}

function neq(a, b){
    return a.l != b.l || a.m != b.m || a.h != b.h;
}

function or(a, b){
    return create0(a.l | b.l, a.m | b.m, a.h | b.h);
}

function shl(a, n){
    var res0, res1, res2;
    n &= 63;
    if (n < 22) {
        res0 = a.l << n;
        res1 = a.m << n | a.l >> 22 - n;
        res2 = a.h << n | a.m >> 22 - n;
    }
    else if (n < 44) {
        res0 = 0;
        res1 = a.l << n - 22;
        res2 = a.m << n - 22 | a.l >> 44 - n;
    }
    else {
        res0 = 0;
        res1 = 0;
        res2 = a.l << n - 44;
    }
    return create0(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function shr(a, n){
    var a2, negative, res0, res1, res2;
    n &= 63;
    a2 = a.h;
    negative = (a2 & 524288) != 0;
    negative && (a2 |= -1048576);
    if (n < 22) {
        res2 = a2 >> n;
        res1 = a.m >> n | a2 << 22 - n;
        res0 = a.l >> n | a.m << 22 - n;
    }
    else if (n < 44) {
        res2 = negative?1048575:0;
        res1 = a2 >> n - 22;
        res0 = a.m >> n - 22 | a2 << 44 - n;
    }
    else {
        res2 = negative?1048575:0;
        res1 = negative?4194303:0;
        res0 = a2 >> n - 44;
    }
    return create0(res0 & 4194303, res1 & 4194303, res2 & 1048575);
}

function sub(a, b){
    var sum0, sum1, sum2;
    sum0 = a.l - b.l;
    sum1 = a.m - b.m + (sum0 >> 22);
    sum2 = a.h - b.h + (sum1 >> 22);
    return create0(sum0 & 4194303, sum1 & 4194303, sum2 & 1048575);
}

function toDouble(a){
    if (eq(a, ($clinit_LongLib$Const() , MIN_VALUE))) {
        return -9223372036854775808;
    }
    if (!gte_0(a, ZERO)) {
        return -toDoubleHelper(neg(a));
    }
    return a.l + a.m * 4194304 + a.h * 17592186044416;
}

function toInt(a){
    return a.l | a.m << 22;
}

function toString_4(a){
    var digits, rem, res, tenPowerLong, zeroesNeeded;
    if (a.l == 0 && a.m == 0 && a.h == 0) {
        return '0';
    }
    if (a.h == 524288 && a.m == 0 && a.l == 0) {
        return '-9223372036854775808';
    }
    if (a.h >> 19 != 0) {
        return '-' + toString_4(neg(a));
    }
    rem = a;
    res = '';
    while (!(rem.l == 0 && rem.m == 0 && rem.h == 0)) {
        tenPowerLong = fromInt(1000000000);
        rem = divMod(rem, tenPowerLong, true);
        digits = '' + toInt(remainder);
        if (!(rem.l == 0 && rem.m == 0 && rem.h == 0)) {
            zeroesNeeded = 9 - digits.length;
            for (; zeroesNeeded > 0; --zeroesNeeded) {
                digits = '0' + digits;
            }
        }
        res = digits + res;
    }
    return res;
}

var boxedValues = null;
function $clinit_LongLib$Const(){
    $clinit_LongLib$Const = nullMethod;
    MAX_VALUE = create0(4194303, 4194303, 524287);
    MIN_VALUE = create0(0, 0, 524288);
    ONE = fromInt(1);
    fromInt(2);
    ZERO = fromInt(0);
}

var MAX_VALUE, MIN_VALUE, ONE, ZERO;
function LongLibBase$LongEmul_0(){
}

defineSeed(47, 1, makeCastMap([Q$LongLibBase$LongEmul]), LongLibBase$LongEmul_0);
/*function onModuleStart(mainClassName){
 return $stats({moduleName:$moduleName, sessionId:$sessionId, subSystem:'startup', evtGroup:'moduleStartup', millis:(new Date).getTime(), type:'onModuleLoadStart', className:mainClassName});
 }*/

function $onModuleLoad(){
    /*var allowedModes, currentMode, i;
     currentMode = $doc.compatMode;
     allowedModes = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['CSS1Compat']);
     for (i = 0; i < allowedModes.length; ++i) {
     if ($equals_2(allowedModes[i], currentMode)) {
     return;
     }
     }
     allowedModes.length == 1 && $equals_2('CSS1Compat', allowedModes[0]) && $equals_2('BackCompat', currentMode)?"GWT no longer supports Quirks Mode (document.compatMode=' BackCompat').<br>Make sure your application's host HTML page has a Standards Mode (document.compatMode=' CSS1Compat') doctype,<br>e.g. by using &lt;!doctype html&gt; at the start of your application's HTML page.<br><br>To continue using this unsupported rendering mode and risk layout problems, suppress this message by adding<br>the following line to your*.gwt.xml module file:<br>&nbsp;&nbsp;&lt;extend-configuration-property name=\"document.compatMode\" value=\"" + currentMode + '"/&gt;':"Your *.gwt.xml module configuration prohibits the use of the current doucment rendering mode (document.compatMode=' " + currentMode + "').<br>Modify your application's host HTML page doctype, or update your custom 'document.compatMode' configuration property settings.";
     */
}

function $clinit_Timer(){
    $clinit_Timer = nullMethod;
    timers = new ArrayList_0;
    addCloseHandler(new Timer$1_0);
}

function $cancel(this$static){
    this$static.isRepeating?clearInterval_0(this$static.timerId):clearTimeout_0(this$static.timerId);
    $remove_4(timers, this$static);
}

function $schedule(this$static, delayMillis){
    if (delayMillis < 0) {
        throw new IllegalArgumentException_1('must be non-negative');
    }
    this$static.isRepeating?clearInterval_0(this$static.timerId):clearTimeout_0(this$static.timerId);
    $remove_4(timers, this$static);
    this$static.isRepeating = false;
    this$static.timerId = createTimeout(this$static, delayMillis);
    $add_4(timers, this$static);
}

function clearInterval_0(id){
    /*$wnd.*/clearInterval(id);
}

function clearTimeout_0(id){
    /*$wnd.*/clearTimeout(id);
}

function createTimeout(timer, delay){
    return /*$wnd.*/setTimeout($entry(function(){
            timer.fire();
        }
    ), delay);
}

defineSeed(52, 1, makeCastMap([Q$Timer]));
_.fire = function fire_0(){
    this.isRepeating || $remove_4(timers, this);
    this.run_0();
}
;
_.isRepeating = false;
_.timerId = 0;
var timers;
function $onClose(){
    while (($clinit_Timer() , timers).size > 0) {
        $cancel(dynamicCast($get_2(timers, 0), Q$Timer));
    }
}

function Timer$1_0(){
}

defineSeed(53, 1, makeCastMap([Q$CloseHandler, Q$EventHandler]), Timer$1_0);
function addCloseHandler(handler){
    maybeInitializeCloseHandlers();
    return addHandler(TYPE?TYPE:(TYPE = new GwtEvent$Type_0), handler);
}

function addHandler(type, handler){
    return $addHandler((!handlers_0 && (handlers_0 = new Window$WindowHandlers_0) , handlers_0), type, handler);
}

function maybeInitializeCloseHandlers(){
    if (!closeHandlersInitialized) {
        $initWindowCloseHandler();
        closeHandlersInitialized = true;
    }
}

function onClosed(){
    closeHandlersInitialized && fire((!handlers_0 && (handlers_0 = new Window$WindowHandlers_0) , handlers_0));
}

function onClosing(){
    var event_0;
    if (closeHandlersInitialized) {
        event_0 = new Window$ClosingEvent_0;
        !!handlers_0 && $fireEvent(handlers_0, event_0);
        return null;
    }
    return null;
}

var closeHandlersInitialized = false, handlers_0 = null;
function $clinit_Window$ClosingEvent(){
    $clinit_Window$ClosingEvent = nullMethod;
    TYPE_0 = new GwtEvent$Type_0;
}

function Window$ClosingEvent_0(){
    $clinit_Window$ClosingEvent();
}

defineSeed(55, 27, {}, Window$ClosingEvent_0);
_.dispatch = function dispatch_0(handler){
    throwClassCastExceptionUnlessNull(handler);
    null.nullMethod();
}
;
_.getAssociatedType = function getAssociatedType_0(){
    return TYPE_0;
}
;
var TYPE_0;
function Window$WindowHandlers_0(){
    this.eventBus = new HandlerManager$Bus_0;
    this.source = null;
}

defineSeed(56, 31, {}, Window$WindowHandlers_0);
function $initWindowCloseHandler(){
    /*var oldOnBeforeUnload = $wnd.onbeforeunload;
     var oldOnUnload = $wnd.onunload;
     $wnd.onbeforeunload = function(evt){
     var ret, oldRet;
     try {
     ret = $entry(onClosing)();
     }
     finally {
     oldRet = oldOnBeforeUnload && oldOnBeforeUnload(evt);
     }
     if (ret != null) {
     return ret;
     }
     if (oldRet != null) {
     return oldRet;
     }
     }
     ;
     $wnd.onunload = $entry(function(evt){
     try {
     closeHandlersInitialized && fire((!handlers_0 && (handlers_0 = new Window$WindowHandlers_0) , handlers_0));
     }
     finally {
     oldOnUnload && oldOnUnload(evt);
     $wnd.onresize = null;
     $wnd.onscroll = null;
     $wnd.onbeforeunload = null;
     $wnd.onunload = null;
     }
     }
     );*/
}

function $getRuntimeValue(){
    /*var ua = navigator.userAgent.toLowerCase();
     var makeVersion = function(result){
     return parseInt(result[1]) * 1000 + parseInt(result[2]);
     }
     ;
     if (function(){
     return ua.indexOf('opera') != -1;
     }
     ())
     return 'opera';
     if (function(){
     return ua.indexOf('webkit') != -1;
     }
     ())
     return 'safari';
     if (function(){
     return ua.indexOf('msie') != -1 && $doc.documentMode >= 9;
     }
     ())
     return 'ie9';
     if (function(){
     return ua.indexOf('msie') != -1 && $doc.documentMode >= 8;
     }
     ())
     return 'ie8';
     if (function(){
     var result = /msie ([0-9]+)\.([0-9]+)/.exec(ua);
     if (result && result.length == 3)
     return makeVersion(result) >= 6000;
     }
     ())
     return 'ie6';
     if (function(){
     return ua.indexOf('gecko') != -1;
     }
     ())
     return 'gecko1_8';
     return 'unknown';
     */
    return 'gecko1_8';
}

function SimpleEventBus$1_0(){
}

defineSeed(61, 1, {}, SimpleEventBus$1_0);
function SimpleEventBus$2_0(this$0, val$type, val$handler){
    this.this$0 = this$0;
    this.val$type = val$type;
    this.val$source = null;
    this.val$handler = val$handler;
}

defineSeed(62, 1, makeCastMap([Q$SimpleEventBus$Command]), SimpleEventBus$2_0);
_.this$0 = null;
_.val$handler = null;
_.val$source = null;
_.val$type = null;
function $get(this$static, dst, offset, size){
    var dstIndex, src, srcIndex;
    src = this$static.array;
    srcIndex = offset;
    dstIndex = 0;
    while (dstIndex < size) {
        dst[dstIndex++] = src[srcIndex++] << 24 >> 24;
    }
}

function $getBytes(this$static){
    var dst;
    dst = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, this$static.remaining(), 1);
    $get(this$static, dst, this$static.position, this$static.remaining());
    return dst;
}

function $getBytes_0(this$static, size){
    return this$static.getBytes(size);
}

function $getString(this$static, cs){
    return this$static.getString(cs);
}

function $limit(this$static, newLimit){
    this$static.limit = newLimit;
}

function $position(this$static, newPosition){
    this$static.position = newPosition;
}

function $put(this$static, v){
    return this$static.put(v);
}

function $putAt(this$static, i, v){
    return this$static.putAt(i, v);
}

function $putBytes(this$static, v){
    return this$static.putBytes(v);
}

function $putInt(this$static, v){
    return this$static.putInt(v);
}

function $putIntAt(this$static, i, v){
    return this$static.putIntAt(i, v);
}

function $putShort(this$static, v){
    return this$static.putShort(v);
}

function $putShortAt(this$static, i, v){
    return this$static.putShortAt(i, v);
}

function $putString(this$static, v, cs){
    return this$static.putString(v, cs);
}

function $putUnsignedShort(this$static, v){
    return this$static.putUnsignedShort(v);
}

function allocate(capacity){
    return new /*$wnd.*/ByteBuffer.allocate(capacity);
}

function wrap(bytes){
    return /*$wnd.*/ByteBuffer.wrap(bytes);
}

function $clinit_Charset(){
    $clinit_Charset = nullMethod;
    UTF8 = getUTF8();
}

function $decode(this$static, body){
    return this$static.decode(body);
}

function $decode_0(bytes){
    var buffer;
    buffer = allocate(bytes.length);
    buffer.putBytesAt(0, bytes);
    return $decode(UTF8, buffer);
}

function $encode(this$static, text, body){
    return this$static.encode(text, body);
}

function getUTF8(){
    $clinit_Charset();
    return /*$wnd.*/Charset.UTF8;
}

var UTF8;
function $getDataAsByteBuffer(this$static){
    if (this$static.data.byteLength) {
        var u = new Uint8Array(this$static.data);
        var bytes = [];
        for (var i = 0; i < u.byteLength; i++) {
            bytes.push(u[i]);
        }
        return new /*$wnd.*/ByteBuffer(bytes);
    }
    else {
        return this$static.data;
    }
}

function URI_0(location_0){
    this.location_0 = location_0;
}

defineSeed(67, 1, {}, URI_0);
_.toString$ = function toString_5(){
    return this.location_0;
}
;
_.location_0 = null;
function $addCloseHandler(this$static, handler){
    this$static.closeHandler = handler;
}

function $addMessageHandler(this$static, handler){
    this$static.messageHandler = handler;
}

function $addOpenHandler(this$static, handler){
    this$static.openHandler = handler;
}

function $send(this$static, data){
    $send_0(this$static.peer_0, data);
}

function WebSocket_0(factory, URL, protocols){
    this.peer_0 = createWebSocket(this, factory, URL, protocols);
}

function WebSocket_1(URL, protocols){
    this.peer_0 = create_2(this, URL, protocols);
}

defineSeed(68, 1, {}, WebSocket_0, WebSocket_1);
_.handleClose = function handleClose(event_0){
    !!this.closeHandler && $onClose_3(this.closeHandler, new WebSocket$CloseEvent_0(event_0));
}
;
_.handleError = function handleError(){
}
;
_.handleMessage = function handleMessage(event_0){
    !!this.messageHandler && $onMessage_1(this.messageHandler, new WebSocket$MessageEvent_0(event_0));
}
;
_.handleOpen = function handleOpen(){
    !!this.openHandler && $onOpen_0(this.openHandler);
}
;
_.closeHandler = null;
_.messageHandler = null;
_.openHandler = null;
_.peer_0 = null;
function WebSocket$CloseEvent_0(ev){
    this.event_0 = ev;
}

defineSeed(69, 1, {}, WebSocket$CloseEvent_0);
_.event_0 = null;
function WebSocket$MessageEvent_0(event_0){
    this.event_0 = event_0;
}

defineSeed(70, 1, {}, WebSocket$MessageEvent_0);
_.event_0 = null;
function WebSocketException_0(reason){
    Exception_0.call(this, reason);
}

defineSeed(71, 7, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), WebSocketException_0);
function $setDefaultConnectTimeout(this$static, timeout){
    return this$static.setDefaultConnectTimeout(timeout);
}

function $binaryType(this$static, newBinaryType){
    typeof WebSocketFactory == 'function' || newBinaryType != 'bytebuffer'?(this$static.binaryType = newBinaryType):(this$static.binaryType = 'arraybuffer');
}

function $send_0(this$static, data){
    typeof WebSocketFactory == 'function'?this$static.send(data):this$static.send(data.getArrayBuffer(data.remaining()));
}

function create_1(proxy, URL, protocols){
    var $this;
    try {
        protocols === null || protocols === undefined?($this = new /*$wnd.*/WebSocket(URL)):($this = new /*$wnd.*/WebSocket(URL, protocols));
    }
    catch (e) {
        throw new function(reason){
            return new WebSocketException_0(reason);
        }
        (e.message);
    }
    $this.onopen = function(headers){
        proxy.handleOpen();
    }
    ;
    $this.onmessage = function(event_0){
        proxy.handleMessage(event_0);
    }
    ;
    $this.onclose = function(event_0){
        proxy.handleClose(event_0);
    }
    ;
    $this.onerror = function(event_0){
        proxy.handleError();
    }
    ;
    return $this;
}

function create_2(proxy, URL, protocols){
    var i, protocolJsArray;
    protocolJsArray = null;
    if (protocols != null) {
        protocolJsArray = [];
        for (i = 0; i < protocols.length; ++i) {
            protocolJsArray[protocolJsArray.length] = protocols[i];
        }
    }
    return create_1(proxy, URL, protocolJsArray);
}

function createWebSocket(proxy, factory, URL, protocol){
    var $this;
    try {
        protocol === null || protocol === undefined?($this = factory.createWebSocket(URL)):($this = factory.createWebSocket(URL, protocol));
    }
    catch (e) {
        throw new function(reason){
            return new WebSocketException_0(reason);
        }
        (e.message);
    }
    $this.onopen = function(headers){
        proxy.handleOpen();
    }
    ;
    $this.onmessage = function(event_0){
        proxy.handleMessage(event_0);
    }
    ;
    $this.onclose = function(event_0){
        proxy.handleClose(event_0);
    }
    ;
    $this.onerror = function(event_0){
        proxy.handleError();
    }
    ;
    return $this;
}

function AlreadyFulfilledFutureException_0(){
    RuntimeException_0.call(this, 'An internal error caused a Future to be fulfilled more than once');
}

defineSeed(74, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), AlreadyFulfilledFutureException_0);
function JMSException_0(reason){
    Exception_0.call(this, reason);
    this.linkedException_0 = null;
}

function JMSException_1(reason){
    Exception_0.call(this, reason);
    this.simplifiedMessage = reason;
    this.linkedException_0 = null;
}

defineSeed(76, 7, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), JMSException_0, JMSException_1);
_.getMessage_0 = function getMessage_1(){
    return this.simplifiedMessage != null?this.simplifiedMessage:this.linkedException_0?this.linkedException_0.getMessage_0():this.detailMessage;
}
;
_.linkedException_0 = null;
_.simplifiedMessage = null;
function IllegalStateException_0(reason){
    JMSException_0.call(this, reason);
}

defineSeed(75, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), IllegalStateException_0);
function InvalidDestinationException_0(reason){
    JMSException_0.call(this, reason);
}

defineSeed(77, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), InvalidDestinationException_0);
function JMSSecurityException_0(){
    JMSException_0.call(this, 'Authentication failed');
}

defineSeed(78, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), JMSSecurityException_0);
function MessageEOFException_0(){
    JMSException_0.call(this, 'Reached end of BytesMessage');
}

defineSeed(79, 76, makeCastMap([Q$JMSException, Q$MessageEOFException, Q$Serializable, Q$Exception, Q$Throwable]), MessageEOFException_0);
function MessageFormatException_0(reason){
    JMSException_0.call(this, reason);
}

defineSeed(80, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), MessageFormatException_0);
function MessageNotReadableException_0(){
    JMSException_0.call(this, 'Buffer is in write-only mode');
}

defineSeed(81, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), MessageNotReadableException_0);
function MessageNotWriteableException_0(reason){
    JMSException_0.call(this, reason);
}

defineSeed(82, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), MessageNotWriteableException_0);
function TransactionRolledBackException_0(reason){
    JMSException_0.call(this, reason);
}

defineSeed(83, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), TransactionRolledBackException_0);
function $fulfill(future, value){
    future.value = value;
    future.callback && future.callback();
}

function $throwException(future, e){
    future.exception = e;
    future.callback && future.callback();
}

function ConnectionFutureCallback_0(future){
    this.connectionFuture = future;
}

defineSeed(84, 1, {}, ConnectionFutureCallback_0);
_.onException_1 = function onException(e){
    $throwException(this.connectionFuture, wrapException_0(e, getSimpleClassName(e), e.simplifiedMessage != null?e.simplifiedMessage:e.linkedException_0?e.linkedException_0.getMessage_0():e.detailMessage));
}
;
_.onReturn = function onReturn(value){
    $fulfill(this.connectionFuture, new /*$wnd.*/Connection(peer(value)));
}
;
_.connectionFuture = null;
function $processException(exceptionListener, e){
    exceptionListener.onException(e);
}

function ExceptionListener_0(exceptionListener){
    this.exceptionListener = exceptionListener;
}

defineSeed(85, 1, {}, ExceptionListener_0);
_.onException_0 = function onException_0(e){
    DEBUG && log_0('ExceptionListener.onException');
    $processException(this.exceptionListener, wrapException_0(e, getSimpleClassName(e), e.simplifiedMessage != null?e.simplifiedMessage:e.linkedException_0?e.linkedException_0.getMessage_0():e.detailMessage));
}
;
_.exceptionListener = null;
function connectionClose(connection, futureCallback){
    DEBUG && log_0('connection.close()');
    return $close_2(connection, futureCallback);
}

function connectionGetExceptionListener(connection){
    DEBUG && log_0('connection.getExceptionListener()');
    return connection.exceptionListener;
}

function connectionSetExceptionListener(connection, listener){
    DEBUG && log_0('connection.setExceptionListener()');
    connection.exceptionListener = listener;
}

function connectionStart(connection, futureCallback){
    DEBUG && log_0('connection.start()');
    return $checkOpen(connection) , connection.startFuture = new VoidFuture_0(futureCallback) , $schedule(new JmsConnection$1_0(connection), 1) , connection.startFuture;
}

function connectionStop(connection, futureCallback){
    DEBUG && log_0('connection.stop()');
    return $checkOpen(connection) , connection.stopFuture = new VoidFuture_0(futureCallback) , $schedule(new JmsConnection$2_0(connection), 1) , connection.stopFuture;
}

function consumerSetMessageListener(consumer, listener){
    DEBUG && log_0('consumer.setMessageListener()');
    consumer.setMessageListener_0(listener);
}

function createConnection_0(connectionFactory, username, password, clientID, futureCallback){
    var conn, handler, startStopHandler, concentrator, connectionFuture;
    DEBUG && log_0('createConnection()');
    DEBUG && log_0('user: ' + username);
    return conn = new JmsConnection_0(clientID) ,
        handler = new JmsHandlerImpl_0(username, password, clientID) ,
        startStopHandler = new GenericStartStopHandlerImpl_0 ,
        concentrator = new GenericConcentratorImpl_0 ,
        concentrator.nextListener = startStopHandler ,
        startStopHandler.nextProcessor = concentrator ,
        handler.nextProcessor = startStopHandler ,
        $setListener_0(handler.nextProcessor, handler) ,
        conn.startStopHandler = startStopHandler ,
        startStopHandler.startStopListener = conn ,
        conn.concentrator = concentrator ,
        concentrator.exceptionListener = conn ,
        handler.exceptionListener = conn ,
        $setJmsConnectionFactory(conn, new JmsConnectionFactory$1_0(connectionFactory, handler, conn)) ,
        connectionFuture = new ConnectionFuture_0(futureCallback) ,
        $connect_0(conn, new JmsConnectionFactory$2_0(connectionFuture, conn)) ,
        connectionFuture;
}

function createSession(connection, transacted, acknowledgeMode){
    DEBUG && log_0('createSession(' + transacted + ',' + acknowledgeMode + ')');
    return $createSession(connection, transacted, acknowledgeMode);
}

function getBodyLength(message){
    DEBUG && log_0('bytesMessage.getBodyLength()');
    return $checkReadable(message) , toInt(fromInt(message.initialSize));
}

function getBytes(mapMessage, name_0){
    var bytes, i, numberArray;
    bytes = $getBytes_1(mapMessage, name_0);
    numberArray = [];
    for (i = 0; i < bytes.length; ++i) {
        numberArray[numberArray.length] = bytes[i];
    }
    return numberArray;
}

function getJMSExpiration(message){
    return toDouble(message.getJMSExpiration_0());
}

function getJMSTimestamp(message){
    return toDouble(message.getJMSTimestamp_0());
}

function getLong(mapMessage, name_0){
    var longValue;
    longValue = $getLong(mapMessage, name_0);
    return toDouble(longValue);
}

function getLongProperty(message, name_0){
    var longValue;
    longValue = message.getLongProperty_0(name_0);
    return toDouble(longValue);
}

function getMapEntryNames(mapMessage){
    var mapNames, name_0, names;
    names = [];
    mapNames = $getMapNames(mapMessage);
    while (mapNames.val$names.val$outerIter.hasNext()) {
        name_0 = toString__devirtual$($next_0(mapNames.val$names));
        names[names.length] = name_0;
    }
    return names;
}

function getObject(mapMessage, name_0){
    var obj;
    obj = $getObject(mapMessage, name_0);
    return obj == null?null:(getClass__devirtual$(obj).modifiers & 4) != 0 && getClass__devirtual$(obj).componentType == B_classLit?getBytes(mapMessage, name_0):getClass__devirtual$(obj) == Ljava_lang_Character_2_classLit?valueOf_4(dynamicCast(obj, Q$Character).value_0):obj;
}

function getSimpleClassName(o){
    var className, index;
    className = o.___clazz$.typeName;
    index = className.lastIndexOf('.');
    return $substring(className, index + 1);
}

function getTimeToLive(producer){
    return $checkClosed(producer) , toDouble(producer.defaultTimeToLive);
}

INTERNAL_PROTOTYPE = function(){
    return 'INTERNAL_PROTOTYPE';
}
;
INTERNAL_PEER = function(){
    return 'INTERNAL_PEER';
}
;
var DEFAULT_RECONNECT_ATTEMPTS_MAX = -1;
var DEFAULT_RECONNECT_DELAY = 3000;
var DEFAULT_SHUTDOWN_DELAY = 5000;
var DEFAULT_CONNECTION_TIMEOUT = 5000;
peer = function(v){
    v.isPeer = INTERNAL_PEER;
    return v;
}
;
function notImplemented(){
    throw new JSJMSException('Not implemented', 'UnsupportOperationException');
}

function isPeer(v){
    return v === INTERNAL_PROTOTYPE || v !== null && 'isPeer' in v && v.isPeer === INTERNAL_PEER;
}

function isString(v){
    return v !== null && (typeof v == 'string' || v instanceof String);
}

function isStringOrNull(v){
    return v === null || isString(v);
}

function isBoolean(v){
    return typeof v == 'boolean' || v instanceof Boolean;
}

function isInt(v){
    return (typeof v == 'number' || v instanceof Number) && Math.floor(v) === v;
}

function isByte(v){
    return isInt(v);
}

function isShort(v){
    return isInt(v);
}

function isLong(v){
    return isInt(v);
}

function isNumber(v){
    return typeof v == 'number' || v instanceof Number;
}

function isChar(v){
    return isString(v) && v.length <= 1;
}

function isFunction(v){
    return typeof v == 'function';
}

function isFunctionOrNull(v){
    return v === null || typeof v == 'function';
}

function isObject(v){
    return v !== null && typeof v == 'object';
}

function isObjectOrNull(v){
    return v === null || isObject(v);
}

function isArray(v){
    return v !== null && typeof v == 'object' && typeof v.length == 'number';
}

function isNullOrUndefined(v){
    return v === null || v === undefined;
}

function isException(v){
    return v instanceof Error;
}

var ExpectString = {check:isString, type:'String'};
var ExpectStringOrNull = {check:isStringOrNull, type:'String or null'};
var ExpectBoolean = {check:isBoolean, type:'Boolean'};
var ExpectInt = {check:isInt, type:'Number (int)'};
var ExpectByte = {check:isByte, type:'Number (byte)'};
var ExpectShort = {check:isShort, type:'Number (short)'};
var ExpectLong = {check:isLong, type:'Number (long)'};
var ExpectNumber = {check:isNumber, type:'Number'};
var ExpectFloat = ExpectNumber;
var ExpectDouble = ExpectNumber;
var ExpectChar = {check:isChar, type:'Char (string of length 1)'};
var ExpectFunction = {check:isFunction, type:'Function'};
var ExpectFunctionOrNull = {check:isFunctionOrNull, type:'Function or null'};
var ExpectObject = {check:isObject, type:'Object'};
var ExpectObjectOrNull = {check:isObjectOrNull, type:'Object or null'};
var ExpectArray = {check:isArray, type:'Array'};
var ExpectException = {check:isException, type:'Exception'};
function ExpectRange(x, y){
    return {check:function(v){
        return isInt(v) && x <= v && v <= y;
    }
        , type:'Number (int in the range ' + x + '-' + y + ')'};
}

;
var ExpectExceptionListenerArg = {check:function(x){
    return x === null || isFunction(x) || x instanceof /*$wnd.*/ExceptionListener;
}
    , type:'Function or instance of ExceptionListener or null'};
var ExpectMessageListenerArg = {check:function(x){
    return x === null || isFunction(x) || x instanceof /*$wnd.*/MessageListener;
}
    , type:'Function or instance of MessageListener or null'};
var ExpectMessage = {check:function(x){
    return x !== null && x instanceof /*$wnd.*/Message;
}
    , type:'Message'};
var ExpectDestination = {check:function(x){
    return x !== null && x instanceof /*$wnd.*/Destination;
}
    , type:'Destination or null'};
var ExpectDestinationOrNull = {check:function(x){
    return x === null || x instanceof /*$wnd.*/Destination;
}
    , type:'Destination or null'};
var ExpectTopic = {check:function(x){
    return x !== null || x instanceof /*$wnd.*/Topic;
}
    , type:'Topic'};
var ExpectDeliveryMode = {check:function(x){
    return x === /*$wnd.*/DeliveryMode.NON_PERSISTENT || x === /*$wnd.*/DeliveryMode.PERSISTENT;
}
    , type:'DeliveryMode.PERSISTENT or DeliveryMode.NON_PERSISTENT'};
var ExpectAckMode = {check:ExpectRange(0, 3).check, type:'Session.AUTO_ACKNOWLEDGE, Session.CLIENT_ACKNOWLEDGE, Session.DUPS_OK_ACKNOWLEDGE, or Session.SESSION_TRANSACTED'};
var ExpectPriority = ExpectRange(0, 9);
function illegalArg(message){
    throw new /*$wnd.*/JMSException(message, 'IllegalArgumentException');
}

function checkArgsFail(methodName, actualArgs){
    illegalArg('Wrong number of arguments to ' + methodName);
}

function checkArgs(methodName, actualArgs){
    var expectedArgs = Array.prototype.slice.call(arguments, 2);
    expectedArgs.length !== actualArgs.length && illegalArg('Wrong number of arguments to ' + methodName);
    for (var i = 0; i < actualArgs.length; i++) {
        var expectedArg = expectedArgs[i];
        var actualArg = actualArgs[i];
        !expectedArg.check(actualArg) && illegalArg('Wrong type of argument to ' + methodName + ' in parameter ' + i + ': should be ' + expectedArg.type);
    }
}

function checkConstructor(className, alternative){
    var alternativeClause = alternative?': Use ' + alternative + ' instead':'';
    throw new Error('Client applications should not call constructor for ' + className + ' directly' + alternativeClause);
}

function log(message){
    !isString(message) && illegalArg('Log requires a string parameter');
    trace(message);
}

function wrapException(e){
    if (e instanceof Error) {
        return e;
    }
    else {
        return wrapException_0(e, getSimpleClassName(e), e.getMessage_0());
    }
}

function createURI(location_0){
    try {
        return new URI_0(location_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}

function JSJMSException(message, type, errorCode, linkedException){
    this.message = message;
    this.type = type || 'JMSException';
    this.errorCode = errorCode;
    this.linkedException = linkedException;
}

JSJMSException.prototype = new Error('Unknown JMSException');
/*$wnd.*/JMSException = JSJMSException;
JSJMSException.prototype.getMessage = function(){
    checkArgs('JMSException.getMessage()', arguments);
    return this.message;
}
;
JSJMSException.prototype.getType = function(){
    checkArgs('JMSException.getType()', arguments);
    return this.type;
}
;
JSJMSException.prototype.toString = function(){
    checkArgs('JMSException.toString()', arguments);
    return this.type + ': ' + this.message;
}
;
JSJMSException.prototype.getErrorCode = function(){
    checkArgs('JMSException.getErrorCode()', arguments);
    return this.errorCode;
}
;
JSJMSException.prototype.getLinkedException = function(){
    checkArgs('JMSException.getLinkedException()', arguments);
    return this.linkedException;
}
;
JSJMSException.prototype.setLinkedException = function(ex){
    checkArgs('JMSException.setLinkedException()', arguments, ExpectException);
    this.linkedException = ex;
}
;
function JSVoidFuture(callback){
    checkArgs('VoidFuture constructor', arguments, ExpectFunctionOrNull);
    this.callback = callback;
}

JSVoidFuture.prototype.checkError = function(){
    checkArgs('VoidFuture.checkError()', arguments);
    if (this.exception !== undefined) {
        throw this.exception;
    }
    else if (this.value !== null) {
        throw new $wnd.JMSException('Unfulfilled Future', 'UnfulfilledFutureException');
    }
}
;
function JSConnectionFuture(callback){
    checkArgs('ConnectionFuture constructor', arguments, ExpectFunctionOrNull);
    this.callback = callback;
}

JSConnectionFuture.prototype.getValue = function() {
    checkArgs('ConnectionFuture.getValue()', arguments);
    if (this.value !== undefined) {
        return this.value;
    }
    else if (this.exception !== undefined) {
        throw this.exception;
    }
    else {
        throw new /*$wnd.*/JMSException('Unfulfilled Future', 'UnfulfilledFutureException');
    }
};

function JmsConnectionFactory(location) {
    this.location = location;
    var connectionTimeout = DEFAULT_CONNECTION_TIMEOUT;
    var shutdownDelay = DEFAULT_SHUTDOWN_DELAY;
    var reconnectDelay = DEFAULT_RECONNECT_DELAY;
    var reconnectAttemptsMax = DEFAULT_RECONNECT_ATTEMPTS_MAX;
    var properties = (properties_0 = new JmsConnectionProperties_0 , properties_0.connectionTimeout_0 = connectionTimeout , properties_0.shutdownDelay_0 = shutdownDelay , properties_0.reconnectDelay_0 = reconnectDelay , properties_0.reconnectAttemptsMax_0 = reconnectAttemptsMax , properties_0);
    this.peer = new JmsConnectionFactory_1(location, properties);
}

/*$wnd.*/JmsConnectionFactory.init = function($this, location_0, webSocketFactory, connectionProperties){
    var properties_0;
    checkArgs('JmsConnectionFactory init', arguments, ExpectObject, ExpectString, ExpectObjectOrNull, ExpectObject);
    if (!$this.initialized) {
        try {
            $this.initialized = true;
            $this.location = location_0;
            var uri = createURI(location_0);
            $this.peer = new JmsConnectionFactory_0(uri);
            var invalidParameters = [];
            var connectionTimeout = connectionProperties.connectionTimeout;
            var shutdownDelay = connectionProperties.shutdownDelay;
            var reconnectDelay = connectionProperties.reconnectDelay;
            var reconnectAttemptsMax = connectionProperties.reconnectAttemptsMax;
            isNullOrUndefined(connectionTimeout)?(connectionTimeout = DEFAULT_CONNECTION_TIMEOUT):!isInt(connectionTimeout) && invalidParameters.push('connectionTimeout must be an integer');
            isNullOrUndefined(shutdownDelay)?(shutdownDelay = DEFAULT_SHUTDOWN_DELAY):!isInt(shutdownDelay) && invalidParameters.push('shutdownDelay must be an integer');
            isNullOrUndefined(reconnectDelay)?(reconnectDelay = DEFAULT_RECONNECT_DELAY):!isInt(reconnectDelay) && invalidParameters.push('reconnectDelay must be an integer');
            isNullOrUndefined(reconnectAttemptsMax)?(reconnectAttemptsMax = DEFAULT_RECONNECT_ATTEMPTS_MAX):!isInt(reconnectAttemptsMax) && invalidParameters.push('reconnectAttemptsMax must be an integer');
            if (invalidParameters.length > 0) {
                throw new Error(invalidParameters.join(', '));
            }
            var properties = (properties_0 = new JmsConnectionProperties_0 , properties_0.connectionTimeout_0 = connectionTimeout , properties_0.shutdownDelay_0 = shutdownDelay , properties_0.reconnectDelay_0 = reconnectDelay , properties_0.reconnectAttemptsMax_0 = reconnectAttemptsMax , properties_0);
            $this.peer = new JmsConnectionFactory_1(uri, properties);
            $this.peer.setWebSocketFactory(webSocketFactory);
        }
        catch (e) {
            throw wrapException(e);
        }
    }
}
;
/*$wnd.*/JmsConnectionFactory.prototype.createConnection = function(){

    var callback_0 = arguments[0];
    return createConnection(this, null, null, null, callback_0);

    function createConnection($this, username, password, clientID, callback){
        try {
            var future = new JSConnectionFuture(callback);
            var futureCallback = new ConnectionFutureCallback_0(future);
            var connFuture = createConnection_0($this.peer, username, password, clientID, futureCallback);
            return future;
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
function JSConnection(peer_0){
    !isPeer(peer_0) && checkConstructor('Connection', 'JmsConnectionFactory.createConnection()');
    this.peer = peer_0;
}

/*$wnd.*/Connection = JSConnection;
function JSConnectionMetaData(peer_0){
    !isPeer(peer_0) && checkConstructor('ConnectionMetaData', 'Connection.getMetaData()');
    this.peer = peer_0;
}

/*$wnd.*/ConnectionMetaData = JSConnectionMetaData;
function JSEnumeration(peer_0){
    !isPeer(peer_0) && checkConstructor('Enumeration');
    this.peer = peer_0;
}

JSEnumeration.prototype.hasMoreElements = function(){
    checkArgs('Enumeration.hasMoreElements()', arguments);
    try {
        return this.peer.hasMoreElements_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSEnumeration.prototype.nextElement = function(){
    checkArgs('Enumeration.nextElement()', arguments);
    try {
        return this.peer.nextElement_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function JSExceptionListener(callback){
    checkArgs('ExceptionListener constructor', arguments, ExpectFunctionOrNull);
    this.onException = callback;
}

/*$wnd.*/ExceptionListener = JSExceptionListener;
JSConnection.prototype.getClientID = function(){
    checkArgs('Connection.getClientID()', arguments);
    try {
        return this.peer.getClientID_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.setClientID = function(clientID){
    checkArgs('Connection.setClientID()', arguments, ExpectString);
    try {
        this.peer.setClientID_0(clientID);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.getMetaData = function(){
    checkArgs('Connection.getMetaData()', arguments);
    try {
        var val = this.peer.getMetaData_0();
        return new /*$wnd.*/ConnectionMetaData(peer(val));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.createConnectionConsumer = notImplemented;
JSConnection.prototype.createDurableConnectionConsumer = notImplemented;
JSConnection.prototype.getExceptionListener = function(){
    checkArgs('Connection.getExceptionListener()', arguments);
    try {
        return connectionGetExceptionListener(this.peer);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.setExceptionListener = function(val){
    checkArgs('Connection.setExceptionListener()', arguments, ExpectExceptionListenerArg);
    try {
        var listener = isFunction(val)?new /*$wnd.*/ExceptionListener(val):val;
        var exceptionListener = new ExceptionListener_0(listener);
        connectionSetExceptionListener(this.peer, exceptionListener);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.start = function(callback){
    checkArgs('Connection.start()', arguments, ExpectFunctionOrNull);
    try {
        var future = new JSVoidFuture(callback);
        var futureCallback = new VoidFutureCallback_0(future);
        var voidFuture = connectionStart(this.peer, futureCallback);
        return future;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.stop = function(callback){
    checkArgs('Connection.stop()', arguments, ExpectFunctionOrNull);
    try {
        var future = new JSVoidFuture(callback);
        var futureCallback = new VoidFutureCallback_0(future);
        var voidFuture = connectionStop(this.peer, futureCallback);
        return future;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.close = function(callback){
    checkArgs('Connection.close()', arguments, ExpectFunctionOrNull);
    try {
        var future = new JSVoidFuture(callback);
        var futureCallback = new VoidFutureCallback_0(future);
        var voidFuture = connectionClose(this.peer, futureCallback);
        return future;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnection.prototype.createSession = function(transacted, ackMode){
    checkArgs('Connection.createSession()', arguments, ExpectBoolean, ExpectAckMode);
    try {
        var session = createSession(this.peer, transacted, ackMode);
        return new /*$wnd.*/Session(peer(session));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getJMSVersion = function(){
    checkArgs('ConnectionMetaData.getJMSVersion()', arguments);
    try {
        return this.peer.getJMSVersion_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getJMSMajorVersion = function(){
    checkArgs('ConnectionMetaData.getJMSMajorVersion()', arguments);
    try {
        return this.peer.getJMSMajorVersion_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getJMSMinorVersion = function(){
    checkArgs('ConnectionMetaData.getJMSMinorVersion()', arguments);
    try {
        return this.peer.getJMSMinorVersion_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getJMSProviderName = function(){
    checkArgs('ConnectionMetaData.getJMSProviderName()', arguments);
    try {
        return this.peer.getJMSProviderName_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getProviderVersion = function(){
    checkArgs('ConnectionMetaData.getProviderVersion()', arguments);
    try {
        return this.peer.getProviderVersion_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getProviderMajorVersion = function(){
    checkArgs('ConnectionMetaData.getProviderMajorVersion()', arguments);
    try {
        return this.peer.getProviderMajorVersion_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getProviderMinorVersion = function(){
    checkArgs('ConnectionMetaData.getProviderMinorVersion()', arguments);
    try {
        return this.peer.getProviderMinorVersion_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSConnectionMetaData.prototype.getJMSXPropertyNames = function(){
    checkArgs('ConnectionMetaData.getJMSXPropertyNames()', arguments);
    try {
        var val = this.peer.getJMSXPropertyNames_0();
        return new JSEnumeration(peer(val));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function wrapDestination(val){
    if (val === null) {
        return null;
    }
    else {
        return instanceOf(val, Q$TemporaryTopic)?wrapTemporaryTopic(dynamicCast(val, Q$TemporaryTopic)):instanceOf(val, Q$TemporaryQueue)?wrapTemporaryQueue(dynamicCast(val, Q$TemporaryQueue)):instanceOf(val, Q$Topic)?wrapTopic(dynamicCast(val, Q$Topic)):instanceOf(val, Q$Queue)?wrapQueue(dynamicCast(val, Q$Queue)):null;
    }
}

function JSDestination(peer_0){
    !isPeer(peer_0) && checkConstructor('Destination', 'Session.createTopic(), createQueue(), createTemporaryTopic(), or createTemporaryQueue()');
    this.peer = peer_0;
}

/*$wnd.*/Destination = JSDestination;
function JSTopic(peer_0){
    !isPeer(peer_0) && checkConstructor('Topic', 'Session.createTopic()');
    this.peer = peer_0;
}

JSTopic.prototype = new JSDestination(INTERNAL_PROTOTYPE);
/*$wnd.*/Topic = JSTopic;
JSTopic.prototype.getTopicName = function(){
    checkArgs('Topic.getTopicName()', arguments);
    try {
        return this.peer.getTopicName_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSTopic.prototype.toString = function(){
    checkArgs('Topic.toString()', arguments);
    return 'Topic ' + this.getTopicName();
}
;
function JSTemporaryTopic(peer_0){
    !isPeer(peer_0) && checkConstructor('TemporaryTopic', 'Session.createTemporaryTopic()');
    this.peer = peer_0;
}

JSTemporaryTopic.prototype = new JSTopic(INTERNAL_PROTOTYPE);
/*$wnd.*/TemporaryTopic = JSTemporaryTopic;
JSTemporaryTopic.prototype.deleteTopic = function(){
    checkArgs('TemporaryTopic.deleteTopic()', arguments);
    try {
        this.peer.delete_$();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function JSQueue(peer_0){
    !isPeer(peer_0) && checkConstructor('Queue', 'Session.createQueue()');
    this.peer = peer_0;
}

JSQueue.prototype = new JSDestination(INTERNAL_PROTOTYPE);
/*$wnd.*/Queue = JSQueue;
JSQueue.prototype.getQueueName = function(){
    checkArgs('Queue.getQueueName()', arguments);
    try {
        return this.peer.getQueueName_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSQueue.prototype.toString = function(){
    checkArgs('Queue.toString()', arguments);
    return 'Queue ' + this.getQueueName();
}
;
function JSTemporaryQueue(peer_0){
    !isPeer(peer_0) && checkConstructor('TemporaryQueue', 'Session.createTemporaryQueue()');
    this.peer = peer_0;
}

JSTemporaryQueue.prototype = new JSQueue(INTERNAL_PROTOTYPE);
/*$wnd.*/TemporaryQueue = JSTemporaryQueue;
JSTemporaryQueue.prototype.deleteQueue = function(){
    checkArgs('TemporaryQueue.deleteQueue()', arguments);
    try {
        this.peer.delete_$();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
/*$wnd.*/DeliveryMode = {NON_PERSISTENT:1, PERSISTENT:2};
function JSMessage(peer_0){
    !isPeer(peer_0) && checkConstructor('Message', 'Session.createMessage()');
    this.peer = peer_0;
}

/*$wnd.*/Message = JSMessage;
/*$wnd.*/Message.DEFAULT_DELIVERY_MODE = /*$wnd.*/DeliveryMode.PERSISTENT;
/*$wnd.*/Message.DEFAULT_PRIORITY = 4;
/*$wnd.*/Message.DEFAULT_TIME_TO_LIVE = Number(0);
JSMessage.prototype.getJMSMessageID = function(){
    checkArgs('Message.getJMSMessageID()', arguments);
    try {
        return this.peer.getJMSMessageID_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSMessageID = function(id){
    checkArgs('Message.setJMSMessageID()', argumnets, ExpectStringOrNull);
    try {
        this.peer.setJMSMessageID_0(id);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSTimestamp = function(){
    checkArgs('Message.getJMSTimestamp()', arguments);
    try {
        return getJMSTimestamp(this.peer);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSTimestamp = function(timestamp){
    checkArgs('Message.setJMSTimestamp()', arguments, ExpectLong);
    try {
        setJMSTimestamp(this.peer, timestamp);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSCorrelationID = function(){
    checkArgs('Message.getJMSCorrelationID()', arguments);
    try {
        return this.peer.getJMSCorrelationID_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSCorrelationID = function(correlationID){
    checkArgs('Message.setJMSCorrelationID()', arguments, ExpectStringOrNull);
    try {
        this.peer.setJMSCorrelationID_0(correlationID);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSReplyTo = function(){
    checkArgs('Message.getJMSReplyTo()', arguments);
    try {
        var val = this.peer.getJMSReplyTo_0();
        return wrapDestination(val);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSReplyTo = function(replyTo){
    checkArgs('Message.setJMSReplyTo()', arguments, ExpectDestinationOrNull);
    try {
        this.peer.setJMSReplyTo_0(replyTo !== null?replyTo.peer:null);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSDestination = function(){
    checkArgs('Message.getJMSDestination()', arguments);
    try {
        var val = this.peer.getJMSDestination_0();
        return wrapDestination(val);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSDestination = function(destination){
    checkArgs('Message.setJMSDestination()', arguments, ExpectDestinationOrNull);
    try {
        this.peer.setJMSDestination_0(destination.peer);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSDeliveryMode = function(){
    checkArgs('Message.getJMSDeliveryMode()', arguments);
    try {
        return this.peer.getJMSDeliveryMode_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSDeliveryMode = function(deliveryMode){
    checkArgs('Message.setJMSDeliveryMode()', arguments, ExpectDeliveryMode);
    try {
        this.peer.setJMSDeliveryMode_0(deliveryMode);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSRedelivered = function(){
    checkArgs('Message.getJMSRedelivered()', arguments);
    try {
        return this.peer.getJMSRedelivered_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSRedelivered = function(redelivered){
    checkArgs('Message.setJMSRedelivered()', arguments, ExpectBoolean);
    try {
        this.peer.setJMSRedelivered_0(redelivered);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSType = function(){
    checkArgs('Message.getJMSType()', arguments);
    try {
        return this.peer.getJMSType_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSType = function(type){
    checkArgs('Message.setJMSType()', arguments, ExpectStringOrNull);
    try {
        this.peer.setJMSType_0(type);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSExpiration = function(){
    checkArgs('Message.getJMSExpiration()', arguments);
    try {
        return getJMSExpiration(this.peer);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSExpiration = function(expiration){
    checkArgs('Message.setJMSExpiration()', arguments, ExpectLong);
    try {
        setJMSExpiration(this.peer, expiration);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getJMSPriority = function(){
    checkArgs('Message.getJMSPriority()', arguments);
    try {
        return this.peer.getJMSPriority_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setJMSPriority = function(priority){
    checkArgs('Message.setJMSPriority()', arguments, ExpectPriority);
    try {
        this.peer.setJMSPriority_0(priority);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.clearProperties = function(){
    checkArgs('Message.clearProperties()', arguments);
    try {
        this.peer.clearProperties_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.propertyExists = function(name_0){
    checkArgs('Message.propertyExists()', arguments, ExpectString);
    try {
        return this.peer.propertyExists_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getStringProperty = function(name_0){
    checkArgs('Message.getStringProperty()', arguments, ExpectString);
    try {
        return this.peer.getStringProperty_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setStringProperty = function(name_0, value){
    checkArgs('Message.setStringProperty()', arguments, ExpectString, ExpectStringOrNull);
    try {
        this.peer.setStringProperty_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getPropertyNames = function(){
    checkArgs('Message.getPropertyNames()', arguments);
    try {
        var val = this.peer.getPropertyNames_0();
        return new JSEnumeration(peer(val));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.acknowledge = function(){
    checkArgs('Message.acknowledge()', arguments);
    try {
        this.peer.acknowledge_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.clearBody = function(){
    checkArgs('Message.clearBody()', arguments);
    try {
        this.peer.clearBody_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getBooleanProperty = function(name_0){
    checkArgs('Message.getBooleanProperty()', arguments, ExpectString);
    try {
        return this.peer.getBooleanProperty_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getByteProperty = function(name_0){
    checkArgs('Message.getByteProperty()', arguments, ExpectString);
    try {
        return this.peer.getByteProperty_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getShortProperty = function(name_0){
    checkArgs('Message.getShortProperty()', arguments, ExpectString);
    try {
        return this.peer.getShortProperty_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getIntProperty = function(name_0){
    checkArgs('Message.getIntProperty()', arguments, ExpectString);
    try {
        return this.peer.getIntProperty_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getLongProperty = function(name_0){
    checkArgs('MapMessage.getLongProperty()', arguments, ExpectString);
    try {
        return getLongProperty(this.peer, name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getFloatProperty = function(name_0){
    checkArgs('Message.getFloatProperty()', arguments, ExpectString);
    try {
        return this.peer.getFloatProperty_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getDoubleProperty = function(name_0){
    checkArgs('Message.getDoubleProperty()', arguments, ExpectString);
    try {
        return this.peer.getDoubleProperty_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.getObjectProperty = function(name_0){
    checkArgs('Message.getObjectProperty()', arguments, ExpectString);
    try {
        var value = this.peer.getObjectProperty_0(name_0);
        if (value == null) {
            return null;
        }
        else if (isBoolean_0(value)) {
            if (value) {
                return new Boolean(true);
            }
            return new Boolean;
        }
        else if (isNumber_0(value)) {
            return new Number(value);
        }
        else if (typeof value == 'string') {
            return new String(value);
        }
        else {
            return value;
        }
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setBooleanProperty = function(name_0, value){
    checkArgs('Message.setBooleanProperty()', arguments, ExpectString, ExpectBoolean);
    try {
        this.peer.setBooleanProperty_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setByteProperty = function(name_0, value){
    checkArgs('Message.setByteProperty()', arguments, ExpectString, ExpectByte);
    try {
        this.peer.setByteProperty_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setShortProperty = function(name_0, value){
    checkArgs('Message.setShortProperty()', arguments, ExpectString, ExpectShort);
    try {
        this.peer.setShortProperty_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setIntProperty = function(name_0, value){
    checkArgs('Message.setIntProperty()', arguments, ExpectString, ExpectInt);
    try {
        this.peer.setIntProperty_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setLongProperty = function(name_0, value){
    checkArgs('Message.setLongProperty()', arguments, ExpectString, ExpectLong);
    try {
        setLongProperty(this.peer, name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setFloatProperty = function(name_0, value){
    checkArgs('Message.setFloatProperty()', arguments, ExpectString, ExpectFloat);
    try {
        this.peer.setFloatProperty_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setDoubleProperty = function(name_0, value){
    checkArgs('Message.setDoubleProperty()', arguments, ExpectString, ExpectDouble);
    try {
        this.peer.setDoubleProperty_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessage.prototype.setObjectProperty = function(name_0, value){
    try {
        if (!isString(name_0)) {
            illegalArg('name should not be empty or null');
            return;
        }
        value === null?this.peer.setObjectProperty_0(name_0, value):isBoolean(value)?this.peer.setBooleanProperty_0(name_0, value.valueOf()):isString(value)?this.peer.setStringProperty_0(name_0, value):isNumber(value)?this.peer.setDoubleProperty_0(name_0, value.valueOf()):illegalArg('value should be either Boolean, Number, String');
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function JSTextMessage(peer_0){
    !isPeer(peer_0) && checkConstructor('TextMessage', 'Session.createTextMessage()');
    this.peer = peer_0;
}

JSTextMessage.prototype = new JSMessage(INTERNAL_PROTOTYPE);
/*$wnd.*/TextMessage = JSTextMessage;
JSTextMessage.prototype.setText = function(val){
    checkArgs('TextMessage.setText()', arguments, ExpectStringOrNull);
    try {
        this.peer.setText_0(val);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSTextMessage.prototype.getText = function(){
    checkArgs('TextMessage.getText()', arguments);
    try {
        return this.peer.getText_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function JSBytesMessage(peer_0){
    !isPeer(peer_0) && checkConstructor('BytesMessage', 'Session.createBytesMessage()');
    this.peer = peer_0;
}

JSBytesMessage.prototype = new JSMessage(INTERNAL_PROTOTYPE);
/*$wnd.*/BytesMessage = JSBytesMessage;
JSBytesMessage.prototype.getBodyLength = function(){
    checkArgs('BytesMessage.getBodyLength()', arguments);
    try {
        return getBodyLength(this.peer);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readBoolean = function(){
    checkArgs('BytesMessage.readBoolean()', arguments);
    try {
        return this.peer.readBoolean_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readByte = function(){
    checkArgs('BytesMessage.readByte()', arguments);
    try {
        return this.peer.readByte_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readUnsignedByte = function(){
    checkArgs('BytesMessage.readUnsignedByte()', arguments);
    try {
        return this.peer.readUnsignedByte_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readShort = function(){
    checkArgs('BytesMessage.readShort()', arguments);
    try {
        return this.peer.readShort_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readUnsignedShort = function(){
    checkArgs('BytesMessage.readUnsignedShort()', arguments);
    try {
        return this.peer.readUnsignedShort_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readChar = function(){
    checkArgs('BytesMessage.readChar()', arguments);
    try {
        var c = this.peer.readChar_0();
        return String.fromCharCode(c);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readInt = function(){
    checkArgs('BytesMessage.readInt()', arguments);
    try {
        return this.peer.readInt_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readLong = notImplemented;
JSBytesMessage.prototype.readFloat = notImplemented;
JSBytesMessage.prototype.readDouble = notImplemented;
JSBytesMessage.prototype.readUTF = function(){
    checkArgs('BytesMessage.readUTF()', arguments);
    try {
        return this.peer.readUTF_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.readBytes = function(value_0, len_0){
    var numargs = arguments.length;
    if (numargs == 1) {
        checkArgs('BytesMessage.readBytes()', arguments, ExpectArray);
        return readBytes(this, value_0, this.getBodyLength());
    }
    else if (numargs == 2) {
        checkArgs('BytesMessage.readBytes()', arguments, ExpectArray, ExpectInt);
        return readBytes(this, value_0, len_0);
    }
    else {
        checkArgsFail('BytesMessage.readBytes()', arguments);
    }
    function readBytes($this, value, len){
        try {
            return readBytes_0($this.peer, value, len);
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
JSBytesMessage.prototype.writeBoolean = function(value){
    checkArgs('BytesMessage.writeBoolean()', arguments, ExpectBoolean);
    try {
        this.peer.writeBoolean_0(value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.writeByte = function(value){
    checkArgs('BytesMessage.writeByte()', arguments, ExpectByte);
    try {
        this.peer.writeByte_0(value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.writeShort = function(value){
    checkArgs('BytesMessage.writeShort()', arguments, ExpectShort);
    try {
        this.peer.writeShort_0(value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.writeChar = function(value){
    checkArgs('BytesMessage.writeChar()', arguments, ExpectChar);
    try {
        var c = value.charCodeAt(0);
        this.peer.writeChar_0(c);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.writeInt = function(value){
    checkArgs('BytesMessage.writeInt()', arguments, ExpectInt);
    try {
        this.peer.writeInt_0(value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.writeLong = notImplemented;
JSBytesMessage.prototype.writeFloat = notImplemented;
JSBytesMessage.prototype.writeDouble = notImplemented;
JSBytesMessage.prototype.writeUTF = function(value){
    checkArgs('BytesMessage.writeUTF()', arguments, ExpectString);
    try {
        this.peer.writeUTF_0(value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSBytesMessage.prototype.writeBytes = function(value_0, offset_0, len_0){
    var numargs = arguments.length;
    if (numargs == 1) {
        checkArgs('BytesMessage.writeBytes()', arguments, ExpectArray);
        return writeBytes(this, value_0, 0, value_0.length);
    }
    else if (numargs == 3) {
        checkArgs('BytesMessage.writeBytes()', arguments, ExpectArray, ExpectInt, ExpectInt);
        return writeBytes(this, value_0, offset_0, len_0);
    }
    else {
        checkArgsFail('BytesMessage.writeBytes()', arguments);
    }
    function writeBytes($this, value, offset, len){
        try {
            writeBytes_0($this.peer, value, offset, len);
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
JSBytesMessage.prototype.writeObject = notImplemented;
JSBytesMessage.prototype.reset = function(){
    checkArgs('BytesMessage.reset()', arguments);
    try {
        this.peer.reset_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function JSMapMessage(peer_0){
    !isPeer(peer_0) && checkConstructor('MapMessage', 'Session.createMapMessage()');
    this.peer = peer_0;
}

JSMapMessage.prototype = new JSMessage(INTERNAL_PROTOTYPE);
/*$wnd.*/MapMessage = JSMapMessage;
JSMapMessage.prototype.getBoolean = function(name_0){
    checkArgs('MapMessage.getBoolean()', arguments, ExpectString);
    try {
        return this.peer.getBoolean_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getByte = function(name_0){
    checkArgs('MapMessage.getByte()', arguments, ExpectString);
    try {
        return this.peer.getByte_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getShort = function(name_0){
    checkArgs('MapMessage.getShort()', arguments, ExpectString);
    try {
        return this.peer.getShort_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getChar = function(name_0){
    checkArgs('MapMessage.getChar()', arguments, ExpectString);
    try {
        var c = this.peer.getChar_0(name_0);
        return String.fromCharCode(c);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getInt = function(name_0){
    checkArgs('MapMessage.getInt()', arguments, ExpectString);
    try {
        return this.peer.getInt_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getLong = function(name_0){
    checkArgs('MapMessage.getLong()', arguments, ExpectString);
    try {
        return getLong(this.peer, name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getFloat = function(name_0){
    checkArgs('MapMessage.getFloat()', arguments, ExpectString);
    try {
        return this.peer.getFloat_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getDouble = function(name_0){
    checkArgs('MapMessage.getDouble()', arguments, ExpectString);
    try {
        return this.peer.getDouble_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getString = function(name_0){
    checkArgs('MapMessage.getString()', arguments, ExpectString);
    try {
        return this.peer.getString_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getBytes = function(name_0){
    checkArgs('MapMessage.getBytes()', arguments, ExpectString);
    try {
        return getBytes(this.peer, name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getObject = function(name_0){
    checkArgs('MapMessage.getObject()', arguments, ExpectString);
    try {
        var value = getObject(this.peer, name_0);
        if (value == null) {
            return null;
        }
        else if (isBoolean_0(value)) {
            if (value) {
                return new Boolean;
            }
            return new Boolean;
        }
        else if (isNumber_0(value)) {
            return new Number(value);
        }
        else if (typeof value == 'string') {
            return new String(value);
        }
        else {
            return value;
        }
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.getMapNames = function(){
    checkArgs('MapMessage.getMapNames()', arguments);
    try {
        var names = getMapEntryNames(this.peer);
        var nameStringArray = new Array;
        for (var key in names) {
            nameStringArray.push(String(names[key]));
        }
        return nameStringArray;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setBoolean = function(name_0, value){
    checkArgs('MapMessage.setBoolean()', arguments, ExpectString, ExpectBoolean);
    try {
        this.peer.setBoolean_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setByte = function(name_0, value){
    checkArgs('MapMessage.setByte()', arguments, ExpectString, ExpectByte);
    try {
        this.peer.setByte_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setShort = function(name_0, value){
    checkArgs('MapMessage.setShort()', arguments, ExpectString, ExpectShort);
    try {
        this.peer.setShort_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setChar = function(name_0, value){
    checkArgs('MapMessage.setChar()', arguments, ExpectString, ExpectChar);
    try {
        var c = value.charCodeAt(0);
        this.peer.setChar_0(name_0, c);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setInt = function(name_0, value){
    checkArgs('MapMessage.setInt()', arguments, ExpectString, ExpectInt);
    try {
        this.peer.setInt_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setLong = function(name_0, value){
    checkArgs('MapMessage.setLong()', arguments, ExpectString, ExpectLong);
    try {
        setLong(this.peer, name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setFloat = function(name_0, value){
    checkArgs('MapMessage.setFloat()', arguments, ExpectString, ExpectFloat);
    try {
        this.peer.setFloat_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setDouble = function(name_0, value){
    checkArgs('MapMessage.setDouble()', arguments, ExpectString, ExpectDouble);
    try {
        this.peer.setDouble_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setString = function(name_0, value){
    checkArgs('MapMessage.setString()', arguments, ExpectString, ExpectStringOrNull);
    try {
        this.peer.setString_0(name_0, value);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.setBytes = function(name_1, value_0, offset_0, len_0){
    var numargs = arguments.length;
    if (numargs == 2) {
        checkArgs('MapMessage.setBytes()', arguments, ExpectString, ExpectArray);
        setBytes(this, name_1, value_0, 0, value_0.length);
    }
    else if (numargs == 4) {
        checkArgs('MapMessage.setBytes()', arguments, ExpectString, ExpectArray, ExpectInt, ExpectInt);
        setBytes(this, name_1, value_0, offset_0, len_0);
    }
    else {
        checkArgsFail('MapMessage.setBytes()', arguments);
    }
    function setBytes($this, name_0, value, offset, len){
        try {
            setBytes_0($this.peer, name_0, value, offset, len);
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
JSMapMessage.prototype.setObject = function(name_0, value){
    try {
        if (!isString(name_0)) {
            illegalArg('name should not be empty or null');
            return;
        }
        value === null?this.peer.setObject_0(name_0, value):isBoolean(value)?this.peer.setBoolean_0(name_0, value.valueOf()):isString(value)?this.peer.setString_0(name_0, value):isNumber(value)?this.peer.setDouble_0(name_0, value.valueOf()):isArray(value)?setBytes_0(this.peer, name_0, value, 0, value.length):illegalArg('value should be either Boolean, Number, String or Array');
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMapMessage.prototype.itemExists = function(name_0){
    checkArgs('MapMessage.itemExists()', arguments, ExpectString);
    try {
        return this.peer.itemExists_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function JSSession(peer_0){
    !isPeer(peer_0) && checkConstructor('Session', 'Connection.createSession()');
    this.peer = peer_0;
}

/*$wnd.*/Session = JSSession;
/*$wnd.*/Session.AUTO_ACKNOWLEDGE = 1;
/*$wnd.*/Session.CLIENT_ACKNOWLEDGE = 2;
/*$wnd.*/Session.DUPS_OK_ACKNOWLEDGE = 3;
/*$wnd.*/Session.SESSION_TRANSACTED = 0;
JSSession.prototype.createMessage = function(){
    checkArgs('Session.createMessage()', arguments);
    try {
        var ret = this.peer.createMessage_0();
        return new /*$wnd.*/Message(peer(ret));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.createTextMessage = function(text_0){
    var numargs = arguments.length;
    if (numargs == 0) {
        return createTextMessage(this, null);
    }
    else if (numargs == 1) {
        checkArgs('Session.createTextMessage()', arguments, ExpectString);
        return createTextMessage(this, text_0);
    }
    else {
        checkArgsFail('Session.createTextMessage()', arguments);
    }
    function createTextMessage($this, text){
        try {
            var ret = $this.peer.createTextMessage_0(text);
            return new /*$wnd.*/TextMessage(peer(ret));
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
JSSession.prototype.createBytesMessage = function(){
    checkArgs('Session.createBytesMessage()', arguments);
    try {
        var ret = this.peer.createBytesMessage_0();
        return new /*$wnd.*/BytesMessage(peer(ret));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.getTransacted = function(){
    checkArgs('Session.getTransacted()', arguments);
    try {
        return this.peer.getTransacted_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.getAcknowledgeMode = function(){
    checkArgs('Session.getAcknowledgeMode()', arguments);
    try {
        return this.peer.getAcknowledgeMode_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.close = function(callback){
    checkArgs('Session.close()', arguments, ExpectFunctionOrNull);
    try {
        var future = new JSVoidFuture(callback);
        var futureCallback = new VoidThrowsJMSExceptionFutureCallback_0(future);
        var voidFuture = sessionClose(this.peer, futureCallback);
        return future;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.commit = function(callback){
    checkArgs('Session.commit()', arguments, ExpectFunctionOrNull);
    try {
        var future = new JSVoidFuture(callback);
        var futureCallback = new VoidThrowsJMSExceptionFutureCallback_0(future);
        var voidFuture = sessionCommit(this.peer, futureCallback);
        return future;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.rollback = function(callback){
    checkArgs('Session.rollback()', arguments, ExpectFunctionOrNull);
    log('session.rollback()');
    try {
        var future = new JSVoidFuture(callback);
        this.peer.rollback_0();
        setTimeout(function(){
                future.callback();
            }
            , 0);
        return future;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.recover = function(){
    checkArgs('Session.recover()', arguments);
    log('session.recover()');
    try {
        this.peer.recover_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.getMessageListener = function(){
    checkArgs('Session.getMessageListener()', arguments);
    try {
        var messageListener = this.peer.getMessageListener_0();
        return messageListener.messageListener;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.setMessageListener = function(val){
    checkArgs('Session.setMessageListener()', arguments, ExpectMessageListenerArg);
    var listener = isFunction(val)?new /*$wnd.*/MessageListener(val):val;
    try {
        var messageListener = new MessageListener_0(listener);
        sessionSetMessageListener(this.peer, messageListener);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.run = notImplemented;
JSSession.prototype.createProducer = function(){
    var numargs = arguments.length;
    if (numargs == 0) {
        return createProducer(this, null);
    }
    else if (numargs == 1) {
        checkArgs('Session.createProducer()', arguments, ExpectDestinationOrNull);
        var destination_0 = arguments[0];
        return createProducer(this, destination_0);
    }
    else {
        checkArgsFail('Session.createProducer()', arguments);
    }
    function createProducer($this, destination){
        log('session.createProducer()');
        try {
            var ret = $this.peer.createProducer_0(destination?destination.peer:null);
            return new /*$wnd.*/MessageProducer(peer(ret));
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
JSSession.prototype.createConsumer = function(destination, messageSelector){
    if (typeof messageSelector == 'undefined') {
        checkArgs('Session.createConsumer()', arguments, ExpectDestination);
        log('session.createConsumer() - NOTE: connection must be started to receive messages');
        try {
            var ret = this.peer.createConsumer_0(destination.peer);
            return new /*$wnd.*/MessageConsumer(peer(ret));
        }
        catch (e) {
            throw wrapException(e);
        }
    }
    else if (typeof messageSelector == 'string') {
        checkArgs('Session.createConsumer()', arguments, ExpectDestination, ExpectString);
        log('session.createConsumer() - NOTE: connection must be started to receive messages');
        try {
            var ret = this.peer.createConsumer_1(destination.peer, messageSelector);
            return new /*$wnd.*/MessageConsumer(peer(ret));
        }
        catch (e) {
            throw wrapException(e);
        }
    }
}
;
JSSession.prototype.createQueue = function(name_0){
    checkArgs('Session.createQueue()', arguments, ExpectString);
    try {
        var ret = this.peer.createQueue_0(name_0);
        return new /*$wnd.*/Queue(peer(ret));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.createTopic = function(name_0){
    checkArgs('Session.createTopic()', arguments, ExpectString);
    try {
        var ret = this.peer.createTopic_0(name_0);
        return new /*$wnd.*/Topic(peer(ret));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.createDurableSubscriber = function(topic_0, durableName_0, messageSelector_0, noLocal_0){
    var numargs = arguments.length;
    if (numargs == 2) {
        checkArgs('Session.createDurableSubscriber()', arguments, ExpectTopic, ExpectString);
        return createDurableSubscriber(this, topic_0, durableName_0, null, false);
    }
    else if (numargs == 4) {
        checkArgs('Session.createDurableSubscriber()', arguments, ExpectTopic, ExpectString, ExpectString, ExpectBoolean);
        return createDurableSubscriber(this, topic_0, durableName_0, messageSelector_0, noLocal_0);
    }
    else {
        checkArgsFail('createDurableSubscriber()', arguments);
    }
    function createDurableSubscriber($this, topic, durableName, messageSelector, noLocal){
        try {
            var ret = $this.peer.createDurableSubscriber_0(topic.peer, durableName, messageSelector, noLocal);
            return new /*$wnd.*/TopicSubscriber(peer(ret));
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
JSSession.prototype.createTemporaryTopic = function(){
    checkArgs('Session.createTempoaryTopic()', arguments);
    try {
        var ret = this.peer.createTemporaryTopic_0();
        return new /*$wnd.*/TemporaryTopic(peer(ret));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.createTemporaryQueue = function(){
    checkArgs('Session.createTempoaryQueue()', arguments);
    try {
        var ret = this.peer.createTemporaryQueue_0();
        return new /*$wnd.*/TemporaryQueue(peer(ret));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.unsubscribe = function(name_0){
    checkArgs('Session.unsubscribe()', arguments, ExpectString);
    try {
        this.peer.unsubscribe_0(name_0);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.createMapMessage = function(){
    checkArgs('Session.createMapMessage()', arguments);
    try {
        var ret = this.peer.createMapMessage_0();
        return new /*$wnd.*/MapMessage(peer(ret));
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSSession.prototype.createObjectMessage = notImplemented;
JSSession.prototype.createStreamMessage = notImplemented;
JSSession.prototype.createBrowser = notImplemented;
function JSMessageConsumer(peer_0){
    !isPeer(peer_0) && checkConstructor('MessageConsumer', 'Session.createConsumer()');
    this.peer = peer_0;
}

/*$wnd.*/MessageConsumer = JSMessageConsumer;
function JSTopicSubscriber(peer_0){
    !isPeer(peer_0) && checkConstructor('TopicSubscriber', 'Session.createDurableSubscriber()');
    this.peer = peer_0;
}

/*$wnd.*/TopicSubscriber = JSTopicSubscriber;
JSTopicSubscriber.prototype = new JSMessageConsumer(INTERNAL_PROTOTYPE);
function JSMessageListener(callback){
    checkArgs('MessageListener constructor', arguments, ExpectFunctionOrNull);
    this.onMessage = callback;
}

/*$wnd.*/MessageListener = JSMessageListener;
JSMessageConsumer.prototype.getMessageSelector = function(){
    checkArgs('MessageConsumer.getMessageSelector()', arguments);
    try {
        return this.peer.getMessageSelector_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageConsumer.prototype.getMessageListener = function(){
    checkArgs('MessageConsumer.getMessageListener()', arguments);
    try {
        var messageListener = this.peer.getMessageListener_0();
        return messageListener.messageListener;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageConsumer.prototype.setMessageListener = function(val){
    checkArgs('Session.setMessageListener()', arguments, ExpectMessageListenerArg);
    var listener = isFunction(val)?new /*$wnd.*/MessageListener(val):val;
    try {
        var messageListener = new MessageListener_0(listener);
        consumerSetMessageListener(this.peer, messageListener);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageConsumer.prototype.receiveNoWait = function(){
    checkArgs('MessageConsumer.receiveNoWait()', arguments);
    try {
        var val = this.peer.receiveNoWait_0();
        if (val === null) {
            return null;
        }
        return instanceOf(val, Q$TextMessage)?wrapTextMessage(dynamicCast(val, Q$TextMessage)):instanceOf(val, Q$BytesMessage)?wrapBytesMessage(dynamicCast(val, Q$BytesMessage)):instanceOf(val, Q$MapMessage)?wrapMapMessage(dynamicCast(val, Q$MapMessage)):wrapGenericMessage(val);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageConsumer.prototype.receive = notImplemented;
JSMessageConsumer.prototype.close = function(callback){
    checkArgs('MessageConsumer.close()', arguments, ExpectFunctionOrNull);
    log('consumer.close()');
    try {
        var future = new JSVoidFuture(callback);
        var futureCallback = new VoidThrowsJMSExceptionFutureCallback_0(future);
        var voidFuture = messageConsumerClose(this.peer, futureCallback);
        return future;
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
function JSMessageProducer(peer_0){
    !isPeer(peer_0) && checkConstructor('MessageProducer', 'Session.createProducer()');
    this.peer = peer_0;
}

/*$wnd.*/MessageProducer = JSMessageProducer;
JSMessageProducer.prototype.setDeliveryMode = function(deliveryMode){
    checkArgs('MessageProducer.setDeliveryMode()', arguments, ExpectDeliveryMode);
    try {
        this.peer.setDeliveryMode_0(deliveryMode);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.getDeliveryMode = function(){
    checkArgs('MessageProducer.getDeliveryMode()', arguments);
    try {
        this.peer.getDeliveryMode_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.setPriority = function(defaultPriority){
    checkArgs('MessageProducer.setPriority()', arguments, ExpectPriority);
    try {
        this.peer.setPriority_0(defaultPriority);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.getPriority = function(){
    checkArgs('MessageProducer.getPriority()', arguments);
    try {
        this.peer.getPriority_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.setTimeToLive = function(timeToLive){
    checkArgs('MessageProducer.setTimeToLive()', arguments, ExpectLong);
    try {
        setTimeToLive(this.peer, timeToLive);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.getTimeToLive = function(){
    checkArgs('MessageProducer.getTimeToLive()', arguments);
    try {
        return getTimeToLive(this.peer);
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.getDestination = function(){
    checkArgs('MessageProducer.getDestination()', arguments);
    try {
        this.peer.getDestination_0();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.send = function(){
    var numargs = arguments.length;
    if (numargs == 1) {
        var msg_0 = arguments[0];
        var deliveryMode_0 = this.peer.getDeliveryMode_0();
        var priority_0 = this.peer.getPriority_0();
        var timeToLive_0 = getTimeToLive(this.peer);
        send(this, null, msg_0, deliveryMode_0, priority_0, timeToLive_0);
    }
    else if (numargs == 2) {
        var destination_0 = arguments[0];
        var msg_0 = arguments[1];
        var deliveryMode_0 = this.peer.getDeliveryMode_0();
        var priority_0 = this.peer.getPriority_0();
        var timeToLive_0 = getTimeToLive(this.peer);
        send(this, destination_0, msg_0, deliveryMode_0, priority_0, timeToLive_0);
    }
    else if (numargs == 4) {
        var msg_0 = arguments[0];
        var deliveryMode_0 = arguments[1];
        var priority_0 = arguments[2];
        var timeToLive_0 = arguments[3];
        send(this, null, msg_0, deliveryMode_0, priority_0, timeToLive_0);
    }
    else if (numargs == 5) {
        var destination_0 = arguments[0];
        var msg_0 = arguments[1];
        var deliveryMode_0 = arguments[2];
        var priority_0 = arguments[3];
        var timeToLive_0 = arguments[4];
        send(this, destination_0, msg_0, deliveryMode_0, priority_0, timeToLive_0);
    }
    else {
        checkArgsFail('MessageProducer.send()', arguments);
    }
    function send($this, destination, msg, deliveryMode, priority, timeToLive){
        try {
            send_0($this.peer, destination?destination.peer:null, msg.peer, deliveryMode, priority, timeToLive);
        }
        catch (e) {
            throw wrapException(e);
        }
    }

}
;
JSMessageProducer.prototype.close = function(){
    checkArgs('MessageProducer.close()', arguments);
    log('producer.close()');
    try {
        this.peer.close_1();
    }
    catch (e) {
        throw wrapException(e);
    }
}
;
JSMessageProducer.prototype.setDisableMessageID = notImplemented;
JSMessageProducer.prototype.getDisableMessageID = function(){
    checkArgs('MessageProducer.getDisableMessageID()', arguments);
    return false;
}
;
JSMessageProducer.prototype.setDisableMessageTimestamp = notImplemented;
JSMessageProducer.prototype.getDisableMessageTimestamp = function(){
    checkArgs('MessageProducer.getDisableMessageTimestamp()', arguments);
    return false;
}
;
function JSTracer(){
}

/*$wnd.*/Tracer = JSTracer;
JSTracer.setTrace = function(val){
    DEBUG = val;
}
;

function isBoolean_0(obj){
    if (getClass__devirtual$(obj) == Ljava_lang_Boolean_2_classLit) {
        return true;
    }
    return false;
}

function isNumber_0(obj){
    if (getClass__devirtual$(obj) == Ljava_lang_Byte_2_classLit || getClass__devirtual$(obj) == Ljava_lang_Short_2_classLit || getClass__devirtual$(obj) == Ljava_lang_Integer_2_classLit || getClass__devirtual$(obj) == Ljava_lang_Long_2_classLit || getClass__devirtual$(obj) == Ljava_lang_Double_2_classLit || getClass__devirtual$(obj) == Ljava_lang_Float_2_classLit) {
        return true;
    }
    return false;
}

function messageConsumerClose(consumer, futureCallback){
    DEBUG && log_0('consumer.close()');
    return consumer.close_0(futureCallback);
}

function readBytes_0(message, array, len){
    var b, i;
    for (i = 0; i < len; ++i) {
        try {
            b = $readByte(message);
            array[i] = b;
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$MessageEOFException)) {
                return i == 0?-1:i;
            }
            else
                throw $e0;
        }
    }
    return len;
}

function send_0(producer, destination, message, deliveryMode, priority, timeToLive, futureCallback){
    $send_1(producer, destination, message, deliveryMode, priority, fromDouble(timeToLive));
}

function sessionClose(session, futureCallback){
    DEBUG && log_0('session.close()');
    return $close_0(session, futureCallback);
}

function sessionCommit(session, futureCallback){
    DEBUG && log_0('session.commit()');
    return $commit(session, futureCallback);
}

function sessionSetMessageListener(session, listener){
    DEBUG && log_0('session.setMessageListener()');
    $checkClosed_0(session);
    $checkMustBeNonTransacted(session);
    session.messageListener = listener;
}

function setBytes_0(message, name_0, array, offset, len){
    var b, bytes, i;
    bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, len, 1);
    for (i = 0; i < len; ++i) {
        b = round_int(array[offset + i]) << 24 >> 24;
        bytes[i] = b;
    }
    $setItem(message, name_0, bytes);
}

function setJMSExpiration(message, expiration){
    message.setJMSExpiration_0(fromDouble(expiration));
}

function setJMSTimestamp(message, timestamp){
    message.setJMSTimestamp_0(fromDouble(timestamp));
}

function setLong(mapMessage, name_0, value){
    var longValue;
    longValue = fromDouble(value);
    $setLong(mapMessage, name_0, longValue);
}

function setLongProperty(message, name_0, value){
    var longValue;
    longValue = fromDouble(value);
    message.setLongProperty_0(name_0, longValue);
}

function setTimeToLive(producer, timeToLive){
    $setTimeToLive(producer, fromDouble(timeToLive));
}

function wrapBytesMessage(message){
    return new /*$wnd.*/BytesMessage(peer(message));
}

function wrapException_0(e, className, message){
    var type = className || 'JMSException';
    (message === null || message === undefined) && (message = e.getMessage_0());
    return new /*$wnd.*/JMSException(message, type);
}

function wrapGenericMessage(message){
    return new /*$wnd.*/Message(peer(message));
}

function wrapMapMessage(message){
    return new /*$wnd.*/MapMessage(peer(message));
}

function wrapQueue(dest){
    return new /*$wnd.*/Queue(peer(dest));
}

function wrapTemporaryQueue(dest){
    return new /*$wnd.*/TemporaryQueue(peer(dest));
}

function wrapTemporaryTopic(dest){
    return new /*$wnd.*/TemporaryTopic(peer(dest));
}

function wrapTextMessage(message){
    return new /*$wnd.*/TextMessage(peer(message));
}

function wrapTopic(dest){
    return new /*$wnd.*/Topic(peer(dest));
}

function writeBytes_0(message, array, offset, len){
    var b, i;
    for (i = 0; i < len; ++i) {
        b = round_int(array[offset + i]) << 24 >> 24;
        $checkWritable(message);
        $put(message.buffer, b);
    }
}

function $onMessage(this$static, message){
    DEBUG && log_0('MessageListener.onMessage');
    $processMessage(this$static.messageListener, instanceOf(message, Q$TextMessage)?wrapTextMessage(dynamicCast(message, Q$TextMessage)):instanceOf(message, Q$BytesMessage)?wrapBytesMessage(dynamicCast(message, Q$BytesMessage)):instanceOf(message, Q$MapMessage)?wrapMapMessage(dynamicCast(message, Q$MapMessage)):wrapGenericMessage(message));
}

function $processMessage(messageListener, message){
    messageListener.onMessage !== null && messageListener.onMessage(message);
}

function MessageListener_0(messageListener){
    this.messageListener = messageListener;
}

defineSeed(87, 1, {}, MessageListener_0);
_.messageListener = null;
function $fulfill_0(future){
    future.value = null;
    future.callback && future.callback();
}

function $onException(this$static, e){
    $throwException_0(this$static.voidFuture, wrapException_0(e, getSimpleClassName(e), null.nullMethod()));
}

function $onReturn(this$static){
    $fulfill_0(this$static.voidFuture);
}

function $throwException_0(future, e){
    future.exception = e;
    future.callback && future.callback();
}

function VoidFutureCallback_0(future){
    this.voidFuture = future;
}

defineSeed(88, 1, {}, VoidFutureCallback_0);
_.onException_1 = function onException_1(e){
    $onException(this, throwClassCastExceptionUnlessNull(e));
}
;
_.onReturn = function onReturn_0(value){
    $onReturn(this, throwClassCastExceptionUnlessNull(value));
}
;
_.voidFuture = null;
function $fulfill_1(future){
    future.callback && future.callback();
}

function $onException_0(this$static, e){
    $throwException_1(this$static.voidFuture, wrapException_0(e, getSimpleClassName(e), e.simplifiedMessage != null?e.simplifiedMessage:e.linkedException_0?e.linkedException_0.getMessage_0():e.detailMessage));
}

function $onReturn_0(this$static){
    $fulfill_1(this$static.voidFuture);
}

function $throwException_1(future, e){
    future.exception = e;
    future.callback && future.callback();
}

function VoidThrowsJMSExceptionFutureCallback_0(future){
    this.voidFuture = future;
}

defineSeed(89, 1, {}, VoidThrowsJMSExceptionFutureCallback_0);
_.onException_1 = function onException_2(e){
    $onException_0(this, e);
}
;
_.onReturn = function onReturn_1(value){
    $onReturn_0(this, throwClassCastExceptionUnlessNull(value));
}
;
_.voidFuture = null;
function $clinit_BumpCodecImpl(){
    $clinit_BumpCodecImpl = nullMethod;
    getUTF8();
}

function $decode_1(this$static, buffer){
    var frame;
    while (buffer.hasRemaining()) {
        frame = $decodeFrame(buffer);
        DEBUG && trace('onFrame: ' + $toString_0(frame));
        $onFrame(this$static.listener, frame);
    }
}

function $decodeFrame(buffer){
    var allHeaderNames, b, content_0, endPosition, extension, extensions, frame, frameLength, framecode, headerMask, headerMaskSize, headers, i, len, name_0, parameterLen, parameterStr, parameterStrBytes, parameters, properties, remainingBytes, val, version;
    b = buffer.get();
    framecode = ($clinit_BumpFrame$FrameCode() , $clinit_BumpFrame$FrameCode() , $VALUES)[b & 127];
    frameLength = getUtf8Integer(buffer);
    if (frameLength < 0 || frameLength > buffer.remaining()) {
        throw new BumpException_0("frame size doesn't match buffer");
    }
    endPosition = buffer.position + frameLength;
    frame = new BumpFrame_0(framecode);
    frame.excludeHeaderMask = b & 128;
    switch (framecode.ordinal) {
        case 8:
        case 32:
        case 16:
            $setHeader(frame, 'subscription', valueOf_1(getUtf8Integer(buffer)));
            $setHeader(frame, 'destination', getHeaderValue('destination', buffer));
            headerMask = buffer.getUnsignedShort();
            headerMaskSize = 15;
            break;
        case 9:
        case 33:
        case 17:
            $setSnapshotId(frame, getUtf8Integer(buffer));
            headerMask = buffer.getUnsignedShort();
            headerMaskSize = 15;
            break;
        case 10:
        case 34:
        case 18:
            $setSnapshotId(frame, getUtf8Integer(buffer));
            $setHeader(frame, 'subscription', valueOf_1(getUtf8Integer(buffer)));
            $setHeader(frame, 'destination', getHeaderValue('destination', buffer));
            headerMask = buffer.getUnsignedShort();
            headerMaskSize = 15;
            break;
        case 30:
        case 42:
        case 36:
            headerMask = buffer.getUnsignedShort();
            headerMaskSize = 15;
            break;
        case 12:
            version = buffer.get();
            if (version != 1) {
                throw new BumpException_0('Protocol error: the version - ' + version + ' is not supported');
            }

        default:headerMask = buffer.get();
            headerMaskSize = 7;
    }
    frame.excludeHeaderMask != 0 && $setExcludeHeaderMask(frame, buffer.getUnsignedShort());
    if (headerMask != 0) {
        frame.headerMask = headerMask;
        headers = frame.headers;
        allHeaderNames = ($clinit_BumpFrame() , FrameHeaderNames)[framecode.ordinal];
        for (i = 0; i < allHeaderNames.length; ++i) {
            if ((headerMask & 1 << headerMaskSize - i) > 0) {
                name_0 = allHeaderNames[i];
                if ($equals_2('priority', name_0)) {
                    b = buffer.get();
                    headers.put_0('priority', valueOf((b & 15) << 24 >> 24));
                    headers.put_0('persistent', ($clinit_Boolean() , (b & 16) > 0?TRUE:FALSE));
                    headers.put_0('redelivered', (b & 32) > 0?TRUE:FALSE);
                }
                else if ($equals_2('items-dictionary', name_0)) {
                    val = new IndexedPropertiesContent_0;
                    decodePropertyContent(buffer, val, false);
                    frame.itemsDictionary = val;
                }
                else if ($equals_2('properties-dictionary', name_0)) {
                    val = new IndexedPropertiesContent_0;
                    decodePropertyContent(buffer, val, false);
                    frame.propertiesDictionary = val;
                }
                else {
                    headers.put_0(name_0, getHeaderValue(name_0, buffer));
                }
            }
        }
    }
    if (framecode == MESSAGE_BINARY_DELTA || framecode == MESSAGE_MAP_DELTA || framecode == MESSAGE_TEXT_DELTA) {
        remainingBytes = $getBytes_0(buffer, endPosition - buffer.position);
        $setBody(frame, /*$wnd.*/ByteBuffer.wrap(remainingBytes));
        return frame;
    }
    headerMaskSize == 15 && (headerMask & 8) > 0 && $setIndexedProperties(frame, decodeIndexPropertiesContent(buffer, frame.propertiesDictionary));
    if (headerMaskSize == 15 && (headerMask & 4) > 0) {
        content_0 = new JmsPropertiesContent_0;
        decodePropertyContent(buffer, content_0, true);
        frame.namedProperties = content_0;
    }
    headerMaskSize == 15 && (headerMask & 2) > 0 && $setIndexedItems(frame, decodeIndexPropertiesContent(buffer, frame.itemsDictionary));
    if (headerMaskSize == 15 && (headerMask & 1) > 0) {
        if (framecode.name_0.indexOf('MAP') != -1) {
            properties = new JmsPropertiesContent_0;
            decodePropertyContent(buffer, properties, true);
            frame.namedItems = properties;
        }
        else {
            len = getUtf8Integer(buffer);
            $setBody(frame, wrap(buffer.getBytes(len)));
        }
    }
    if (framecode == ERROR && (headerMask & 1) > 0) {
        len = getUtf8Integer(buffer);
        $setBody(frame, wrap(buffer.getBytes(len)));
    }
    if (buffer.position < endPosition) {
        len = getUtf8Integer(buffer);
        extensions = frame.extensions;
        for (i = 0; i < len; ++i) {
            extension = ($clinit_JmsExtension() , Extensions)[buffer.get()];
            parameterLen = getUtf8Integer(buffer);
            if (parameterLen > 0) {
                parameters = new HashMap_0;
                parameterStrBytes = buffer.getBytes(parameterLen);
                parameterStr = $decode_0(parameterStrBytes);
                parseParameters(parameterStr, parameters);
                extension.parameters = parameters;
            }
            $add_5(extensions, extension);
        }
    }
    if (buffer.position != endPosition) {
        throw new BumpException_0('BumpCodec.decode() Error: data size not match. buffer.position() = ' + buffer.position + ', but it should be ' + endPosition);
    }
    return frame;
}

function $encode_0(frame){
    var actualCapacityUptoHeaderMask, body, bodyLen, bodyLenBytes, buffer, estimatedCapacityUptoHeaderMask, extension, extension$iterator, extensionsCount, extensionsCountBytes, frameCode, framePayloadSize, framePayloadSizeBytes, headerMask, headerMaskBitPos, headerMaskCapacity, headerValue, headers, intLenBytes, isConnectFrame, key, key$array, key$index, key$max, len, lenBytes, mark, packedByte, parameterBytes, parameterLen, parameterLenBytes, parameterStr, persistent, strBytes, stringLen, stringLenBytes;
    headerMask = 0;
    frameCode = frame.framecode;
    isConnectFrame = frameCode == ($clinit_BumpFrame$FrameCode() , CONNECT);
    headerMaskCapacity = 1;
    headerMaskBitPos = 7;
    switch (frameCode.ordinal) {
        case 30:
        case 42:
        case 36:
            ++headerMaskCapacity;
            headerMaskBitPos = 15;
    }
    estimatedCapacityUptoHeaderMask = 7 + (isConnectFrame?1:0) + headerMaskCapacity;
    buffer = new /*$wnd.*/ByteBuffer.allocate(estimatedCapacityUptoHeaderMask);
    buffer.skip(estimatedCapacityUptoHeaderMask);
    headers = frame.headers;
    packedByte = 0;
    headers.containsKey('priority') && (packedByte = dynamicCast(!frame.headers?null:frame.headers.get_0('priority'), Q$Byte).value_0);
    if (headers.containsKey('persistent')) {
        persistent = dynamicCast(!frame.headers?null:frame.headers.get_0('persistent'), Q$Boolean);
        persistent.value_0 && (packedByte = (packedByte | 16) << 24 >> 24);
    }
    if (headers.containsKey('priority') || headers.containsKey('persistent')) {
        headerMask = 0 | 1 << headerMaskBitPos;
        buffer.put(packedByte);
    }
    if (!!frame.headers && frame.headers.size_0() != 0) {
        for (key$array = ($clinit_BumpFrame() , FrameHeaderNames)[frameCode.ordinal] , key$index = 0 , key$max = key$array.length; key$index < key$max; ++key$index) {
            key = key$array[key$index];
            if (headers.containsKey(key) && !$equals_2('priority', key)) {
                headerValue = !frame.headers?null:frame.headers.get_0(key);
                if (headerValue != null) {
                    headerMask = headerMask | 1 << headerMaskBitPos;
                    switch (dynamicCast($get_0(headerValueTypeMap, key), Q$BumpFrame$HeaderValueTypes).ordinal) {
                        case 0:
                            $put(buffer, dynamicCast(headerValue, Q$Byte).value_0);
                            break;
                        case 3:
                            $putInt(buffer, dynamicCast(headerValue, Q$Integer).value_0);
                            break;
                        case 4:
                            putLong(buffer, dynamicCast(headerValue, Q$Long).value_0);
                            break;
                        case 1:
                            len = dynamicCast(headerValue, Q$byte_$1).length;
                            lenBytes = encode(len);
                            buffer.putBytes(lenBytes);
                            len > 0 && $putBytes(buffer, dynamicCast(headerValue, Q$byte_$1));
                            break;
                        case 5:
                            strBytes = asUTF8EncodingBytes(toString__devirtual$(headerValue));
                            stringLen = strBytes.length;
                            stringLenBytes = encode(stringLen);
                            buffer.putBytes(stringLenBytes);
                            stringLen > 0 && buffer.putBytes(strBytes);
                            break;
                        case 2:
                            $put(buffer, dynamicCast(headerValue, Q$Boolean).value_0?49:48);
                            break;
                        case 8:
                            intLenBytes = encode(dynamicCast(headerValue, Q$Integer).value_0);
                            buffer.putBytes(intLenBytes);
                            break;
                        default:throw new IllegalArgumentException_1('unsupported header value type');
                    }
                }
            }
            --headerMaskBitPos;
        }
    }
    if (!!frame.namedProperties && frame.namedProperties.properties.size != 0) {
        headerMask = headerMask | 4;
        $encodePropertyContent(buffer, frame.namedProperties);
    }
    if (!!frame.namedItems && frame.namedItems.properties.size != 0) {
        headerMask = headerMask | 1;
        $encodePropertyContent(buffer, frame.namedItems);
    }
    if (frame.body) {
        headerMask = headerMask | 1;
        body = frame.body;
        bodyLen = body.remaining();
        bodyLenBytes = encode(bodyLen);
        buffer.putBytes(bodyLenBytes);
        buffer.putBuffer(body);
    }
    if (!!frame.extensions && frame.extensions.map.size_0() != 0) {
        extensionsCount = frame.extensions.map.size_0();
        extensionsCountBytes = encode(extensionsCount);
        buffer.putBytes(extensionsCountBytes);
        for (extension$iterator = $iterator($keySet(frame.extensions.map)); extension$iterator.val$outerIter.hasNext();) {
            extension = dynamicCast($next_0(extension$iterator), Q$JmsExtension);
            $put(buffer, extension.kind.ordinal << 24 >> 24);
            if (!!extension.parameters && extension.parameters.size_0() != 0) {
                parameterStr = encodeParameters(extension.parameters);
                parameterBytes = asUTF8EncodingBytes(parameterStr);
                parameterLen = parameterBytes.length;
                parameterLenBytes = encode(parameterLen);
                buffer.putBytes(parameterLenBytes);
                buffer.putBytes(parameterBytes);
            }
            else {
                buffer.put(0);
            }
        }
    }
    framePayloadSize = (isConnectFrame?1:0) + headerMaskCapacity + (buffer.position - estimatedCapacityUptoHeaderMask);
    framePayloadSizeBytes = encode(framePayloadSize);
    actualCapacityUptoHeaderMask = 1 + framePayloadSizeBytes.length + (isConnectFrame?1:0) + headerMaskCapacity;
    mark = estimatedCapacityUptoHeaderMask - actualCapacityUptoHeaderMask;
    buffer.position = mark;
    $put(buffer, frameCode.ordinal << 24 >> 24);
    buffer.putBytes(framePayloadSizeBytes);
    isConnectFrame && buffer.put(1);
    headerMaskCapacity == 2?buffer.putShort(headerMask << 16 >> 16):buffer.put(headerMask << 24 >> 24);
    buffer.position = mark;
    buffer = buffer.compact();
    DEBUG && trace('Encode Result: ' + buffer.getHexDump());
    return buffer;
}

function $encodePropertyContent(buffer, propertiesContent){
    var name_0, nameLength, nameLengthBytes, pTypeIndex, pTypePosition, pTypeSize, pTypes, prop, prop$iterator, properties, propertiesSize, propertiesSizeBytes, t, value, valueLength, valueLengthBytes;
    properties = propertiesContent.properties;
    propertiesSize = properties.size;
    if (propertiesSize == 0) {
        return;
    }
    propertiesSizeBytes = encode(propertiesSize);
    buffer.putBytes(propertiesSizeBytes);
    pTypePosition = buffer.position;
    pTypeSize = ~~((propertiesSize + 1) / 2);
    buffer.skip(pTypeSize);
    pTypes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, pTypeSize, 1);
    pTypeIndex = 0;
    for (prop$iterator = new AbstractList$IteratorImpl_0(properties); prop$iterator.i < prop$iterator.this$0_0.size_0();) {
        prop = dynamicCast($next(prop$iterator), Q$JmsPropertiesContent$Property);
        name_0 = prop.name_0;
        nameLength = name_0.remaining();
        nameLengthBytes = encode(nameLength);
        buffer.putBytes(nameLengthBytes);
        buffer.putBuffer(name_0);
        t = prop.type_0.dataTypeByte;
        pTypeIndex % 2 == 0?(pTypes[~~(pTypeIndex / 2)] = t << 4 << 24 >> 24):(pTypes[~~(pTypeIndex / 2)] = pTypes[~~(pTypeIndex / 2)] | t);
        ++pTypeIndex;
        if (prop.type_0 != ($clinit_JmsDataType() , NULL)) {
            value = prop.value_0;
            if (prop.type_0.getFixedLength() == -1) {
                valueLength = value.remaining();
                valueLengthBytes = encode(valueLength);
                buffer.putBytes(valueLengthBytes);
            }
            buffer.putBuffer(value);
        }
    }
    buffer.putBytesAt(pTypePosition, pTypes);
}

function BumpCodecImpl_0(){
    $clinit_BumpCodecImpl();
}

function decodeIndexPropertiesContent(buffer, dictionary){
    var bitPosition, contents, excludeMask, i, mask, property, type, valueByteArray, valueLength;
    contents = new HashMap_0;
    excludeMask = 0;
    if ($keySet(dictionary.indexes).val$entrySet.size_0() > 7) {
        bitPosition = 15;
        mask = buffer.getUnsignedShort();
        (mask & 1) > 0 && (excludeMask = buffer.getUnsignedShort());
    }
    else {
        bitPosition = 7;
        mask = buffer.get();
        (mask & 1) != 0 && (excludeMask = buffer.get());
    }
    for (i = 0; i < bitPosition; ++i) {
        if ((mask & 1 << bitPosition - i) != 0 && (excludeMask & 1 << bitPosition - i) != 0) {
            contents.put_0(valueOf(i), null);
        }
        else if ((mask & 1 << bitPosition - i) != 0 && (excludeMask & 1 << bitPosition - i) == 0) {
            property = dynamicCast(dictionary.indexes.get_0(valueOf(i)), Q$JmsPropertiesContent$Property);
            if (!property) {
                throw new BumpException_0('indexed item not found for index [' + i + ']');
            }
            type = property.type_0;
            if (type != ($clinit_JmsDataType() , NULL)) {
                valueLength = type.getFixedLength() == -1?getUtf8Integer(buffer):type.getFixedLength();
                if (valueLength > 0) {
                    valueByteArray = buffer.getBytes(valueLength);
                    contents.put_0(valueOf(i), /*$wnd.*/ByteBuffer.wrap(valueByteArray));
                }
                else {
                    contents.put_0(valueOf(i), new /*$wnd.*/ByteBuffer);
                }
            }
            else {
                contents.put_0(valueOf(i), null);
            }
        }
    }
    return contents;
}

function decodePropertyContent(buffer, stompPropertiesContent, includeValue){
    var b, i, index, len, name_0, size, types, value;
    size = getUtf8Integer(buffer);
    if (size == 0) {
        return;
    }
    types = initDim(_3Lcom_kaazing_gateway_jms_client_bump_JmsDataType_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$JmsDataType, size, 0);
    for (i = 0; i < ~~((size + 1) / 2); ++i) {
        b = buffer.get();
        setCheck(types, i * 2, ($clinit_JmsDataType() , TYPES)[(b & 240) >> 4 << 24 >> 24]);
        i * 2 < size - 1 && setCheck(types, i * 2 + 1, TYPES[(b & 15) << 24 >> 24]);
    }
    index = 0;
    for (i = 0; i < size; ++i) {
        instanceOf(stompPropertiesContent, Q$IndexedPropertiesContent) && (index = getUtf8Integer(buffer));
        len = getUtf8Integer(buffer);
        name_0 = wrap(buffer.getBytes(len));
        value = null;
        if (includeValue) {
            if (types[i] != ($clinit_JmsDataType() , NULL)) {
                len = types[i].getFixedLength();
                len == -1 && (len = getUtf8Integer(buffer));
                value = wrap(buffer.getBytes(len));
            }
        }
        instanceOf(stompPropertiesContent, Q$IndexedPropertiesContent)?$addProperty_1(dynamicCast(stompPropertiesContent, Q$IndexedPropertiesContent), index << 24 >> 24, name_0, types[i], value):stompPropertiesContent.addProperty(name_0, types[i], value);
    }
}

function encodeParameters(parameters){
    var name_0, name$iterator, sb, value;
    sb = new StringBuilder_0;
    for (name$iterator = $iterator($keySet(parameters)); name$iterator.val$outerIter.hasNext();) {
        name_0 = dynamicCast($next_0(name$iterator), Q$String);
        $append(sb.impl, name_0);
        value = dynamicCast(parameters.get_0(name_0), Q$String);
        if (value != null) {
            sb.impl.string += '=';
            $append(sb.impl, value);
        }
        sb.impl.string += '"';
    }
    return $substring_1(sb, sb.impl.string.length - 2);
}

function getHeaderValue(name_0, buffer){
    var len, val, bytes;
    val = '';
    switch (dynamicCast($get_0(($clinit_BumpFrame() , headerValueTypeMap), name_0), Q$BumpFrame$HeaderValueTypes).ordinal) {
        case 0:
            val = valueOf(buffer.get());
            break;
        case 3:
            val = valueOf_1(buffer.getInt());
            break;
        case 4:
            val = valueOf_2(($clinit_ByteBufferUtils() , makeLong(buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get())));
            break;
        case 1:
            len = getUtf8Integer(buffer);
            len > 0?(val = ($clinit_ByteBufferUtils() , bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, len, 1) , $get(buffer, bytes, buffer.position, len) , $position(buffer, buffer.position + len) , bytes)):(val = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 0, 1));
            break;
        case 5:
            len = getUtf8Integer(buffer);
            len > 0 && (val = $decode_0(buffer.getBytes(len)));
            break;
        case 8:
            val = valueOf_1(getUtf8Integer(buffer));
            break;
        case 2:
            val = ($clinit_Boolean() , buffer.get() != 48?TRUE:FALSE);
            break;
        default:throw new BumpException_0('Error retrieve header value for ' + name_0 + ' wrong type ' + $get_0(headerValueTypeMap, name_0));
    }
    return val;
}

function parseParameters(p, parameters){
    var name_0, nameRest, rest, value, valueEnd;
    nameRest = $split(p, '=', 2);
    name_0 = nameRest[0];
    if (nameRest.length > 1) {
        rest = nameRest[1];
        if (rest.charCodeAt(0) == 34) {
            valueEnd = $indexOf_1(rest, fromCodePoint(34), 1);
            if (valueEnd == -1) {
                throw new IllegalArgumentException_1(p);
            }
            value = rest.substr(1, valueEnd - 1);
        }
        else {
            valueEnd = $indexOf_0(rest, fromCodePoint(59));
            valueEnd = valueEnd == -1?rest.length:valueEnd;
            value = rest.substr(0, valueEnd - 0);
        }
        parameters.put_0(name_0, value);
        valueEnd < rest.length - 1 && parseParameters($substring(rest, valueEnd + 1), parameters);
    }
}

function processDeltaFrame(snapshot, delta){
    $clinit_BumpCodecImpl();
    var allHeaderNames, b, buffer, diction, excludeHeader, headers, i, index, index$iterator, indexes, len, name_0, name$iterator, properties, property;
    buffer = delta.body;
    excludeHeader = delta.excludeHeaderMask;
    allHeaderNames = ($clinit_BumpFrame() , FrameHeaderNames)[delta.framecode.ordinal];
    if (excludeHeader != 0) {
        for (i = 0; i < allHeaderNames.length; ++i) {
            (excludeHeader & 1 << 15 - i) != 0 && snapshot.headers.remove(allHeaderNames[i]);
        }
    }
    if (delta.headers.size_0() != 0) {
        headers = snapshot.headers;
        for (name$iterator = $iterator($keySet(delta.headers)); name$iterator.val$outerIter.hasNext();) {
            name_0 = dynamicCast($next_0(name$iterator), Q$String);
            if ($equals_2('priority', name_0)) {
                b = buffer.get();
                if ((b & 63) > 0) {
                    headers.put_0('priority', valueOf_1(b & 15));
                    headers.put_0('persistent', ($clinit_Boolean() , (b & 16) > 0?TRUE:FALSE));
                    headers.put_0('redelivered', (b & 32) > 0?TRUE:FALSE);
                }
            }
            else {
                headers.put_0(name_0, !delta.headers?null:delta.headers.get_0(name_0));
            }
        }
    }
    if (!!delta.propertiesDictionary && $keySet(delta.propertiesDictionary.indexes).val$entrySet.size_0() != 0) {
        if (!snapshot.propertiesDictionary) {
            $setPropertiesDictionary(snapshot, delta.propertiesDictionary);
        }
        else {
            indexes = $keySet(delta.propertiesDictionary.indexes);
            for (index$iterator = $iterator(indexes); index$iterator.val$outerIter.hasNext();) {
                index = dynamicCast($next_0(index$iterator), Q$Byte).value_0;
                $contains_1($keySet(snapshot.propertiesDictionary.indexes), indexes) && $removeProperty(snapshot.propertiesDictionary, index);
                property = $getProperty_1(delta.propertiesDictionary, index);
                $addProperty_2(snapshot.propertiesDictionary, index, property);
            }
        }
    }
    if (!!delta.itemsDictionary && $keySet(delta.itemsDictionary.indexes).val$entrySet.size_0() != 0) {
        if (!snapshot.itemsDictionary) {
            $setItemsDictionary(snapshot, delta.itemsDictionary);
        }
        else {
            indexes = $keySet(delta.itemsDictionary.indexes);
            for (index$iterator = $iterator(indexes); index$iterator.val$outerIter.hasNext();) {
                index = dynamicCast($next_0(index$iterator), Q$Byte).value_0;
                $contains_1($keySet(snapshot.itemsDictionary.indexes), indexes) && $removeProperty(snapshot.itemsDictionary, index);
                property = $getProperty_1(delta.itemsDictionary, index);
                $addProperty_2(snapshot.itemsDictionary, index, property);
            }
        }
    }
    if ((delta.headerMask & 8) > 0) {
        !snapshot.indexedProperties && $setIndexedProperties(snapshot, new HashMap_0);
        properties = snapshot.indexedProperties;
        diction = snapshot.propertiesDictionary;
        processIndexPropertiesDelta(buffer, properties, diction);
    }
    if ((delta.headerMask & 4) > 0) {
        !snapshot.namedProperties && $setNamedProperties(snapshot, new JmsPropertiesContent_0);
        properties = snapshot.namedProperties;
        processPropertiesDelta(buffer, properties);
    }
    if ((delta.headerMask & 2) > 0) {
        !snapshot.indexedItems && $setIndexedItems(snapshot, new HashMap_0);
        properties = snapshot.indexedItems;
        diction = snapshot.itemsDictionary;
        processIndexPropertiesDelta(buffer, properties, diction);
    }
    if ((delta.headerMask & 1) > 0) {
        if (delta.framecode.name_0.indexOf('MAP') != -1) {
            !snapshot.namedItems && $setNamedItems(snapshot, new JmsPropertiesContent_0);
            properties = snapshot.namedItems;
            processPropertiesDelta(buffer, properties);
        }
        else {
            len = getUtf8Integer(buffer);
            len > 0?$setBody(snapshot, wrap(buffer.getBytes(len))):(snapshot.body = null);
        }
    }
}

function processIndexPropertiesDelta(buffer, properties, dictionary){
    var bitPosition, excludeMask, i, mask, property, type, valueByteArray, valueLength;
    excludeMask = 0;
    if ($keySet(dictionary.indexes).val$entrySet.size_0() > 7) {
        bitPosition = 15;
        mask = buffer.getUnsignedShort();
        (mask & 1) > 0 && (excludeMask = buffer.getUnsignedShort());
    }
    else {
        bitPosition = 7;
        mask = buffer.get();
        (mask & 1) != 0 && (excludeMask = buffer.get());
    }
    for (i = 0; i < bitPosition; ++i) {
        if ((mask & 1 << bitPosition - i) != 0 && (excludeMask & 1 << bitPosition - i) != 0) {
            properties.put_0(valueOf(i), null);
        }
        else if ((mask & 1 << bitPosition - i) == 0 && (excludeMask & 1 << bitPosition - i) != 0) {
            properties.remove(valueOf(i));
        }
        else if ((mask & 1 << bitPosition - i) != 0 && (excludeMask & 1 << bitPosition - i) == 0) {
            property = dynamicCast(dictionary.indexes.get_0(valueOf(i)), Q$JmsPropertiesContent$Property);
            type = property.type_0;
            if (type != ($clinit_JmsDataType() , NULL)) {
                valueLength = type.getFixedLength() == -1?getUtf8Integer(buffer):type.getFixedLength();
                if (valueLength > 0) {
                    valueByteArray = buffer.getBytes(valueLength);
                    properties.put_0(valueOf(i), /*$wnd.*/ByteBuffer.wrap(valueByteArray));
                }
                else {
                    properties.put_0(valueOf(i), new /*$wnd.*/ByteBuffer);
                }
            }
            else {
                properties.put_0(valueOf(i), null);
            }
        }
    }
}

function processPropertiesDelta(buffer, properties){
    var deltaContent, prop, prop$iterator, removed, snapProperty;
    deltaContent = new JmsPropertiesContent_0;
    decodePropertyContent(buffer, deltaContent, true);
    for (prop$iterator = new AbstractList$IteratorImpl_0(deltaContent.properties); prop$iterator.i < prop$iterator.this$0_0.size_0();) {
        prop = dynamicCast($next(prop$iterator), Q$JmsPropertiesContent$Property);
        if (prop.type_0 == ($clinit_JmsDataType() , UNDEFINED)) {
            removed = $getProperty_0(properties, prop.name_0);
            $remove_4(properties.properties, removed);
        }
        else {
            snapProperty = $getProperty_0(properties, prop.name_0);
            !snapProperty?properties.addProperty(prop.name_0, prop.type_0, prop.value_0):$setValue(snapProperty, prop.value_0);
        }
    }
}

defineSeed(90, 1, {}, BumpCodecImpl_0);
_.listener = null;
function BumpException_0(reason){
    JMSException_0.call(this, reason);
}

function BumpException_1(reason){
    JMSException_1.call(this, reason);
}

defineSeed(91, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), BumpException_0, BumpException_1);
function $clinit_BumpFrame(){
    $clinit_BumpFrame = nullMethod;
    ABORT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['receipt', 'transaction']);
    ACT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['message-id', 'receipt', 'subscription', 'transaction']);
    ACQUIRE_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['destination', 'receipt']);
    BEGIN_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['receipt', 'transaction']);
    COMMIT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['receipt', 'transaction']);
    CONNECT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['client-id', 'login', 'passcode']);
    CONNECTED_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['session']);
    CREATE_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['destination', 'receipt']);
    DELETE_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['destination', 'durable-subscriber-name', 'receipt']);
    DISCONNECTED_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['keep-alive']);
    ERROR_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['code', 'message', 'receipt']);
    MESSAGE_BINARY_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary']);
    MESSAGE_BINARY_DELTA_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary']);
    MESSAGE_BINARY_SNAPSHOT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary']);
    MESSAGE_MAP_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary', 'items-dictionary']);
    MESSAGE_MAP_DELTA_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary', 'items-dictionary']);
    MESSAGE_MAP_SNAPSHOT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary', 'items-dictionary']);
    MESSAGE_TEXT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary']);
    MESSAGE_TEXT_DELTA_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary']);
    MESSAGE_TEXT_SNAPSHOT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['timestamp', 'expires', 'priority', 'correlation-id', 'message-id', 'reply-to', 'type', 'properties-dictionary']);
    RECEIPT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['receipt-id', 'subscription']);
    RELEASE_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['destination', 'references']);
    SEND_BINARY_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['priority', 'correlation-id', 'destination', 'expires', 'receipt', 'reply-to', 'transaction', 'type']);
    SEND_MAP_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['priority', 'correlation-id', 'destination', 'expires', 'receipt', 'reply-to', 'transaction', 'type']);
    SEND_TEXT_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['priority', 'correlation-id', 'destination', 'expires', 'receipt', 'reply-to', 'transaction', 'type']);
    SUBSCRIBE_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['ack', 'destination', 'durable-subscriber-name', 'no-local', 'receipt', 'selector']);
    UNSUBSCRIBE_HEADERS = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['id', 'receipt']);
    FrameHeaderNames = initValues(_3_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$String_$1, [initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), ABORT_HEADERS, ACT_HEADERS, BEGIN_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), COMMIT_HEADERS, MESSAGE_BINARY_HEADERS, MESSAGE_BINARY_DELTA_HEADERS, MESSAGE_BINARY_SNAPSHOT_HEADERS, CONNECT_HEADERS, CONNECTED_HEADERS, CREATE_HEADERS, DELETE_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), MESSAGE_MAP_HEADERS, MESSAGE_MAP_DELTA_HEADERS, MESSAGE_MAP_SNAPSHOT_HEADERS, DISCONNECTED_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), ERROR_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), SEND_BINARY_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), MESSAGE_TEXT_HEADERS, MESSAGE_TEXT_DELTA_HEADERS, MESSAGE_TEXT_SNAPSHOT_HEADERS, RECEIPT_HEADERS, SEND_MAP_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), SEND_TEXT_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), SUBSCRIBE_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), UNSUBSCRIBE_HEADERS, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, []), ACQUIRE_HEADERS, RELEASE_HEADERS]);
    headerValueTypeMap = new BumpFrame$1_0;
}

function $setBody(this$static, body){
    this$static.body = body;
}

function $setExcludeHeaderMask(this$static, excludeHeaderMask){
    this$static.excludeHeaderMask = excludeHeaderMask;
}

function $setHeader(this$static, name_0, value){
    var found, h_0, h$array, h$index, h$max, typematch;
    if ($equals_2('subscription', name_0) && instanceOf(value, Q$Integer)) {
        this$static.headers.put_0(name_0, value);
        return;
    }
    if ($equals_2('destination', name_0) && instanceOf(value, Q$String)) {
        this$static.headers.put_0(name_0, value);
        return;
    }
    found = false;
    typematch = false;
    if ($equals_2(name_0, 'persistent') || $equals_2(name_0, 'redelivered')) {
        if (instanceOf(value, Q$Boolean)) {
            this$static.headers.put_0(name_0, value);
            return;
        }
        else {
            throw new IllegalArgumentException_1('cannot set header [' + name_0 + '], header type does not match (Boolean)');
        }
    }
    for (h$array = FrameHeaderNames[this$static.framecode.ordinal] , h$index = 0 , h$max = h$array.length; h$index < h$max; ++h$index) {
        h_0 = h$array[h$index];
        if ($equals_2(h_0, name_0)) {
            found = true;
            switch (dynamicCast($get_0(headerValueTypeMap, name_0), Q$BumpFrame$HeaderValueTypes).ordinal) {
                case 2:
                    typematch = instanceOf(value, Q$Boolean);
                    break;
                case 0:
                    typematch = instanceOf(value, Q$Byte);
                    break;
                case 1:
                    typematch = value == null || instanceOf(value, Q$byte_$1);
                    break;
                case 3:
                case 8:
                    typematch = instanceOf(value, Q$Integer);
                    break;
                case 4:
                    typematch = instanceOf(value, Q$Long);
                    break;
                case 5:
                    typematch = value == null || instanceOf(value, Q$String);
            }
            break;
        }
    }
    if (found) {
        if (typematch) {
            this$static.headers.put_0(name_0, value);
        }
        else {
            throw new IllegalArgumentException_1('cannot set header [' + name_0 + '], header type does not match');
        }
    }
    else {
        throw new IllegalArgumentException_1('cannot set header [' + name_0 + '], header name not supported');
    }
}

function $setIndexedItems(this$static, indexedItems){
    this$static.indexedItems = indexedItems;
}

function $setIndexedProperties(this$static, indexedProperties){
    this$static.indexedProperties = indexedProperties;
}

function $setItemsDictionary(this$static, itemsDictionary){
    this$static.itemsDictionary = itemsDictionary;
}

function $setNamedItems(this$static, items){
    this$static.namedItems = items;
}

function $setNamedProperties(this$static, propertiesContent){
    this$static.namedProperties = propertiesContent;
}

function $setPropertiesDictionary(this$static, propertiesDictionary){
    this$static.propertiesDictionary = propertiesDictionary;
}

function $setSnapshotId(this$static, snapshotId){
    this$static.snapshotId = snapshotId;
}

function $toString_0(this$static){
    var ext, ext$iterator, extensionText, header, header$iterator, headerText, propertiesText, value;
    headerText = '';
    propertiesText = '';
    extensionText = '';
    for (header$iterator = $iterator($keySet(this$static.headers)); header$iterator.val$outerIter.hasNext();) {
        header = dynamicCast($next_0(header$iterator), Q$String);
        value = this$static.headers.get_0(header);
        $equals_2('passcode', header) && value != null?(headerText += header + ':********'):(headerText += header + ':' + (instanceOf(value, Q$byte_$1)?toString_30(dynamicCast(value, Q$byte_$1)):'' + value));
        headerText += ';';
    }
    if (this$static.extensions.map.size_0() != 0) {
        extensionText = 'Extensions = ';
        for (ext$iterator = $iterator($keySet(this$static.extensions.map)); ext$iterator.val$outerIter.hasNext();) {
            ext = dynamicCast($next_0(ext$iterator), Q$JmsExtension);
            extensionText += '{' + ext.value_0 + '} ';
        }
    }
    !!this$static.namedProperties && this$static.namedProperties.properties.size != 0 && (propertiesText = 'Named-Properties = ' + $toString_1(this$static.namedProperties) + ';');
    return '[' + this$static.framecode + ' ' + headerText + propertiesText + 'body=' + (!this$static.body || !this$static.body.hasRemaining()?'<empty>':hexDump(this$static.body)) + extensionText + ']';
}

function BumpFrame_0(code){
    $clinit_BumpFrame();
    this.framecode = code;
    this.headers = new HashMap_0;
    this.extensions = new HashSet_1;
}

defineSeed(92, 1, makeCastMap([Q$BumpFrame]), BumpFrame_0);
_.equals$ = function equals_0(obj){
    var frame;
    if (obj == null) {
        return false;
    }
    frame = dynamicCast(obj, Q$BumpFrame);
    if (this.framecode != frame.framecode) {
        return false;
    }
    if (!!this.headers && !$equals(this.headers, frame.headers)) {
        return false;
    }
    if (!this.headers && !!frame.headers) {
        return false;
    }
    if (this.framecode.name_0.indexOf('MESSAGE_TEXT') != -1 || this.framecode.name_0.indexOf('MESSAGE_BINARY') != -1 || this.framecode == ($clinit_BumpFrame$FrameCode() , SEND_TEXT) || this.framecode == ($clinit_BumpFrame$FrameCode() , SEND_BINARY) || this.framecode == ($clinit_BumpFrame$FrameCode() , ERROR)) {
        if (!!this.body && this.body != frame.body) {
            return false;
        }
        if (!this.body && !!frame.body) {
            return false;
        }
    }
    if (!!this.namedProperties && !$equals_0(this.namedProperties, frame.namedProperties)) {
        return false;
    }
    if (!this.namedProperties && !!frame.namedProperties) {
        return false;
    }
    if (this.framecode.name_0.indexOf('MESSAGE_MAP') != -1 || this.framecode == ($clinit_BumpFrame$FrameCode() , SEND_MAP)) {
        if (!!this.namedItems && !$equals_0(this.namedItems, frame.namedItems)) {
            return false;
        }
        if (!this.namedItems && !!frame.namedItems) {
            return false;
        }
    }
    return true;
}
;
_.toString$ = function toString_6(){
    return $toString_0(this);
}
;
_.body = null;
_.excludeHeaderMask = 0;
_.extensions = null;
_.framecode = null;
_.headerMask = 0;
_.headers = null;
_.indexedItems = null;
_.indexedProperties = null;
_.itemsDictionary = null;
_.namedItems = null;
_.namedProperties = null;
_.propertiesDictionary = null;
_.snapshotId = 0;
var ABORT_HEADERS, ACQUIRE_HEADERS, ACT_HEADERS, BEGIN_HEADERS, COMMIT_HEADERS, CONNECTED_HEADERS, CONNECT_HEADERS, CREATE_HEADERS, DELETE_HEADERS, DISCONNECTED_HEADERS, ERROR_HEADERS, FrameHeaderNames, MESSAGE_BINARY_DELTA_HEADERS, MESSAGE_BINARY_HEADERS, MESSAGE_BINARY_SNAPSHOT_HEADERS, MESSAGE_MAP_DELTA_HEADERS, MESSAGE_MAP_HEADERS, MESSAGE_MAP_SNAPSHOT_HEADERS, MESSAGE_TEXT_DELTA_HEADERS, MESSAGE_TEXT_HEADERS, MESSAGE_TEXT_SNAPSHOT_HEADERS, RECEIPT_HEADERS, RELEASE_HEADERS, SEND_BINARY_HEADERS, SEND_MAP_HEADERS, SEND_TEXT_HEADERS, SUBSCRIBE_HEADERS, UNSUBSCRIBE_HEADERS, headerValueTypeMap;
function $equals(this$static, obj){
    var entry, entry$iterator, otherKey, otherMap, otherValue;
    if (obj === this$static) {
        return true;
    }
    if (!instanceOf(obj, Q$Map)) {
        return false;
    }
    otherMap = dynamicCast(obj, Q$Map);
    if (this$static.size_0() != otherMap.size_0()) {
        return false;
    }
    for (entry$iterator = otherMap.entrySet().iterator(); entry$iterator.hasNext();) {
        entry = dynamicCast(entry$iterator.next_0(), Q$Map$Entry);
        otherKey = entry.getKey();
        otherValue = entry.getValue_0();
        if (!this$static.containsKey(otherKey)) {
            return false;
        }
        if (!equalsWithNullCheck(otherValue, this$static.get_0(otherKey))) {
            return false;
        }
    }
    return true;
}

function $implFindEntry(this$static, key){
    var entry, iter, k;
    for (iter = this$static.entrySet().iterator(); iter.hasNext();) {
        entry = dynamicCast(iter.next_0(), Q$Map$Entry);
        k = entry.getKey();
        if (key == null?k == null:equals__devirtual$(key, k)) {
            return entry;
        }
    }
    return null;
}

function $keySet(this$static){
    var entrySet;
    entrySet = this$static.entrySet();
    return new AbstractMap$1_0(this$static, entrySet);
}

function $putAll(this$static, t){
    var e, iter;
    for (iter = t.entrySet().iterator(); iter.hasNext();) {
        e = dynamicCast(iter.next_0(), Q$Map$Entry);
        this$static.put_0(e.getKey(), e.getValue_0());
    }
}

function $values(this$static){
    var entrySet;
    entrySet = this$static.entrySet();
    return new AbstractMap$2_0(this$static, entrySet);
}

defineSeed(96, 1, makeCastMap([Q$Map]));
_.containsKey = function containsKey(key){
    return !!$implFindEntry(this, key);
}
;
_.equals$ = function equals_1(obj){
    return $equals(this, obj);
}
;
_.get_0 = function get(key){
    var entry;
    entry = $implFindEntry(this, key);
    return !entry?null:entry.getValue_0();
}
;
_.hashCode$ = function hashCode_2(){
    var entry, entry$iterator, hashCode;
    hashCode = 0;
    for (entry$iterator = this.entrySet().iterator(); entry$iterator.hasNext();) {
        entry = dynamicCast(entry$iterator.next_0(), Q$Map$Entry);
        hashCode += entry.hashCode$();
        hashCode = ~~hashCode;
    }
    return hashCode;
}
;
_.put_0 = function put(key, value){
    throw new UnsupportedOperationException_1('Put not supported on this map');
}
;
_.size_0 = function size_0(){
    return this.entrySet().size_0();
}
;
_.toString$ = function toString_7(){
    var comma, entry, iter, s;
    s = '{';
    comma = false;
    for (iter = this.entrySet().iterator(); iter.hasNext();) {
        entry = dynamicCast(iter.next_0(), Q$Map$Entry);
        comma?(s += ', '):(comma = true);
        s += '' + entry.getKey();
        s += '=';
        s += '' + entry.getValue_0();
    }
    return s + '}';
}
;
function $addAllHashEntries(this$static, dest){
    var hashCodeMap = this$static.hashCodeMap;
    for (var hashCode in hashCodeMap) {
        var hashCodeInt = parseInt(hashCode, 10);
        if (hashCode == hashCodeInt) {
            var array = hashCodeMap[hashCodeInt];
            for (var i = 0, c = array.length; i < c; ++i) {
                dest.add(array[i]);
            }
        }
    }
}

function $addAllStringEntries(this$static, dest){
    var stringMap = this$static.stringMap;
    for (var key in stringMap) {
        if (key.charCodeAt(0) == 58) {
            var entry = new AbstractHashMap$MapEntryString_0(this$static, key.substring(1));
            dest.add(entry);
        }
    }
}

function $clearImpl(this$static){
    this$static.hashCodeMap = [];
    this$static.stringMap = {};
    this$static.nullSlotLive = false;
    this$static.nullSlot = null;
    this$static.size = 0;
}

function $containsHashValue(this$static, value){
    var hashCodeMap = this$static.hashCodeMap;
    for (var hashCode in hashCodeMap) {
        var hashCodeInt = parseInt(hashCode, 10);
        if (hashCode == hashCodeInt) {
            var array = hashCodeMap[hashCodeInt];
            for (var i = 0, c = array.length; i < c; ++i) {
                var entry = array[i];
                var entryValue = entry.getValue_0();
                if (this$static.equalsBridge(value, entryValue)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function $containsStringValue(this$static, value){
    var stringMap = this$static.stringMap;
    for (var key in stringMap) {
        if (key.charCodeAt(0) == 58) {
            var entryValue = stringMap[key];
            if (this$static.equalsBridge(value, entryValue)) {
                return true;
            }
        }
    }
    return false;
}

function $get_0(this$static, key){
    return key == null?this$static.nullSlot:instanceOf(key, Q$String)?$getStringValue(this$static, dynamicCast(key, Q$String)):$getHashValue(this$static, key, this$static.getHashCode(key));
}

function $getHashValue(this$static, key, hashCode){
    var array = this$static.hashCodeMap[hashCode];
    if (array) {
        for (var i = 0, c = array.length; i < c; ++i) {
            var entry = array[i];
            var entryKey = entry.getKey();
            if (this$static.equalsBridge(key, entryKey)) {
                return entry.getValue_0();
            }
        }
    }
    return null;
}

function $getStringValue(this$static, key){
    return this$static.stringMap[':' + key];
}

function $hasHashValue(this$static, key, hashCode){
    var array = this$static.hashCodeMap[hashCode];
    if (array) {
        for (var i = 0, c = array.length; i < c; ++i) {
            var entry = array[i];
            var entryKey = entry.getKey();
            if (this$static.equalsBridge(key, entryKey)) {
                return true;
            }
        }
    }
    return false;
}

function $put_0(this$static, key, value){
    return key == null?$putNullSlot(this$static, value):instanceOf(key, Q$String)?$putStringValue(this$static, dynamicCast(key, Q$String), value):$putHashValue(this$static, key, value, this$static.getHashCode(key));
}

function $putHashValue(this$static, key, value, hashCode){
    var array = this$static.hashCodeMap[hashCode];
    if (array) {
        for (var i = 0, c = array.length; i < c; ++i) {
            var entry = array[i];
            var entryKey = entry.getKey();
            if (this$static.equalsBridge(key, entryKey)) {
                var previous = entry.getValue_0();
                entry.setValue(value);
                return previous;
            }
        }
    }
    else {
        array = this$static.hashCodeMap[hashCode] = [];
    }
    var entry = new MapEntryImpl_0(key, value);
    array.push(entry);
    ++this$static.size;
    return null;
}

function $putNullSlot(this$static, value){
    var result;
    result = this$static.nullSlot;
    this$static.nullSlot = value;
    if (!this$static.nullSlotLive) {
        this$static.nullSlotLive = true;
        ++this$static.size;
    }
    return result;
}

function $putStringValue(this$static, key, value){
    var result, stringMap = this$static.stringMap;
    key = ':' + key;
    key in stringMap?(result = stringMap[key]):++this$static.size;
    stringMap[key] = value;
    return result;
}

function $removeHashValue(this$static, key, hashCode){
    var array = this$static.hashCodeMap[hashCode];
    if (array) {
        for (var i = 0, c = array.length; i < c; ++i) {
            var entry = array[i];
            var entryKey = entry.getKey();
            if (this$static.equalsBridge(key, entryKey)) {
                array.length == 1?delete this$static.hashCodeMap[hashCode]:array.splice(i, 1);
                --this$static.size;
                return entry.getValue_0();
            }
        }
    }
    return null;
}

function $removeNullSlot(this$static){
    var result;
    result = this$static.nullSlot;
    this$static.nullSlot = null;
    if (this$static.nullSlotLive) {
        this$static.nullSlotLive = false;
        --this$static.size;
    }
    return result;
}

function $removeStringValue(this$static, key){
    var result, stringMap = this$static.stringMap;
    key = ':' + key;
    if (key in stringMap) {
        result = stringMap[key];
        --this$static.size;
        delete stringMap[key];
    }
    return result;
}

defineSeed(95, 96, makeCastMap([Q$Map]));
_.clear = function clear(){
    $clearImpl(this);
}
;
_.containsKey = function containsKey_0(key){
    return key == null?this.nullSlotLive:instanceOf(key, Q$String)?':' + dynamicCast(key, Q$String) in this.stringMap:$hasHashValue(this, key, this.getHashCode(key));
}
;
_.containsValue = function containsValue(value){
    if (this.nullSlotLive && this.equals(this.nullSlot, value)) {
        return true;
    }
    else if ($containsStringValue(this, value)) {
        return true;
    }
    else if ($containsHashValue(this, value)) {
        return true;
    }
    return false;
}
;
_.entrySet = function entrySet_0(){
    return new AbstractHashMap$EntrySet_0(this);
}
;
_.equalsBridge = function equalsBridge(value1, value2){
    return this.equals(value1, value2);
}
;
_.get_0 = function get_0(key){
    return $get_0(this, key);
}
;
_.put_0 = function put_0(key, value){
    return $put_0(this, key, value);
}
;
_.remove = function remove(key){
    return key == null?$removeNullSlot(this):instanceOf(key, Q$String)?$removeStringValue(this, dynamicCast(key, Q$String)):$removeHashValue(this, key, this.getHashCode(key));
}
;
_.size_0 = function size_1(){
    return this.size;
}
;
_.hashCodeMap = null;
_.nullSlot = null;
_.nullSlotLive = false;
_.size = 0;
_.stringMap = null;
function HashMap_0(){
    $clearImpl(this);
}

function HashMap_1(){
    $clearImpl(this);
}

function HashMap_2(toBeCopied){
    $clearImpl(this);
    $putAll(this, toBeCopied);
}

defineSeed(94, 95, makeCastMap([Q$Serializable, Q$Map]), HashMap_0, HashMap_1, HashMap_2);
_.equals = function equals_2(value1, value2){
    return maskUndefined(value1) === maskUndefined(value2) || value1 != null && equals__devirtual$(value1, value2);
}
;
_.getHashCode = function getHashCode_0(key){
    return ~~hashCode__devirtual$(key);
}
;
function BumpFrame$1_0(){
    $clearImpl(this);
    $put_0(this, 'ack', ($clinit_BumpFrame$HeaderValueTypes() , BYTE));
    $put_0(this, 'client-id', STRING);
    $put_0(this, 'code', INT);
    $put_0(this, 'correlation-id', BYTEARRAY);
    $put_0(this, 'destination', STRING);
    $put_0(this, 'durable-subscriber-name', STRING);
    $put_0(this, 'expires', LONG);
    $put_0(this, 'id', UTF8_INT);
    $put_0(this, 'items-dictionary', DICTIONARY);
    $put_0(this, 'keep-alive', BOOLEAN);
    $put_0(this, 'login', STRING);
    $put_0(this, 'message', STRING);
    $put_0(this, 'message-id', STRING);
    $put_0(this, 'no-local', BOOLEAN);
    $put_0(this, 'passcode', BYTEARRAY);
    $put_0(this, 'priority', BYTE);
    $put_0(this, 'properties-dictionary', DICTIONARY);
    $put_0(this, 'receipt', BYTEARRAY);
    $put_0(this, 'receipt-id', STRING);
    $put_0(this, 'references', INT);
    $put_0(this, 'reply-to', STRING);
    $put_0(this, 'selector', STRING);
    $put_0(this, 'session', STRING);
    $put_0(this, 'subscription', UTF8_INT);
    $put_0(this, 'timestamp', LONG);
    $put_0(this, 'transaction', STRING);
    $put_0(this, 'type', STRING);
}

defineSeed(93, 94, makeCastMap([Q$Serializable, Q$Map]), BumpFrame$1_0);
function $compareTo(this$static, other){
    return this$static.ordinal - other.ordinal;
}

function Enum_0(name_0, ordinal){
    this.name_0 = name_0;
    this.ordinal = ordinal;
}

defineSeed(98, 1, makeCastMap([Q$Serializable, Q$Comparable, Q$Enum]));
_.compareTo$ = function compareTo(other){
    return $compareTo(this, dynamicCast(other, Q$Enum));
}
;
_.equals$ = function equals_3(other){
    return this === other;
}
;
_.hashCode$ = function hashCode_3(){
    return getHashCode(this);
}
;
_.toString$ = function toString_8(){
    return this.name_0;
}
;
_.name_0 = null;
_.ordinal = 0;
function $clinit_BumpFrame$FrameCode(){
    $clinit_BumpFrame$FrameCode = nullMethod;
    RESERVED = new BumpFrame$FrameCode_0('RESERVED', 0);
    ABORT = new BumpFrame$FrameCode_0('ABORT', 1);
    ACK = new BumpFrame$FrameCode_0('ACK', 2);
    BEGIN = new BumpFrame$FrameCode_0('BEGIN', 3);
    MESSAGE = new BumpFrame$FrameCode_0('MESSAGE', 4);
    MESSAGE_DELTA = new BumpFrame$FrameCode_0('MESSAGE_DELTA', 5);
    MESSAGE_SNAPSHOT = new BumpFrame$FrameCode_0('MESSAGE_SNAPSHOT', 6);
    COMMIT = new BumpFrame$FrameCode_0('COMMIT', 7);
    MESSAGE_BINARY = new BumpFrame$FrameCode_0('MESSAGE_BINARY', 8);
    MESSAGE_BINARY_DELTA = new BumpFrame$FrameCode_0('MESSAGE_BINARY_DELTA', 9);
    MESSAGE_BINARY_SNAPSHOT = new BumpFrame$FrameCode_0('MESSAGE_BINARY_SNAPSHOT', 10);
    CONNECT = new BumpFrame$FrameCode_0('CONNECT', 11);
    CONNECTED = new BumpFrame$FrameCode_0('CONNECTED', 12);
    CREATE = new BumpFrame$FrameCode_0('CREATE', 13);
    DELETE = new BumpFrame$FrameCode_0('DELETE', 14);
    DISCONNECT = new BumpFrame$FrameCode_0('DISCONNECT', 15);
    MESSAGE_MAP = new BumpFrame$FrameCode_0('MESSAGE_MAP', 16);
    MESSAGE_MAP_DELTA = new BumpFrame$FrameCode_0('MESSAGE_MAP_DELTA', 17);
    MESSAGE_MAP_SNAPSHOT = new BumpFrame$FrameCode_0('MESSAGE_MAP_SNAPSHOT', 18);
    DISCONNECTED = new BumpFrame$FrameCode_0('DISCONNECTED', 19);
    MESSAGE_OBJECT = new BumpFrame$FrameCode_0('MESSAGE_OBJECT', 20);
    MESSAGE_OBJECT_DELTA = new BumpFrame$FrameCode_0('MESSAGE_OBJECT_DELTA', 21);
    MESSAGE_OBJECT_SNAPSHOT = new BumpFrame$FrameCode_0('MESSAGE_OBJECT_SNAPSHOT', 22);
    ERROR = new BumpFrame$FrameCode_0('ERROR', 23);
    MESSAGE_STREAM = new BumpFrame$FrameCode_0('MESSAGE_STREAM', 24);
    MESSAGE_STREAM_DELTA = new BumpFrame$FrameCode_0('MESSAGE_STREAM_DELTA', 25);
    MESSAGE_STREAM_SNAPSHOT = new BumpFrame$FrameCode_0('MESSAGE_STREAM_SNAPSHOT', 26);
    MESSAGE_OPAQUE = new BumpFrame$FrameCode_0('MESSAGE_OPAQUE', 27);
    SEND = new BumpFrame$FrameCode_0('SEND', 28);
    SEND_TRANSACTIONAL = new BumpFrame$FrameCode_0('SEND_TRANSACTIONAL', 29);
    SEND_BINARY = new BumpFrame$FrameCode_0('SEND_BINARY', 30);
    SEND_BINARY_TRANSACTIONAL = new BumpFrame$FrameCode_0('SEND_BINARY_TRANSACTIONAL', 31);
    MESSAGE_TEXT = new BumpFrame$FrameCode_0('MESSAGE_TEXT', 32);
    MESSAGE_TEXT_DELTA = new BumpFrame$FrameCode_0('MESSAGE_TEXT_DELTA', 33);
    MESSAGE_TEXT_SNAPSHOT = new BumpFrame$FrameCode_0('MESSAGE_TEXT_SNAPSHOT', 34);
    RECEIPT = new BumpFrame$FrameCode_0('RECEIPT', 35);
    SEND_MAP = new BumpFrame$FrameCode_0('SEND_MAP', 36);
    SEND_MAP_TRANSACTIONAL = new BumpFrame$FrameCode_0('SEND_MAP_TRANSACTIONAL', 37);
    SEND_OBJECT = new BumpFrame$FrameCode_0('SEND_OBJECT', 38);
    SEND_OBJECT_TRANSACTIONAL = new BumpFrame$FrameCode_0('SEND_OBJECT_TRANSACTIONAL', 39);
    SEND_STREAM = new BumpFrame$FrameCode_0('SEND_STREAM', 40);
    SEND_STREAM_TRANSACTIONAL = new BumpFrame$FrameCode_0('SEND_STREAM_TRANSACTIONAL', 41);
    SEND_TEXT = new BumpFrame$FrameCode_0('SEND_TEXT', 42);
    SEND_TEXT_TRANSACTIONAL = new BumpFrame$FrameCode_0('SEND_TEXT_TRANSACTIONAL', 43);
    SUBSCRIBE = new BumpFrame$FrameCode_0('SUBSCRIBE', 44);
    SUBSCRIBE_DURABLE = new BumpFrame$FrameCode_0('SUBSCRIBE_DURABLE', 45);
    UNSUBSCRIBE = new BumpFrame$FrameCode_0('UNSUBSCRIBE', 46);
    UNSUBSCRIBE_DURABLE = new BumpFrame$FrameCode_0('UNSUBSCRIBE_DURABLE', 47);
    ACQUIRE = new BumpFrame$FrameCode_0('ACQUIRE', 48);
    RELEASE = new BumpFrame$FrameCode_0('RELEASE', 49);
    $VALUES = initValues(_3Lcom_kaazing_gateway_jms_client_bump_BumpFrame$FrameCode_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$BumpFrame$FrameCode, [RESERVED, ABORT, ACK, BEGIN, MESSAGE, MESSAGE_DELTA, MESSAGE_SNAPSHOT, COMMIT, MESSAGE_BINARY, MESSAGE_BINARY_DELTA, MESSAGE_BINARY_SNAPSHOT, CONNECT, CONNECTED, CREATE, DELETE, DISCONNECT, MESSAGE_MAP, MESSAGE_MAP_DELTA, MESSAGE_MAP_SNAPSHOT, DISCONNECTED, MESSAGE_OBJECT, MESSAGE_OBJECT_DELTA, MESSAGE_OBJECT_SNAPSHOT, ERROR, MESSAGE_STREAM, MESSAGE_STREAM_DELTA, MESSAGE_STREAM_SNAPSHOT, MESSAGE_OPAQUE, SEND, SEND_TRANSACTIONAL, SEND_BINARY, SEND_BINARY_TRANSACTIONAL, MESSAGE_TEXT, MESSAGE_TEXT_DELTA, MESSAGE_TEXT_SNAPSHOT, RECEIPT, SEND_MAP, SEND_MAP_TRANSACTIONAL, SEND_OBJECT, SEND_OBJECT_TRANSACTIONAL, SEND_STREAM, SEND_STREAM_TRANSACTIONAL, SEND_TEXT, SEND_TEXT_TRANSACTIONAL, SUBSCRIBE, SUBSCRIBE_DURABLE, UNSUBSCRIBE, UNSUBSCRIBE_DURABLE, ACQUIRE, RELEASE]);
}

function BumpFrame$FrameCode_0(enum$name, enum$ordinal){
    Enum_0.call(this, enum$name, enum$ordinal);
}

function values_0(){
    $clinit_BumpFrame$FrameCode();
    return $VALUES;
}

defineSeed(97, 98, makeCastMap([Q$BumpFrame$FrameCode, Q$Serializable, Q$Comparable, Q$Enum]), BumpFrame$FrameCode_0);
var $VALUES, ABORT, ACK, ACQUIRE, BEGIN, COMMIT, CONNECT, CONNECTED, CREATE, DELETE, DISCONNECT, DISCONNECTED, ERROR, MESSAGE, MESSAGE_BINARY, MESSAGE_BINARY_DELTA, MESSAGE_BINARY_SNAPSHOT, MESSAGE_DELTA, MESSAGE_MAP, MESSAGE_MAP_DELTA, MESSAGE_MAP_SNAPSHOT, MESSAGE_OBJECT, MESSAGE_OBJECT_DELTA, MESSAGE_OBJECT_SNAPSHOT, MESSAGE_OPAQUE, MESSAGE_SNAPSHOT, MESSAGE_STREAM, MESSAGE_STREAM_DELTA, MESSAGE_STREAM_SNAPSHOT, MESSAGE_TEXT, MESSAGE_TEXT_DELTA, MESSAGE_TEXT_SNAPSHOT, RECEIPT, RELEASE, RESERVED, SEND, SEND_BINARY, SEND_BINARY_TRANSACTIONAL, SEND_MAP, SEND_MAP_TRANSACTIONAL, SEND_OBJECT, SEND_OBJECT_TRANSACTIONAL, SEND_STREAM, SEND_STREAM_TRANSACTIONAL, SEND_TEXT, SEND_TEXT_TRANSACTIONAL, SEND_TRANSACTIONAL, SUBSCRIBE, SUBSCRIBE_DURABLE, UNSUBSCRIBE, UNSUBSCRIBE_DURABLE;
function $clinit_BumpFrame$HeaderValueTypes(){
    $clinit_BumpFrame$HeaderValueTypes = nullMethod;
    BYTE = new BumpFrame$HeaderValueTypes_0('BYTE', 0);
    BYTEARRAY = new BumpFrame$HeaderValueTypes_0('BYTEARRAY', 1);
    BOOLEAN = new BumpFrame$HeaderValueTypes_0('BOOLEAN', 2);
    INT = new BumpFrame$HeaderValueTypes_0('INT', 3);
    LONG = new BumpFrame$HeaderValueTypes_0('LONG', 4);
    STRING = new BumpFrame$HeaderValueTypes_0('STRING', 5);
    DICTIONARY = new BumpFrame$HeaderValueTypes_0('DICTIONARY', 6);
    INDICATOR = new BumpFrame$HeaderValueTypes_0('INDICATOR', 7);
    UTF8_INT = new BumpFrame$HeaderValueTypes_0('UTF8_INT', 8);
    $VALUES_0 = initValues(_3Lcom_kaazing_gateway_jms_client_bump_BumpFrame$HeaderValueTypes_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$BumpFrame$HeaderValueTypes, [BYTE, BYTEARRAY, BOOLEAN, INT, LONG, STRING, DICTIONARY, INDICATOR, UTF8_INT]);
}

function BumpFrame$HeaderValueTypes_0(enum$name, enum$ordinal){
    Enum_0.call(this, enum$name, enum$ordinal);
}

function values_1(){
    $clinit_BumpFrame$HeaderValueTypes();
    return $VALUES_0;
}

defineSeed(99, 98, makeCastMap([Q$BumpFrame$HeaderValueTypes, Q$Serializable, Q$Comparable, Q$Enum]), BumpFrame$HeaderValueTypes_0);
var $VALUES_0, BOOLEAN, BYTE, BYTEARRAY, DICTIONARY, INDICATOR, INT, LONG, STRING, UTF8_INT;
function GenericException_0(e){
    JMSException_0.call(this, e.getMessage_0());
    this.linkedException_0 = e;
    $setStackTrace(this, $getStackTrace(e));
}

function GenericException_1(reason){
    JMSException_0.call(this, reason);
}

defineSeed(101, 76, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), GenericException_0);
function ConnectionDisconnectedException_0(){
    GenericException_1.call(this, 'Gateway disconnecting, perhaps due to a fatal error');
}

defineSeed(100, 101, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), ConnectionDisconnectedException_0);
function ConnectionDroppedException_0(){
    GenericException_1.call(this, 'WebSocket connection dropped: reconnecting');
}

defineSeed(102, 101, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), ConnectionDroppedException_0);
function ConnectionFailedException_0(e){
    GenericException_0.call(this, e);
}

function ConnectionFailedException_1(reason){
    GenericException_1.call(this, reason);
}

function ConnectionFailedException_2(linkedException){
    Exception_0.call(this, 'WebSocket connection failed');
    this.simplifiedMessage = 'WebSocket connection failed';
    this.linkedException_0 = linkedException;
}

defineSeed(103, 101, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), ConnectionFailedException_0, ConnectionFailedException_1, ConnectionFailedException_2);
function $fulfillInternal(this$static){
    var e;
    if (this$static.fulfilled) {
        throw new AlreadyFulfilledFutureException_0;
    }
    this$static.fulfilled = true;
    if (this$static.callback_0) {
        try {
            !this$static.exception_0?this$static.callback_0.onReturn(this$static.value_0):this$static.callback_0.onException_1(this$static.exception_0);
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$Exception)) {
                e = $e0;
                trace('Uncaught Application Exception: ' + $toString(e));
            }
            else
                throw $e0;
        }
    }
}

function $setValueInternal(this$static, value){
    this$static.value_0 = value;
    $fulfillInternal(this$static);
}

function $throwException_2(this$static, e){
    this$static.exception_0 = e;
    $fulfillInternal(this$static);
}

function $throwExceptionAsync(this$static, e){
    this$static.exception_0 = e;
    $schedule(new GenericFuture$3_0(this$static, e), 1);
}

defineSeed(105, 1, {});
_.callback_0 = null;
_.exception_0 = null;
_.fulfilled = false;
_.value_0 = null;
function ConnectionFuture_0(callback){
    this.callback_0 = callback;
}

defineSeed(104, 105, {}, ConnectionFuture_0);
function ConnectionInterruptedException_0(){
    GenericException_1.call(this, 'Gateway reported JMS Connection interrupted');
}

defineSeed(106, 101, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), ConnectionInterruptedException_0);
function ConnectionRestoredException_0(reason){
    GenericException_1.call(this, reason);
}

defineSeed(107, 101, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), ConnectionRestoredException_0);
function $setSubscriptionID(this$static, value){
    this$static.subscriptionID = value;
}

defineSeed(110, 1, {});
_.getReceiptID = function getReceiptID(){
    return this.receiptID;
}
;
_.getSubscriptionID = function getSubscriptionID(){
    return this.subscriptionID;
}
;
_.setReceiptID = function setReceiptID(value){
    this.receiptID = value;
}
;
_.receiptID = null;
_.subscriptionID = null;
function GenericReceiptImpl_0(){
}

defineSeed(109, 110, {}, GenericReceiptImpl_0);
_.toString$ = function toString_9(){
    return 'RECEIPT: ' + this.receiptID;
}
;
function $setMessageID(this$static, value){
    this$static.messageID = value;
}

function GenericAckReceipt_0(){
}

defineSeed(108, 109, makeCastMap([Q$GenericAckReceipt]), GenericAckReceipt_0);
_.messageID = null;
function $handleException(this$static, e){
    $onException_2(this$static.exceptionListener, e);
}

function $processConnected(this$static, connected){
    this$static.nextProcessor.processConnected(connected);
}

function $setNextProcessor(this$static, nextProcessor){
    this$static.nextProcessor = nextProcessor;
}

function GenericMessageProcessorAdapter_0(){
    this.nextProcessor = null;
}

defineSeed(112, 1, makeCastMap([Q$GenericMessageProcessor]));
_.processClose = function processClose(){
    this.nextProcessor.processClose();
}
;
_.processConnected = function processConnected(connected){
    $processConnected(this, connected);
}
;
_.processDisconnected = function processDisconnected(disconnected){
    this.nextProcessor.processDisconnected(disconnected);
}
;
_.processMessage = function processMessage(message){
    this.nextProcessor.processMessage(message);
}
;
_.processOpen = function processOpen(){
    this.nextProcessor.processOpen();
}
;
_.processReceipt = function processReceipt(receipt){
    this.nextProcessor.processReceipt(receipt);
}
;
_.processStart = function processStart(){
    this.nextProcessor.processStart();
}
;
_.processStop = function processStop(){
    this.nextProcessor.processStop();
}
;
_.exceptionListener = null;
_.listener = null;
_.nextProcessor = null;
function $addProcessor(this$static, processor){
    $add_5(this$static.processors, processor);
}

function $processClose(this$static){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this$static.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processClose();
    }
}

function $processConnected_0(this$static, connected){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this$static.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processConnected(connected);
    }
}

function $processDisconnected(this$static, disconnected){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this$static.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processDisconnected(disconnected);
    }
}

function $processOpen(this$static){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this$static.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processOpen();
    }
}

function $processReceipt(this$static, receipt){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this$static.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processReceipt(receipt);
    }
}

function $processStart(this$static){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this$static.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processStart();
    }
}

function $processStop(this$static){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this$static.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processStop();
    }
}

function $removeProcessor(this$static, processor){
    $remove_5(this$static.processors, processor);
}

function GenericBroadcastHandler_0(){
    GenericMessageProcessorAdapter_0.call(this);
    this.processors = new HashSet_0;
}

defineSeed(111, 112, makeCastMap([Q$GenericMessageProcessor]), GenericBroadcastHandler_0);
_.processClose = function processClose_0(){
    $processClose(this);
}
;
_.processConnected = function processConnected_0(connected){
    $processConnected_0(this, connected);
}
;
_.processDisconnected = function processDisconnected_0(disconnected){
    $processDisconnected(this, disconnected);
}
;
_.processMessage = function processMessage_0(message){
    var processor, processor$iterator;
    for (processor$iterator = $iterator($keySet(this.processors.map)); processor$iterator.val$outerIter.hasNext();) {
        processor = dynamicCast($next_0(processor$iterator), Q$GenericMessageProcessor);
        processor.processMessage(message);
    }
}
;
_.processOpen = function processOpen_0(){
    $processOpen(this);
}
;
_.processReceipt = function processReceipt_0(receipt){
    $processReceipt(this, receipt);
}
;
_.processStart = function processStart_0(){
    $processStart(this);
}
;
_.processStop = function processStop_0(){
    $processStop(this);
}
;
function $clinit_GenericMessageImpl(){
    $clinit_GenericMessageImpl = nullMethod;
    var id, id$array, id$index, id$max;
    invalidIdentifiers = initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['AND', 'BETWEEN', 'ESCAPE', 'FALSE', 'IN', 'IS', 'LIKE', 'NOT', 'NULL', 'OR', 'TRUE']);
    invalidIdentifierSet = new HashSet_0;
    for (id$array = invalidIdentifiers , id$index = 0 , id$max = id$array.length; id$index < id$max; ++id$index) {
        id = id$array[id$index];
        $add_5(invalidIdentifierSet, id);
    }
}

function $checkReadable(this$static){
    if (this$static.writable) {
        throw new MessageNotReadableException_0;
    }
}

function $checkWritable(this$static){
    if (!this$static.writable) {
        throw new MessageNotWriteableException_0('Buffer is in read-only mode');
    }
}

function $clone(this$static){
    var clonedMessage, clonedMessage_0;
    clonedMessage = (clonedMessage_0 = this$static.createGenericMessage() , clonedMessage_0.receiptID = this$static.receiptID , clonedMessage_0.subscriptionID = this$static.subscriptionID , clonedMessage_0);
    clonedMessage.propertiesContent = this$static.propertiesContent?this$static.propertiesContent.clone_1():null;
    clonedMessage.clientReadIndex = this$static.clientReadIndex;
    clonedMessage.serverIndex = this$static.serverIndex;
    clonedMessage.destination = this$static.destination;
    clonedMessage.replyTo = this$static.replyTo;
    clonedMessage.expiration = this$static.expiration;
    clonedMessage.disableMessageID = this$static.disableMessageID;
    clonedMessage.writable = this$static.writable;
    clonedMessage.writableProperties = this$static.writableProperties;
    clonedMessage.acknowledgementListener = this$static.acknowledgementListener;
    clonedMessage.correlationID = this$static.correlationID;
    clonedMessage.deliveryMode = this$static.deliveryMode;
    clonedMessage.messageID = this$static.messageID;
    clonedMessage.priority = this$static.priority;
    clonedMessage.redelivered = this$static.redelivered;
    clonedMessage.timestamp = this$static.timestamp;
    clonedMessage.transactionID = this$static.transactionID;
    clonedMessage.type_0 = this$static.type_0;
    clonedMessage.epochId = this$static.epochId;
    return clonedMessage;
}

function $getProperty(this$static, name_0){
    var bytes, propType, propValue, property;
    if (name_0 == null || $equals_2('', name_0)) {
        throw new IllegalArgumentException_1('Property names cannot be empty or null');
    }
    if (!this$static.propertiesContent) {
        return null;
    }
    property = $getPropertyObject(this$static, name_0);
    if (!property) {
        return null;
    }
    propType = property.type_0;
    propValue = property.value_0;
    if (propType != ($clinit_JmsDataType() , NULL)) {
        bytes = $getBytes(propValue);
        return propType.asObject(bytes);
    }
    return null;
}

function $getPropertyObject(this$static, name_0){
    var propName, property, property$iterator;
    if (name_0 == null || !this$static.propertiesContent) {
        return null;
    }
    for (property$iterator = new AbstractList$IteratorImpl_0(this$static.propertiesContent.properties); property$iterator.i < property$iterator.this$0_0.size_0();) {
        property = dynamicCast($next(property$iterator), Q$JmsPropertiesContent$Property);
        propName = asString(property.name_0);
        if ($equals_2(propName, name_0)) {
            return property;
        }
    }
    return null;
}

function $setJMSCorrelationID(this$static, correlationID){
    this$static.correlationID = correlationID;
}

function $setJMSDeliveryMode(this$static, deliveryMode){
    this$static.deliveryMode = deliveryMode;
}

function $setJMSExpiration(this$static, expiration){
    this$static.expiration = expiration;
}

function $setJMSMessageID(this$static, messageID){
    this$static.messageID = messageID;
}

function $setJMSPriority(this$static, priority){
    if (priority < 0 || priority > 9) {
        throw new JMSException_0('Invalid priority: ' + priority);
    }
    this$static.priority = priority;
}

function $setJMSRedelivered(this$static, redelivered){
    this$static.redelivered = redelivered;
}

function $setJMSTimestamp(this$static, timestamp){
    this$static.timestamp = timestamp;
}

function $setJMSType(this$static, type){
    this$static.type_0 = type;
}

function $setObjectProperty(this$static, name_0, value){
    if (value == null || instanceOf(value, Q$String) || instanceOf(value, Q$Boolean) || instanceOf(value, Q$Byte) || instanceOf(value, Q$Short) || instanceOf(value, Q$Integer) || instanceOf(value, Q$Long) || instanceOf(value, Q$Float) || instanceOf(value, Q$Double)) {
        $setProperty(this$static, name_0, value);
    }
    else {
        throw new MessageFormatException_0('Object value must be one of Boolean, Byte, Short, Integer, Long, Float, Double, or String');
    }
}

function $setProperty(this$static, name_0, value){
    var propName, propType, propValue, property;
    if (!this$static.writableProperties) {
        throw new MessageNotWriteableException_0('Properties not writable');
    }
    if (!(name_0 != null && !$equals_2('', name_0) && (new RegExp('^(^[A-Za-z_$][A-Za-z0-9_$]*)$')).test(name_0) && !$contains_2(invalidIdentifierSet, name_0.toUpperCase()))) {
        throw new IllegalArgumentException_1("Invalid property name: '" + name_0 + "'");
    }
    !this$static.propertiesContent && (this$static.propertiesContent = new JmsPropertiesContent_0);
    property = $getPropertyObject(this$static, name_0);
    !!property && $remove_4(this$static.propertiesContent.properties, property);
    propName = asByteBuffer(name_0);
    propType = getType(value);
    propValue = null;
    propType != ($clinit_JmsDataType() , NULL) && (propValue = wrap($asBytesObject(propType, value)));
    this$static.propertiesContent.addProperty(propName, propType, propValue);
}

function $setTransactionID(this$static, txnID){
    this$static.transactionID = txnID;
}

function GenericMessageImpl_0(){
    GenericMessageImpl_1.call(this, null);
}

function GenericMessageImpl_1(acknowledgementListener){
    $clinit_GenericMessageImpl();
    this.acknowledgementListener = acknowledgementListener;
}

defineSeed(114, 110, makeCastMap([Q$GenericMessage]), GenericMessageImpl_0, GenericMessageImpl_1);
_.acknowledge_0 = function acknowledge(){
    !!this.acknowledgementListener && this.acknowledgementListener.messageAcknowledged(this);
}
;
_.clearBody_0 = function clearBody(){
    this.writable = true;
}
;
_.clearProperties_0 = function clearProperties(){
    !!this.propertiesContent && $clear_0(this.propertiesContent.properties);
    this.writableProperties = true;
}
;
_.clone = function clone(){
    return this.clone_0();
}
;
_.clone_0 = function clone_0(){
    return $clone(this);
}
;
_.createGenericMessage = function createGenericMessage(){
    return new GenericMessageImpl_0;
}
;
_.deliver = function deliver(){
    !!this.deliveryListener && $messageDelivered(this.deliveryListener);
}
;
_.getBodyAsBytes = function getBodyAsBytes(){
    return initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 0, 1);
}
;
_.getBooleanProperty_0 = function getBooleanProperty(name_0){
    var prop;
    prop = $getProperty(this, name_0);
    if (prop == null) {
        return false;
    }
    else if (instanceOf(prop, Q$Boolean)) {
        return dynamicCast(prop, Q$Boolean).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return $clinit_Boolean() , $equalsIgnoreCase('true', dynamicCast(prop, Q$String));
    }
    else
        throw new MessageFormatException_0('Invalid property type: ' + name_0);
}
;
_.getByteProperty_0 = function getByteProperty(name_0){
    var prop;
    prop = $getProperty(this, name_0);
    if (prop == null) {
        return 0;
    }
    else if (instanceOf(prop, Q$Byte)) {
        return dynamicCast(prop, Q$Byte).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateInt(dynamicCast(prop, Q$String), -128, 127) << 24 >> 24;
    }
    else
        throw new MessageFormatException_0('Invalid property type: ' + name_0);
}
;
_.getDoubleProperty_0 = function getDoubleProperty(name_0){
    var prop;
    prop = $getProperty(this, name_0);
    if (prop == null) {
        return 0;
    }
    else if (instanceOf(prop, Q$Double)) {
        return dynamicCast(prop, Q$Double).value_0;
    }
    else if (instanceOf(prop, Q$Float)) {
        return dynamicCast(prop, Q$Float).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateDouble(dynamicCast(prop, Q$String));
    }
    else
        throw new MessageFormatException_0('Invalid property type: ' + name_0);
}
;
_.getEpochId = function getEpochId(){
    return this.epochId;
}
;
_.getFloatProperty_0 = function getFloatProperty(name_0){
    var prop;
    prop = $getProperty(this, name_0);
    if (prop == null) {
        return 0;
    }
    else if (instanceOf(prop, Q$Float)) {
        return dynamicCast(prop, Q$Float).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return parseFloat_0(dynamicCast(prop, Q$String));
    }
    else
        throw new MessageFormatException_0('Invalid property type: ' + name_0);
}
;
_.getIntProperty_0 = function getIntProperty(name_0){
    var prop;
    prop = $getProperty(this, name_0);
    if (prop == null) {
        return 0;
    }
    else if (instanceOf(prop, Q$Integer)) {
        return dynamicCast(prop, Q$Integer).value_0;
    }
    else if (instanceOf(prop, Q$Short)) {
        return dynamicCast(prop, Q$Short).value_0;
    }
    else if (instanceOf(prop, Q$Byte)) {
        return dynamicCast(prop, Q$Byte).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateInt(dynamicCast(prop, Q$String), -2147483648, 2147483647);
    }
    else
        throw new MessageFormatException_0('Invalid property type: ' + name_0);
}
;
_.getJMSCorrelationID_0 = function getJMSCorrelationID(){
    return this.correlationID != null?this.correlationID:null;
}
;
_.getJMSDeliveryMode_0 = function getJMSDeliveryMode(){
    return this.deliveryMode;
}
;
_.getJMSDestination_0 = function getJMSDestination(){
    return this.destination;
}
;
_.getJMSDestination_1 = function getJMSDestination_0(){
    return this.destination;
}
;
_.getJMSExpiration_0 = function getJMSExpiration_0(){
    return this.expiration;
}
;
_.getJMSMessageID_0 = function getJMSMessageID(){
    return this.messageID;
}
;
_.getJMSPriority_0 = function getJMSPriority(){
    return this.priority;
}
;
_.getJMSRedelivered_0 = function getJMSRedelivered(){
    return this.redelivered;
}
;
_.getJMSReplyTo_0 = function getJMSReplyTo(){
    return this.replyTo;
}
;
_.getJMSReplyTo_1 = function getJMSReplyTo_0(){
    return this.replyTo;
}
;
_.getJMSTimestamp_0 = function getJMSTimestamp_0(){
    return this.timestamp;
}
;
_.getJMSType_0 = function getJMSType(){
    return this.type_0;
}
;
_.getLongProperty_0 = function getLongProperty_0(name_0){
    var prop, value;
    prop = $getProperty(this, name_0);
    if (prop == null) {
        return P0_longLit;
    }
    else if (instanceOf(prop, Q$Long)) {
        value = dynamicCast(prop, Q$Long).value_0;
        $clinit_JmsDataType();
        if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
            throw new JMSException_0('Value ' + toString_4(value) + ' received is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
        }
        return value;
    }
    else if (instanceOf(prop, Q$Integer)) {
        return fromInt(dynamicCast(prop, Q$Integer).value_0);
    }
    else if (instanceOf(prop, Q$Short)) {
        return fromInt(dynamicCast(prop, Q$Short).value_0);
    }
    else if (instanceOf(prop, Q$Byte)) {
        return fromInt(dynamicCast(prop, Q$Byte).value_0);
    }
    else if (instanceOf(prop, Q$String)) {
        value = __parseAndValidateLong(dynamicCast(prop, Q$String));
        $clinit_JmsDataType();
        if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
            throw new JMSException_0('Value ' + toString_4(value) + ' received is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
        }
        return value;
    }
    else
        throw new MessageFormatException_0('Invalid property type: ' + name_0);
}
;
_.getObjectProperty_0 = function getObjectProperty(name_0){
    var obj, value;
    obj = $getProperty(this, name_0);
    if (instanceOf(obj, Q$Long)) {
        value = (new Long_0(__parseAndValidateLong(toString__devirtual$(obj)))).value_0;
        $clinit_JmsDataType();
        if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
            throw new JMSException_0('Value ' + toString_4(value) + ' which is received as long type is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
        }
    }
    return obj;
}
;
_.getPropertiesContent = function getPropertiesContent(){
    return this.propertiesContent;
}
;
_.getPropertyNames_0 = function getPropertyNames(){
    var propIter;
    if (!this.propertiesContent) {
        return enumeration(($clinit_Collections() , $clinit_Collections() , EMPTY_LIST));
    }
    propIter = new AbstractList$IteratorImpl_0(this.propertiesContent.properties);
    return new GenericMessageImpl$1_0(propIter);
}
;
_.getServerIndex = function getServerIndex(){
    return this.serverIndex;
}
;
_.getShortProperty_0 = function getShortProperty(name_0){
    var prop;
    prop = $getProperty(this, name_0);
    if (prop == null) {
        return 0;
    }
    else if (instanceOf(prop, Q$Short)) {
        return dynamicCast(prop, Q$Short).value_0;
    }
    else if (instanceOf(prop, Q$Byte)) {
        return dynamicCast(prop, Q$Byte).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateInt(dynamicCast(prop, Q$String), -32768, 32767) << 16 >> 16;
    }
    else
        throw new MessageFormatException_0('Invalid property type: ' + name_0);
}
;
_.getStringProperty_0 = function getStringProperty(name_0){
    var prop;
    prop = $getProperty(this, name_0);
    return prop == null?null:instanceOf(prop, Q$String)?dynamicCast(prop, Q$String):toString__devirtual$(prop);
}
;
_.getTransactionID = function getTransactionID(){
    return this.transactionID;
}
;
_.propertyExists_0 = function propertyExists(name_0){
    var buf, property, property$iterator;
    if (!this.propertiesContent || name_0 == null) {
        return false;
    }
    buf = asByteBuffer(name_0);
    for (property$iterator = new AbstractList$IteratorImpl_0(this.propertiesContent.properties); property$iterator.i < property$iterator.this$0_0.size_0();) {
        property = dynamicCast($next(property$iterator), Q$JmsPropertiesContent$Property);
        if (sameOrEquals(property.name_0, buf)) {
            return true;
        }
    }
    return false;
}
;
_.recover_0 = function recover(){
    !!this.deliveryListener && $messageRecovered(this.deliveryListener);
}
;
_.setAcknowledgementListener = function setAcknowledgementListener(listener){
    this.acknowledgementListener = listener;
}
;
_.setBooleanProperty_0 = function setBooleanProperty(name_0, value){
    $setProperty(this, name_0, new Boolean_1(value));
}
;
_.setByteProperty_0 = function setByteProperty(name_0, value){
    $setProperty(this, name_0, new Byte_0(value));
}
;
_.setDeliveryListener = function setDeliveryListener(recoveryListener){
    this.deliveryListener = recoveryListener;
}
;
_.setDoubleProperty_0 = function setDoubleProperty(name_0, value){
    $setProperty(this, name_0, new Double_0(value));
}
;
_.setEpochId = function setEpochId(epochId){
    this.epochId = epochId;
}
;
_.setFloatProperty_0 = function setFloatProperty(name_0, value){
    $setProperty(this, name_0, new Float_0(value));
}
;
_.setIntProperty_0 = function setIntProperty(name_0, value){
    $setProperty(this, name_0, new Integer_0(value));
}
;
_.setJMSCorrelationID_0 = function setJMSCorrelationID(correlationID){
    this.correlationID = correlationID;
}
;
_.setJMSDeliveryMode_0 = function setJMSDeliveryMode(deliveryMode){
    this.deliveryMode = deliveryMode;
}
;
_.setJMSDestination_0 = function setJMSDestination(destination){
    this.destination = dynamicCast(destination, Q$GenericDestination);
}
;
_.setJMSExpiration_0 = function setJMSExpiration_0(expiration){
    this.expiration = expiration;
}
;
_.setJMSMessageID_0 = function setJMSMessageID(messageID){
    this.messageID = messageID;
}
;
_.setJMSPriority_0 = function setJMSPriority(priority){
    $setJMSPriority(this, priority);
}
;
_.setJMSRedelivered_0 = function setJMSRedelivered(redelivered){
    this.redelivered = redelivered;
}
;
_.setJMSReplyTo_0 = function setJMSReplyTo(replyTo){
    this.replyTo = dynamicCast(replyTo, Q$GenericDestination);
}
;
_.setJMSTimestamp_0 = function setJMSTimestamp_0(timestamp){
    this.timestamp = timestamp;
}
;
_.setJMSType_0 = function setJMSType(type){
    this.type_0 = type;
}
;
_.setLongProperty_0 = function setLongProperty_0(name_0, value){
    $clinit_JmsDataType();
    if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
        throw new IllegalArgumentException_1('Value is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
    }
    $setProperty(this, name_0, new Long_0(value));
}
;
_.setObjectProperty_0 = function setObjectProperty(name_0, value){
    $setObjectProperty(this, name_0, value);
}
;
_.setShortProperty_0 = function setShortProperty(name_0, value){
    $setProperty(this, name_0, new Short_0(value));
}
;
_.setStringProperty_0 = function setStringProperty(name_0, value){
    $setProperty(this, name_0, value);
}
;
_.setTransactionID = function setTransactionID(txnID){
    this.transactionID = txnID;
}
;
_.setWritable = function setWritable(writable){
    this.writable = writable;
}
;
_.toString$ = function toString_10(){
    return '[MESSAGE: [' + toString_4(this.serverIndex) + '] ' + this.messageID + ']';
}
;
_.acknowledgementListener = null;
_.clientReadIndex = P0_longLit;
_.correlationID = null;
_.deliveryListener = null;
_.deliveryMode = 2;
_.destination = null;
_.disableMessageID = false;
_.epochId = 0;
_.expiration = P0_longLit;
_.messageID = null;
_.priority = 4;
_.propertiesContent = null;
_.redelivered = false;
_.replyTo = null;
_.serverIndex = P0_longLit;
_.timestamp = P0_longLit;
_.transactionID = null;
_.type_0 = null;
_.writable = false;
_.writableProperties = true;
var invalidIdentifierSet, invalidIdentifiers;
function $clinit_GenericBytesMessageImpl(){
    $clinit_GenericBytesMessageImpl = nullMethod;
    $clinit_GenericMessageImpl();
    UTF8_0 = getUTF8();
}

function $clone_0(this$static){
    var clonedMessage;
    clonedMessage = dynamicCast($clone(this$static), Q$GenericBytesMessageImpl);
    clonedMessage.buffer = this$static.buffer.duplicate();
    clonedMessage.initialSize = this$static.initialSize;
    return clonedMessage;
}

function $countUTFBytes(str){
    var charValue, i, length_0, utfCount;
    utfCount = 0;
    length_0 = str.length;
    for (i = 0; i < length_0; ++i) {
        charValue = str.charCodeAt(i);
        charValue > 0 && charValue <= 127?++utfCount:charValue <= 2047?(utfCount += 2):(utfCount += 3);
    }
    return fromInt(utfCount);
}

function $readByte(this$static){
    $checkReadable(this$static);
    if (this$static.buffer.remaining() < 1) {
        throw new MessageEOFException_0;
    }
    return this$static.buffer.get();
}

function GenericBytesMessageImpl_0(buffer){
    $clinit_GenericBytesMessageImpl();
    GenericMessageImpl_1.call(this, null);
    this.buffer = buffer;
    this.initialSize = buffer.remaining();
    this.writable = false;
    this.buffer.mark();
}

function GenericBytesMessageImpl_1(listener){
    $clinit_GenericBytesMessageImpl();
    GenericMessageImpl_1.call(this, listener);
    this.buffer = new /*$wnd.*/ByteBuffer;
    this.initialSize = 0;
    this.writable = true;
    this.buffer.mark();
}

defineSeed(113, 114, makeCastMap([Q$BytesMessage, Q$GenericBytesMessageImpl, Q$GenericMessage]), GenericBytesMessageImpl_0, GenericBytesMessageImpl_1);
_.clearBody_0 = function clearBody_0(){
    this.writable = true;
    this.buffer = new /*$wnd.*/ByteBuffer;
}
;
_.clone = function clone_1(){
    return $clone_0(this);
}
;
_.clone_0 = function clone_2(){
    return $clone_0(this);
}
;
_.createGenericMessage = function createGenericMessage_0(){
    return new GenericBytesMessageImpl_1(this.acknowledgementListener);
}
;
_.getBodyAsBytes = function getBodyAsBytes_0(){
    var size, dst;
    return size = this.writable?this.buffer.position:this.buffer.limit , dst = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, size, 1) , $get(this.buffer, dst, 0, size) , dst;
}
;
_.readBoolean_0 = function readBoolean(){
    $checkReadable(this);
    if (this.buffer.remaining() < 1) {
        throw new MessageEOFException_0;
    }
    return this.buffer.get() != 0;
}
;
_.readByte_0 = function readByte(){
    return $readByte(this);
}
;
_.readChar_0 = function readChar(){
    var charCode;
    $checkReadable(this);
    if (this.buffer.remaining() < 2) {
        throw new MessageEOFException_0;
    }
    charCode = this.buffer.getUnsignedShort();
    return toChars(charCode)[0];
}
;
_.readInt_0 = function readInt(){
    $checkReadable(this);
    if (this.buffer.remaining() < 4) {
        throw new MessageEOFException_0;
    }
    return this.buffer.getInt();
}
;
_.readShort_0 = function readShort(){
    $checkReadable(this);
    if (this.buffer.remaining() < 2) {
        throw new MessageEOFException_0;
    }
    return this.buffer.getShort();
}
;
_.readUTF_0 = function readUTF(){
    var length_0, limit, string;
    $checkReadable(this);
    limit = this.buffer.limit;
    length_0 = this.buffer.getUnsignedShort();
    if (this.buffer.remaining() < length_0) {
        throw new MessageEOFException_0;
    }
    $limit(this.buffer, this.buffer.position + length_0);
    string = $getString(this.buffer, UTF8_0);
    $limit(this.buffer, limit);
    return string;
}
;
_.readUnsignedByte_0 = function readUnsignedByte(){
    var b;
    $checkReadable(this);
    if (this.buffer.remaining() < 1) {
        throw new MessageEOFException_0;
    }
    b = this.buffer.get();
    return b >= 0?b:b + 256;
}
;
_.readUnsignedShort_0 = function readUnsignedShort(){
    $checkReadable(this);
    if (this.buffer.remaining() < 2) {
        throw new MessageEOFException_0;
    }
    return this.buffer.getUnsignedShort();
}
;
_.reset_0 = function reset(){
    this.buffer.position = 0;
    this.writable = false;
}
;
_.setWritable = function setWritable_0(value){
    this.writable && !value && this.buffer.flip();
    this.writable = value;
}
;
_.writeBoolean_0 = function writeBoolean(v){
    $checkWritable(this);
    $put(this.buffer, v?1:0);
}
;
_.writeByte_0 = function writeByte(b){
    $checkWritable(this);
    $put(this.buffer, b);
}
;
_.writeChar_0 = function writeChar(c){
    var v;
    $checkWritable(this);
    v = c << 16 >> 16;
    $putShort(this.buffer, v);
}
;
_.writeInt_0 = function writeInt(v){
    $checkWritable(this);
    $putInt(this.buffer, v);
}
;
_.writeShort_0 = function writeShort(v){
    $checkWritable(this);
    $putShort(this.buffer, v);
}
;
_.writeUTF_0 = function writeUTF(string){
    var length_0, originalPosition, utfCount;
    $checkWritable(this);
    if (string.length > 16383) {
        utfCount = $countUTFBytes(string);
        if (gt(utfCount, Pffff_longLit))
            throw new IllegalArgumentException_1('The encoded string is longer than 65535 bytes');
    }
    originalPosition = this.buffer.position;
    $position(this.buffer, originalPosition + 2);
    $putString(this.buffer, string, UTF8_0);
    length_0 = this.buffer.position - originalPosition - 2;
    $position(this.buffer, originalPosition);
    $putUnsignedShort(this.buffer, length_0 << 16 >> 16);
    $position(this.buffer, this.buffer.position + length_0);
}
;
_.buffer = null;
_.initialSize = 0;
var UTF8_0;
function $addSession(this$static, session){
    session.subscriptionListener = this$static;
    session.acknowledgementListener = this$static;
    session.destinationListener = this$static;
    $setSelectorsSupported(session, this$static.selectorsSupported);
    $setListener(session, this$static.nextListener);
    $addProcessor(this$static.broadcastHandler, session);
}

function $consumerSubscribed(this$static, consumer){
    var destination, durableName, e, messageSelector, subscription, subscriptionKey, subscriptionProcessor;
    destination = consumer.destination;
    try {
        durableName = $globalizeDurableName(this$static, consumer.getDurableSubscriberName());
        subscriptionKey = createSubscriptionKey(destination, durableName, consumer.messageSelector);
        subscriptionProcessor = dynamicCast(this$static.subscriptionProcessors.get_0(subscriptionKey), Q$GenericSubscriptionMessageProcessor);
        if (!subscriptionProcessor) {
            messageSelector = consumer.messageSelector;
            subscription = new GenericSubscription_0(destination, durableName, messageSelector, consumer.acknowledgementMode);
            subscriptionProcessor = new GenericSubscriptionMessageProcessor_0(subscription);
            $setListener_1(subscriptionProcessor, this$static.nextListener);
            $setNextProcessor_1(subscriptionProcessor, this$static.messageProcessorImpl);
            subscriptionProcessor.exceptionListener = this$static;
            this$static.subscriptionProcessors.put_0(subscriptionKey, subscriptionProcessor);
            subscription.subscriptionID == null && this$static.pendingSubscriptionProcessors.put_0(subscription.subscriptionID != null?'SUB:' + subscription.subscriptionID:'SUB:' + (subscription.uniqueID == 0 && (subscription.uniqueID = nextUniqueID++) , subscription.uniqueID), subscriptionProcessor);
            this$static.allSubscriptionProcessors = new ArrayList_2($values(this$static.subscriptionProcessors));
        }
        $consumerSubscribed_0(subscriptionProcessor.subscriptionHandler, consumer);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$JMSException)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, e);
        }
        else
            throw $e0;
    }
}

function $consumerUnsubscribed(this$static, consumer){
    var destination, durableName, e, subscriptionKey, subscriptionProcessor;
    destination = consumer.destination;
    try {
        durableName = $globalizeDurableName(this$static, consumer.getDurableSubscriberName());
        subscriptionKey = createSubscriptionKey(destination, durableName, consumer.messageSelector);
        subscriptionProcessor = dynamicCast(this$static.subscriptionProcessors.get_0(subscriptionKey), Q$GenericSubscriptionMessageProcessor);
        if (!subscriptionProcessor) {
            throw new IllegalStateException_3('Consumer unsubscribed without subscription');
        }
        subscriptionProcessor.subscriptionHandler.consumerUnsubscribed(consumer);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$JMSException)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, e);
        }
        else
            throw $e0;
    }
}

function $getSubscriptionKey(this$static, destinationName){
    var e, result;
    try {
        result = createSubscriptionKey_0(destinationName, null, null);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$JMSException)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, e);
            result = destinationName;
        }
        else
            throw $e0;
    }
    return result;
}

function $getSubscriptionProcessorByID(this$static, subscriptionId){
    var subscriptionProcessor;
    subscriptionProcessor = dynamicCast(this$static.subscriptionProcessors.get_0(subscriptionId), Q$GenericSubscriptionMessageProcessor);
    if (!subscriptionProcessor) {
        throw new IllegalStateException_3('Subscription not found for ID: ' + subscriptionId);
    }
    return subscriptionProcessor;
}

function $globalizeDurableName(this$static, durableName){
    var result;
    if (durableName == null || this$static.durableNameFormat == null || this$static.clientID == null) {
        result = durableName;
    }
    else {
        result = $replace(this$static.durableNameFormat, '{clientID}', this$static.clientID);
        result = $replace(result, '{durableName}', durableName);
    }
    return result;
}

function $messageAcknowledged(this$static, message){
    var subscriptionProcessor;
    subscriptionProcessor = dynamicCast(this$static.subscriptionProcessors.get_0(message.getSubscriptionID()), Q$GenericSubscriptionMessageProcessor);
    if (!subscriptionProcessor) {
        throw new IllegalStateException_3('Message consumed without subscription');
    }
    if (message.getEpochId() != this$static.epochId.value_0) {
        trace('Ignoring ACK. Message: ' + message.getJMSMessageID_0() + ' belongs to older Epoch.');
        return;
    }
    subscriptionProcessor.subscriptionHandler.messageAcknowledged(message);
}

function $onException_1(this$static, e){
    $handleException_1(this$static.exceptionListener, e);
}

function $processConnected_1(this$static, connected){
    var subscriptionProcessor, subscriptionProcessor$iterator;
    this$static.selectorsSupported = connected.selectorsSupported;
    this$static.clientID = connected.clientID;
    this$static.durableNameFormat = connected.durableNameFormat;
    $processConnected_0(this$static.nextMessageProcessor, connected);
    for (subscriptionProcessor$iterator = new AbstractList$IteratorImpl_0(this$static.allSubscriptionProcessors); subscriptionProcessor$iterator.i < subscriptionProcessor$iterator.this$0_0.size_0();) {
        subscriptionProcessor = dynamicCast($next(subscriptionProcessor$iterator), Q$GenericSubscriptionMessageProcessor);
        $processConnected(subscriptionProcessor.redeliveryHandler, connected);
    }
}

function $processDisconnected_0(this$static, disconnected){
    var subscriptionProcessor, subscriptionProcessor$iterator;
    $processDisconnected(this$static.nextMessageProcessor, disconnected);
    for (subscriptionProcessor$iterator = new AbstractList$IteratorImpl_0(this$static.allSubscriptionProcessors); subscriptionProcessor$iterator.i < subscriptionProcessor$iterator.this$0_0.size_0();) {
        subscriptionProcessor = dynamicCast($next(subscriptionProcessor$iterator), Q$GenericSubscriptionMessageProcessor);
        subscriptionProcessor.redeliveryHandler.processDisconnected(disconnected);
    }
}

function $processDropped(this$static){
    var newEpochId, subscriptionMessageProcessors, subscriptionProcessor, subscriptionProcessor$iterator;
    newEpochId = $incrementAndGet(this$static.epochId);
    DEBUG && log_0('New Epoch Id: ' + newEpochId);
    $removeSubscriptionsForTemporaryDestination(this$static);
    subscriptionMessageProcessors = $values(this$static.subscriptionProcessors);
    for (subscriptionProcessor$iterator = $iterator_0(subscriptionMessageProcessors); subscriptionProcessor$iterator.val$outerIter.hasNext();) {
        subscriptionProcessor = dynamicCast($next_1(subscriptionProcessor$iterator), Q$GenericSubscriptionMessageProcessor);
        subscriptionProcessor.redeliveryHandler.processDropped();
    }
}

function $processMessage_0(this$static, message){
    var subscriptionID, subscriptionProcessor;
    message.setEpochId(this$static.epochId.value_0);
    subscriptionID = message.getSubscriptionID();
    subscriptionProcessor = $getSubscriptionProcessorByID(this$static, subscriptionID);
    subscriptionProcessor.redeliveryHandler.processMessage(message);
}

function $processReceipt_0(this$static, receipt){
    var subscriptionId, subscriptionProcessor;
    if (instanceOf(receipt, Q$GenericAckReceipt) || instanceOf(receipt, Q$GenericSubscribeReceipt) || instanceOf(receipt, Q$GenericUnsubscribeReceipt)) {
        subscriptionId = receipt.getSubscriptionID();
        subscriptionProcessor = dynamicCast(this$static.subscriptionProcessors.get_0(subscriptionId), Q$GenericSubscriptionMessageProcessor);
        if (!subscriptionProcessor && instanceOf(receipt, Q$GenericSubscribeReceipt)) {
            subscriptionProcessor = dynamicCast(this$static.pendingSubscriptionProcessors.remove(receipt.getReceiptID()), Q$GenericSubscriptionMessageProcessor);
            !!subscriptionProcessor && this$static.subscriptionProcessors.put_0(subscriptionId, subscriptionProcessor);
        }
        subscriptionProcessor?$processReceipt_2(subscriptionProcessor, receipt):instanceOf(receipt, Q$GenericAckReceipt) || DEBUG && log_0('Subscription not found for ID: ' + subscriptionId + ' while processing receipt ' + receipt);
    }
    else {
        $processReceipt(this$static.nextMessageProcessor, receipt);
    }
}

function $processStart_0(this$static){
    var subscriptionProcessor, subscriptionProcessor$iterator, subscriptionProcessorsSnapshot;
    $processStart(this$static.nextMessageProcessor);
    subscriptionProcessorsSnapshot = new ArrayList_2($values(this$static.subscriptionProcessors));
    for (subscriptionProcessor$iterator = new AbstractList$IteratorImpl_0(subscriptionProcessorsSnapshot); subscriptionProcessor$iterator.i < subscriptionProcessor$iterator.this$0_0.size_0();) {
        subscriptionProcessor = dynamicCast($next(subscriptionProcessor$iterator), Q$GenericSubscriptionMessageProcessor);
        subscriptionProcessor.redeliveryHandler.nextProcessor.processStart();
    }
}

function $processStop_0(this$static){
    var subscriptionProcessor, subscriptionProcessor$iterator, subscriptionProcessorsSnapshot;
    $processStop(this$static.nextMessageProcessor);
    subscriptionProcessorsSnapshot = new ArrayList_2($values(this$static.subscriptionProcessors));
    for (subscriptionProcessor$iterator = new AbstractList$IteratorImpl_0(subscriptionProcessorsSnapshot); subscriptionProcessor$iterator.i < subscriptionProcessor$iterator.this$0_0.size_0();) {
        subscriptionProcessor = dynamicCast($next(subscriptionProcessor$iterator), Q$GenericSubscriptionMessageProcessor);
        subscriptionProcessor.redeliveryHandler.nextProcessor.processStop();
    }
}

function $removeSession(this$static, session){
    $removeProcessor(this$static.broadcastHandler, session);
}

function $removeSubscriptionsForTemporaryDestination(this$static){
    $removeTempDestinationProcessors(this$static.allSubscriptionProcessors);
    $removeTempDestinationProcessorEntries(this$static.pendingSubscriptionProcessors);
    $removeTempDestinationProcessorEntries(this$static.subscriptionProcessors);
}

function $removeTempDestinationProcessorEntries(processors){
    var destination, processor, processorsIterator;
    processorsIterator = processors.entrySet().iterator();
    while (processorsIterator.hasNext()) {
        processor = dynamicCast(dynamicCast(processorsIterator.next_0(), Q$Map$Entry).getValue_0(), Q$GenericSubscriptionMessageProcessor);
        destination = processor.subscription.destination;
        instanceOf(destination, Q$GenericTemporaryDestination) && processorsIterator.remove_1();
    }
}

function $removeTempDestinationProcessors(processors){
    var destination, processor, processorsIterator;
    processorsIterator = new AbstractList$IteratorImpl_0(processors);
    while (processorsIterator.i < processorsIterator.this$0_0.size_0()) {
        processor = dynamicCast($next(processorsIterator), Q$GenericSubscriptionMessageProcessor);
        destination = processor.subscription.destination;
        instanceOf(destination, Q$GenericTemporaryDestination) && $remove_2(processorsIterator);
    }
}

function $temporaryQueueCreated(this$static, temporaryQueue){
    var creation, receiptID;
    creation = new GenericCreation_0(temporaryQueue);
    receiptID = 'CRE:' + $getSubscriptionKey(this$static, temporaryQueue.queueName);
    $destinationCreated(this$static.nextListener, creation, receiptID);
}

function $temporaryQueueDeleted(this$static, temporaryQueue){
    var deletion, receiptID;
    deletion = new GenericDeletion_0(temporaryQueue);
    receiptID = 'DEL:' + $getSubscriptionKey(this$static, temporaryQueue.queueName);
    $destinationDeleted(this$static.nextListener, deletion, receiptID);
}

function $temporaryTopicCreated(this$static, temporaryTopic){
    var creation, receiptID;
    creation = new GenericCreation_0(temporaryTopic);
    receiptID = 'CRE:' + $getSubscriptionKey(this$static, temporaryTopic.topicName);
    $destinationCreated(this$static.nextListener, creation, receiptID);
}

function $temporaryTopicDeleted(this$static, temporaryTopic){
    var deletion, receiptID;
    deletion = new GenericDeletion_0(temporaryTopic);
    receiptID = 'DEL:' + $getSubscriptionKey(this$static, temporaryTopic.topicName);
    $destinationDeleted(this$static.nextListener, deletion, receiptID);
}

function $unsubscribed(this$static, durableName){
    var deletion, receiptID;
    deletion = new GenericSubscriberDeletion_0($globalizeDurableName(this$static, durableName));
    receiptID = 'DELD:' + durableName;
    $subscriberDeleted(this$static.nextListener, deletion, receiptID);
}

function $updateProcessors(this$static){
    this$static.allSubscriptionProcessors = new ArrayList_2($values(this$static.subscriptionProcessors));
}

function GenericConcentratorImpl_0(){
    this.subscriptionProcessors = new HashMap_0;
    this.pendingSubscriptionProcessors = new HashMap_0;
    this.allSubscriptionProcessors = new ArrayList_1;
    this.broadcastHandler = new GenericBroadcastHandler_0;
    this.epochId = new AtomicInteger_0(0);
    this.messageProcessorImpl = new GenericConcentratorImpl$2_0(this);
    this.nextMessageProcessor = this.broadcastHandler;
}

defineSeed(115, 1, makeCastMap([Q$GenericMessageProcessor]), GenericConcentratorImpl_0);
_.messageAcknowledged = function messageAcknowledged(message){
    $messageAcknowledged(this, message);
}
;
_.onException_0 = function onException_3(e){
    $onException_1(this, e);
}
;
_.processClose = function processClose_1(){
    $processClose(this.nextMessageProcessor);
}
;
_.processConnected = function processConnected_1(connected){
    $processConnected_1(this, connected);
}
;
_.processDisconnected = function processDisconnected_1(disconnected){
    $processDisconnected_0(this, disconnected);
}
;
_.processMessage = function processMessage_1(message){
    $processMessage_0(this, message);
}
;
_.processOpen = function processOpen_1(){
    $processOpen(this.nextMessageProcessor);
}
;
_.processReceipt = function processReceipt_1(receipt){
    $processReceipt_0(this, receipt);
}
;
_.processStart = function processStart_1(){
    $processStart_0(this);
}
;
_.processStop = function processStop_1(){
    $processStop_0(this);
}
;
_.clientID = null;
_.durableNameFormat = null;
_.exceptionListener = null;
_.nextListener = null;
_.nextMessageProcessor = null;
_.selectorsSupported = false;
function GenericConcentratorImpl$2_0(this$0){
    this.this$0 = this$0;
}

defineSeed(117, 1, makeCastMap([Q$GenericMessageProcessor]), GenericConcentratorImpl$2_0);
_.processClose = function processClose_2(){
}
;
_.processConnected = function processConnected_2(connected){
}
;
_.processDisconnected = function processDisconnected_2(disconnected){
}
;
_.processMessage = function processMessage_2(message){
}
;
_.processOpen = function processOpen_2(){
}
;
_.processReceipt = function processReceipt_2(receipt){
    var subscription, subscriptionID, subscriptionKey, subscriptionProcessor;
    if (instanceOf(receipt, Q$GenericUnsubscribeReceipt)) {
        subscriptionID = dynamicCast(receipt, Q$GenericUnsubscribeReceipt).subscriptionID;
        subscriptionProcessor = dynamicCast(this.this$0.subscriptionProcessors.get_0(subscriptionID), Q$GenericSubscriptionMessageProcessor);
        if (subscriptionProcessor.subscriptionHandler.consumers.arrayList.size <= 0) {
            this.this$0.subscriptionProcessors.remove(subscriptionID);
            subscription = subscriptionProcessor.subscription;
            subscriptionKey = subscription.subscriptionKey;
            subscriptionKey != subscriptionID && this.this$0.subscriptionProcessors.remove(subscriptionKey);
            $updateProcessors(this.this$0);
        }
    }
    else {
        $processReceipt(this.this$0.nextMessageProcessor, receipt);
    }
}
;
_.processStart = function processStart_2(){
}
;
_.processStop = function processStop_2(){
}
;
_.this$0 = null;
function GenericConnected_0(){
}

defineSeed(118, 1, {}, GenericConnected_0);
_.clientID = null;
_.durableNameFormat = null;
_.interrupted = false;
_.selectorsSupported = false;
function GenericConnectionMetaData_0(){
    this.jmsxProperties = new Properties_0;
    new HashMap_0;
}

defineSeed(119, 1, {}, GenericConnectionMetaData_0);
_.getJMSMajorVersion_0 = function getJMSMajorVersion(){
    return 1;
}
;
_.getJMSMinorVersion_0 = function getJMSMinorVersion(){
    return 1;
}
;
_.getJMSProviderName_0 = function getJMSProviderName(){
    return 'Kaazing JMS JavaScript Client Library';
}
;
_.getJMSVersion_0 = function getJMSVersion(){
    return '1.1';
}
;
_.getJMSXPropertyNames_0 = function getJMSXPropertyNames(){
    return $elements(this.jmsxProperties);
}
;
_.getProviderMajorVersion_0 = function getProviderMajorVersion(){
    return 4;
}
;
_.getProviderMinorVersion_0 = function getProviderMinorVersion(){
    return 0;
}
;
_.getProviderVersion_0 = function getProviderVersion(){
    return '4.0';
}
;
function GenericCreation_0(destination){
    this.destination = destination;
}

defineSeed(120, 1, {}, GenericCreation_0);
_.destination = null;
function GenericDeletion_0(destination){
    this.destination = destination;
}

defineSeed(121, 1, {}, GenericDeletion_0);
_.destination = null;
function $clinit_GenericDestinationFactory(){
    $clinit_GenericDestinationFactory = nullMethod;
    FACTORY = new GenericDestinationFactory_0;
}

function $createQueueInternal(queueName, queueListener){
    if (queueName.indexOf('/queue/') == 0) {
        return new GenericQueueImpl_0(queueName);
    }
    else if (queueName.indexOf('/temp-queue/') == 0) {
        return new GenericTemporaryQueueImpl_0(queueName, queueListener);
    }
    else if (queueName.indexOf('/remote-temp-queue/') == 0) {
        return new GenericRemoteTemporaryQueueImpl_0(queueName);
    }
    else {
        throw new Error_1('InvalidDestinationException: Unknown destination: ' + queueName);
    }
}

function $createTopicInternal(topicName, topicListener){
    if (topicName.indexOf('/topic/') == 0) {
        return new GenericTopicImpl_0(topicName);
    }
    else if (topicName.indexOf('/temp-topic/') == 0) {
        return new GenericTemporaryTopicImpl_0(topicName, topicListener);
    }
    else if (topicName.indexOf('/remote-temp-topic/') == 0) {
        return new GenericRemoteTemporaryTopicImpl_0(topicName);
    }
    else {
        throw new Error_1('InvalidDestinationException: Unknown destination: ' + topicName);
    }
}

function $lookup(this$static, destinationName){
    var destination;
    destination = dynamicCast(this$static.destinations.get_0(destinationName), Q$GenericDestination);
    if (destination) {
        return destination;
    }
    else if (destinationName.indexOf('/topic/') == 0 || destinationName.indexOf('/temp-topic/') == 0 || destinationName.indexOf('/remote-temp-topic/') == 0) {
        return $createTopicInternal(destinationName, null);
    }
    else if (destinationName.indexOf('/queue/') == 0 || destinationName.indexOf('/temp-queue/') == 0 || destinationName.indexOf('/remote-temp-queue/') == 0) {
        return $createQueueInternal(destinationName, null);
    }
    else {
        throw new JMSException_0('Unknown destination: ' + destinationName + '.  Example: /topic/destination');
    }
}

function GenericDestinationFactory_0(){
    this.destinations = new HashMap_0;
}

defineSeed(122, 1, makeCastMap([Q$Serializable]), GenericDestinationFactory_0);
var FACTORY;
defineSeed(123, 1, makeCastMap([Q$GenericDestination, Q$Serializable]));
_.toString$ = function toString_11(){
    return this.getName();
}
;
function GenericDisconnected_0(){
}

defineSeed(124, 1, {}, GenericDisconnected_0);
_.interrupted = false;
function $consumerSubscribed_0(this$static, consumer){
    $add_1(this$static.consumers, consumer);
    this$static.consumers.arrayList.size == 1 && this$static.listener.subscribed(this$static.subscription);
}

function $consumerUnsubscribed_0(this$static, consumer){
    var receiptID;
    $remove(this$static.consumers, consumer);
    if (this$static.consumers.arrayList.size == 0) {
        receiptID = 'UNS:' + this$static.subscription.subscriptionID;
        this$static.listener.unsubscribed(this$static.subscription, receiptID, false);
    }
}

function GenericSubscriptionHandler_0(subscription){
    GenericMessageProcessorAdapter_0.call(this);
    this.consumers = new CopyOnWriteArrayList_0;
    this.subscription = subscription;
}

defineSeed(127, 112, makeCastMap([Q$GenericMessageProcessor]));
_.consumerUnsubscribed = function consumerUnsubscribed(consumer){
    $consumerUnsubscribed_0(this, consumer);
}
;
_.processConnected = function processConnected_3(connected){
    if (connected.interrupted)
        ;
    else
        this.consumers.arrayList.size > 0 && this.listener.subscribed(this.subscription);
    this.nextProcessor.processConnected(connected);
}
;
_.processMessage = function processMessage_3(message){
    var consumer, consumer$iterator, consumerProcessor, nextMessage;
    for (consumer$iterator = new AbstractList$IteratorImpl_0(this.consumers.arrayList); consumer$iterator.i < consumer$iterator.this$0_0.size_0();) {
        consumer = dynamicCast($next(consumer$iterator), Q$GenericMessageConsumer);
        consumerProcessor = consumer.getMessageProcessor();
        nextMessage = message.clone();
        consumerProcessor.processMessage(nextMessage);
    }
}
;
_.subscription = null;
function GenericTopicSubscriptionHandler_0(subscription){
    GenericSubscriptionHandler_0.call(this, subscription);
}

defineSeed(126, 127, makeCastMap([Q$GenericMessageProcessor]), GenericTopicSubscriptionHandler_0);
_.messageAcknowledged = function messageAcknowledged_0(message){
}
;
_.processMessage = function processMessage_4(message){
    var consumer, consumer$iterator, consumerProcessor, nextMessage;
    for (consumer$iterator = new AbstractList$IteratorImpl_0(this.consumers.arrayList); consumer$iterator.i < consumer$iterator.this$0_0.size_0();) {
        consumer = dynamicCast($next(consumer$iterator), Q$GenericMessageConsumer);
        nextMessage = message.clone();
        consumerProcessor = consumer.getMessageProcessor();
        consumerProcessor.processMessage(nextMessage);
    }
}
;
function GenericDurableSubscriptionHandler_0(subscription){
    GenericTopicSubscriptionHandler_0.call(this, subscription);
}

defineSeed(125, 126, makeCastMap([Q$GenericMessageProcessor]), GenericDurableSubscriptionHandler_0);
_.messageAcknowledged = function messageAcknowledged_1(message){
    this.listener.messageAcknowledged(message);
}
;
function GenericFuture$1_0(val$future){
    $clinit_Timer();
    this.val$future = val$future;
}

defineSeed(128, 52, makeCastMap([Q$Timer]), GenericFuture$1_0);
_.run_0 = function run(){
    $fulfillInternal(this.val$future);
}
;
_.val$future = null;
function GenericFuture$3_0(val$future, val$e){
    $clinit_Timer();
    this.val$future = val$future;
    this.val$e = val$e;
}

defineSeed(129, 52, makeCastMap([Q$Timer]), GenericFuture$3_0);
_.run_0 = function run_0(){
    $throwException_2(this.val$future, this.val$e);
}
;
_.val$e = null;
_.val$future = null;
function $setNextProcessor_0(this$static, processor){
    processor.listener = this$static;
    this$static.nextProcessor = processor;
}

function GenericRedeliveryHandler_0(subscription, acknowledgementMode){
    GenericMessageProcessorAdapter_0.call(this);
    subscription.acknowledgementMode = acknowledgementMode;
    this.subscription = subscription;
}

defineSeed(131, 112, makeCastMap([Q$GenericMessageProcessor]));
_.messageAcknowledged = function messageAcknowledged_2(message){
}
;
_.processDropped = function processDropped(){
}
;
_.processMessage = function processMessage_5(message){
    this.nextProcessor.processMessage(message);
}
;
_.processReceipt = function processReceipt_3(receipt){
    this.nextProcessor.processReceipt(receipt);
}
;
_.setListener = function setListener(listener){
    this.listener = listener;
}
;
_.subscribed = function subscribed(subscription){
    this.listener.subscribed(subscription);
}
;
_.unsubscribed = function unsubscribed(subscription, receiptId, stopped){
    this.listener.unsubscribed(subscription, receiptId, stopped);
}
;
_.subscription = null;
function $handlePendingAcknowledgements(this$static, gatherAcknowledgedMessages){
    var messageId, messageId$iterator;
    gatherAcknowledgedMessages && this$static.duplicateAcknowledgedMessages.addAll(this$static.pendingAcknowledgedMessages);
    for (messageId$iterator = $iterator($keySet(this$static.pendingAcknowledgedMessages.map)); messageId$iterator.val$outerIter.hasNext();) {
        messageId = dynamicCast($next_0(messageId$iterator), Q$String);
        $handleException(this$static, new JMSException_0('Message acknowledgement did not receive receipt: ' + messageId));
    }
    this$static.pendingAcknowledgedMessages.map.clear();
}

function $messageAcknowledged_0(this$static, message){
    $add_5(this$static.pendingAcknowledgedMessages, message.getJMSMessageID_0());
    message.setReceiptID('ACK:' + this$static.subscription.subscriptionID + ';' + message.getJMSMessageID_0());
    this$static.listener.messageAcknowledged(message);
}

function GenericGuaranteedRedeliveryHandler_0(subscription){
    GenericRedeliveryHandler_0.call(this, subscription, 3);
    this.pendingAcknowledgedMessages = new HashSet_0;
    this.duplicateAcknowledgedMessages = new HashSet_0;
}

defineSeed(130, 131, makeCastMap([Q$GenericMessageProcessor]), GenericGuaranteedRedeliveryHandler_0);
_.messageAcknowledged = function messageAcknowledged_3(message){
    $messageAcknowledged_0(this, message);
}
;
_.processClose = function processClose_3(){
    $handlePendingAcknowledgements(this, false);
    this.nextProcessor.processClose();
}
;
_.processDisconnected = function processDisconnected_3(disconnected){
    var gatherAcknowledgedMessages;
    gatherAcknowledgedMessages = disconnected.interrupted && this.subscription.sessionAcknowledgementMode != 3;
    $handlePendingAcknowledgements(this, gatherAcknowledgedMessages);
    this.nextProcessor.processDisconnected(disconnected);
}
;
_.processDropped = function processDropped_0(){
    var gatherAcknowledgedMessages;
    gatherAcknowledgedMessages = this.subscription.sessionAcknowledgementMode != 3;
    $handlePendingAcknowledgements(this, gatherAcknowledgedMessages);
}
;
_.processMessage = function processMessage_6(message){
    if ($remove_5(this.duplicateAcknowledgedMessages, message.getJMSMessageID_0())) {
        trace('Duplicate Message: ' + message.getJMSMessageID_0() + '. Implicitly ACKing.');
        $messageAcknowledged_0(this, message);
    }
    else {
        this.nextProcessor.processMessage(message);
    }
}
;
_.processReceipt = function processReceipt_4(receipt){
    var receiptMessageId;
    if (instanceOf(receipt, Q$GenericAckReceipt)) {
        receiptMessageId = dynamicCast(receipt, Q$GenericAckReceipt).messageID;
        $remove_5(this.pendingAcknowledgedMessages, receiptMessageId);
    }
    else {
        this.nextProcessor.processReceipt(receipt);
    }
}
;
_.setListener = function setListener_0(listener){
    this.listener = listener;
}
;
function $clone_1(this$static){
    var clonedMessage;
    clonedMessage = dynamicCast($clone(this$static), Q$GenericMapMessageImpl);
    clonedMessage.map = new HashMap_2(this$static.map);
    return clonedMessage;
}

function $getBytes_1(this$static, name_0){
    var prop;
    prop = $getItem(this$static, name_0);
    if (prop == null) {
        return null;
    }
    else if (instanceOf(prop, Q$byte_$1)) {
        return dynamicCast(prop, Q$byte_$1);
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}

function $getItem(this$static, name_0){
    if (name_0 == null || $equals_2('', name_0)) {
        throw new IllegalArgumentException_1('Map item names cannot be empty or null');
    }
    return this$static.map.get_0(name_0);
}

function $getLong(this$static, name_0){
    var prop, value;
    prop = $getItem(this$static, name_0);
    if (prop == null) {
        return (new Long_0(__parseAndValidateLong(null))).value_0;
    }
    else if (instanceOf(prop, Q$Long)) {
        value = dynamicCast(prop, Q$Long).value_0;
        $clinit_JmsDataType();
        if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
            throw new JMSException_0('Value ' + toString_4(value) + ' received is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
        }
        return value;
    }
    else if (instanceOf(prop, Q$Integer)) {
        return fromInt(dynamicCast(prop, Q$Integer).value_0);
    }
    else if (instanceOf(prop, Q$Short)) {
        return fromInt(dynamicCast(prop, Q$Short).value_0);
    }
    else if (instanceOf(prop, Q$Byte)) {
        return fromInt(dynamicCast(prop, Q$Byte).value_0);
    }
    else if (instanceOf(prop, Q$String)) {
        value = __parseAndValidateLong(dynamicCast(prop, Q$String));
        $clinit_JmsDataType();
        if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
            throw new JMSException_0('Value ' + toString_4(value) + ' received is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
        }
        return value;
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}

function $getMapNames(this$static){
    var names;
    names = $iterator($keySet(this$static.map));
    return new GenericMapMessageImpl$1_0(names);
}

function $getObject(this$static, name_0){
    var obj, value;
    obj = $getItem(this$static, name_0);
    if (instanceOf(obj, Q$Long)) {
        value = (new Long_0(__parseAndValidateLong(toString__devirtual$(obj)))).value_0;
        $clinit_JmsDataType();
        if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
            throw new JMSException_0('Value ' + toString_4(value) + ' which is received as long type is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
        }
    }
    return obj;
}

function $setItem(this$static, name_0, value){
    if (!this$static.writable) {
        throw new MessageNotWriteableException_0('Map not writable');
    }
    if (name_0 == null || $equals_2('', name_0)) {
        throw new IllegalArgumentException_1('Map item names cannot be empty or null');
    }
    this$static.map.put_0(name_0, value);
}

function $setLong(this$static, name_0, value){
    $clinit_JmsDataType();
    if (!(gte_0(value, N20000000000000_longLit) && lte(value, P20000000000000_longLit))) {
        throw new IllegalArgumentException_1('Value is out of range. The maximum integral value supported in javascript ranges from -9,007,199,254,740,992 (-2^53) to 9,007,199,254,740,992 (2^53).');
    }
    $setItem(this$static, name_0, new Long_0(value));
}

function $setObject(this$static, name_0, value){
    if (value == null || instanceOf(value, Q$String) || instanceOf(value, Q$Boolean) || instanceOf(value, Q$Byte) || instanceOf(value, Q$Short) || instanceOf(value, Q$Integer) || instanceOf(value, Q$Long) || instanceOf(value, Q$Float) || instanceOf(value, Q$Double) || instanceOf(value, Q$Character) || instanceOf(value, Q$byte_$1)) {
        $setItem(this$static, name_0, value);
    }
    else {
        throw new JMSException_0('Object value must be one of Boolean, Byte, Short, Integer, Long, Float, Double, Character, String or byte[]');
    }
}

function GenericMapMessageImpl_0(acknowledgementListener){
    $clinit_GenericMessageImpl();
    GenericMessageImpl_1.call(this, acknowledgementListener);
    this.map = new HashMap_0;
    this.writable = true;
}

defineSeed(132, 114, makeCastMap([Q$MapMessage, Q$GenericMapMessage, Q$GenericMapMessageImpl, Q$GenericMessage]), GenericMapMessageImpl_0);
_.clearBody_0 = function clearBody_1(){
    this.writable = true;
    this.map = new HashMap_0;
}
;
_.clone = function clone_3(){
    return $clone_1(this);
}
;
_.clone_0 = function clone_4(){
    return $clone_1(this);
}
;
_.createGenericMessage = function createGenericMessage_1(){
    return new GenericMapMessageImpl_0(this.acknowledgementListener);
}
;
_.getBoolean_0 = function getBoolean(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        return ($clinit_Boolean() , $equalsIgnoreCase('true', null)?TRUE:FALSE).value_0;
    }
    else if (instanceOf(prop, Q$Boolean)) {
        return dynamicCast(prop, Q$Boolean).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return $clinit_Boolean() , $equalsIgnoreCase('true', dynamicCast(prop, Q$String));
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}
;
_.getByte_0 = function getByte(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        return valueOf(__parseAndValidateInt(null, -128, 127) << 24 >> 24).value_0;
    }
    else if (instanceOf(prop, Q$Byte)) {
        return dynamicCast(prop, Q$Byte).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateInt(toString__devirtual$(prop), -128, 127) << 24 >> 24;
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}
;
_.getChar_0 = function getChar(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        throw new NullPointerException_0;
    }
    else if (instanceOf(prop, Q$Character)) {
        return dynamicCast(prop, Q$Character).value_0;
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}
;
_.getDouble_0 = function getDouble(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        return (new Double_0(__parseAndValidateDouble(null))).value_0;
    }
    else if (instanceOf(prop, Q$Double)) {
        return dynamicCast(prop, Q$Double).value_0;
    }
    else if (instanceOf(prop, Q$Float)) {
        return dynamicCast(prop, Q$Float).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateDouble(dynamicCast(prop, Q$String));
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}
;
_.getFloat_0 = function getFloat(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        return (new Float_0(parseFloat_0(null))).value_0;
    }
    else if (instanceOf(prop, Q$Float)) {
        return dynamicCast(prop, Q$Float).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return parseFloat_0(dynamicCast(prop, Q$String));
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}
;
_.getInt_0 = function getInt(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        return valueOf_1(__parseAndValidateInt(null, -2147483648, 2147483647)).value_0;
    }
    else if (instanceOf(prop, Q$Integer)) {
        return dynamicCast(prop, Q$Integer).value_0;
    }
    else if (instanceOf(prop, Q$Short)) {
        return dynamicCast(prop, Q$Short).value_0;
    }
    else if (instanceOf(prop, Q$Byte)) {
        return dynamicCast(prop, Q$Byte).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateInt(toString__devirtual$(prop), -2147483648, 2147483647);
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}
;
_.getShort_0 = function getShort(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        return valueOf_3(__parseAndValidateInt(null, -32768, 32767) << 16 >> 16).value_0;
    }
    else if (instanceOf(prop, Q$Short)) {
        return dynamicCast(prop, Q$Short).value_0;
    }
    else if (instanceOf(prop, Q$Byte)) {
        return dynamicCast(prop, Q$Byte).value_0;
    }
    else if (instanceOf(prop, Q$String)) {
        return __parseAndValidateInt(toString__devirtual$(prop), -32768, 32767) << 16 >> 16;
    }
    else
        throw new MessageFormatException_0('Invalid map entry type');
}
;
_.getString_0 = function getString(name_0){
    var prop;
    prop = $getItem(this, name_0);
    if (prop == null) {
        return null;
    }
    else if (instanceOf(prop, Q$byte_$1)) {
        throw new MessageFormatException_0('Invalid map entry type');
    }
    else {
        return toString__devirtual$(prop);
    }
}
;
_.itemExists_0 = function itemExists(name_0){
    return this.map.containsKey(name_0);
}
;
_.setBoolean_0 = function setBoolean(name_0, value){
    $setItem(this, name_0, new Boolean_1(value));
}
;
_.setByte_0 = function setByte(name_0, value){
    $clinit_JmsDataType();
    value >= -128 && value <= 127 || (value = $putAt(new /*$wnd.*/ByteBuffer.allocate(0), 0, value).get());
    $setItem(this, name_0, new Byte_0(value));
}
;
_.setChar_0 = function setChar(name_0, value){
    $setItem(this, name_0, new Character_0(value));
}
;
_.setDouble_0 = function setDouble(name_0, value){
    $setItem(this, name_0, new Double_0(value));
}
;
_.setFloat_0 = function setFloat(name_0, value){
    $setItem(this, name_0, new Float_0(value));
}
;
_.setInt_0 = function setInt(name_0, value){
    $clinit_JmsDataType();
    value >= -2147483648 && value <= 2147483647 || (value = $putIntAt(new /*$wnd.*/ByteBuffer.allocate(4), 0, value).getInt());
    $setItem(this, name_0, new Integer_0(value));
}
;
_.setObject_0 = function setObject(name_0, value){
    $setObject(this, name_0, value);
}
;
_.setShort_0 = function setShort(name_0, value){
    $clinit_JmsDataType();
    value >= -32768 && value <= 32767 || (value = $putShortAt(new /*$wnd.*/ByteBuffer.allocate(2), 0, value).getShort());
    $setItem(this, name_0, new Short_0(value));
}
;
_.setString_0 = function setString(name_0, value){
    $setItem(this, name_0, value);
}
;
_.map = null;
function GenericMapMessageImpl$1_0(val$names){
    this.val$names = val$names;
}

defineSeed(133, 1, {}, GenericMapMessageImpl$1_0);
_.hasMoreElements_0 = function hasMoreElements(){
    return this.val$names.val$outerIter.hasNext();
}
;
_.nextElement_0 = function nextElement(){
    return $next_0(this.val$names);
}
;
_.val$names = null;
function $addToQueue(this$static, message, isRecovered){
    isRecovered?$add(this$static.recoveredMessageQueue, message):$add(this$static.messageQueue, message);
}

function $checkDestinationValid(this$static){
    if (instanceOf(this$static.destination, Q$GenericTemporaryDestination) && !dynamicCast(this$static.destination, Q$GenericTemporaryDestination).isValid()) {
        throw new JMSException_0('Temporary Destination - ' + dynamicCast(this$static.destination, Q$GenericTemporaryDestination).getName() + ' is invalid. It must have been created before the connection got dropped/interrupted. Please re-create the temporary destination.');
    }
}

function $close(this$static, callback){
    var future;
    future = new VoidFuture_0(callback);
    if ($transitionIf(this$static.consumerState, 1, 2)) {
        $checkDestinationValid(this$static);
        this$static.closeFuture = future;
        $synchronize(this$static.messageSemaphore, new GenericMessageConsumerImpl$1_0(this$static, this$static));
    }
    else {
        $schedule(new GenericFuture$1_0(future), 1);
    }
    return future;
}

function $closeComplete(this$static){
    if ($transitionIf(this$static.consumerState, 2, 3)) {
        $consumerClosed(this$static.listener, this$static);
    }
    else {
        throw new IllegalStateException_3('Message Consumer not closing');
    }
    try {
        $schedule(new GenericFuture$1_0(this$static.closeFuture), 1);
    }
    finally {
        this$static.closeFuture = null;
    }
}

function $processRecoveredMessage(this$static, message){
    this$static.consumerState.state.value_0 == 1 && (this$static.messageListener?$synchronize(this$static.messageSemaphore, new GenericMessageConsumerImpl$3_0(this$static, message, true)):$add(this$static.recoveredMessageQueue, message));
}

function $receiveNoWait(this$static){
    var message;
    if (this$static.messageListener) {
        throw new IllegalStateException_3('Cannot deliver messages via receive when consumer has message listener');
    }
    $checkDestinationValid(this$static);
    message = this$static.recoveredMessageQueue.queue.size == 0?$receiveNoWait_0(this$static.messageQueue):$receiveNoWait_0(this$static.recoveredMessageQueue);
    !!message && $messageConsumed(this$static.listener, message);
    return message;
}

function $retrieveFromQueue(this$static){
    return this$static.recoveredMessageQueue.queue.size == 0?$receiveNoWait_0(this$static.messageQueue):$receiveNoWait_0(this$static.recoveredMessageQueue);
}

function $setExceptionListener(this$static, exceptionListener){
    this$static.exceptionListener = exceptionListener;
}

function GenericMessageConsumerImpl_0(destination, messageSelector, acknowledgementMode, listener, messageSemaphore){
    this.consumerState = new GenericMessageConsumerImpl$ConsumerState_0;
    this.destination = destination;
    this.messageSelector = messageSelector != null && !$equals_2('', messageSelector)?messageSelector:null;
    this.acknowledgementMode = acknowledgementMode;
    this.listener = listener;
    this.messageQueue = new GenericMessageQueueImpl_0;
    this.recoveredMessageQueue = new GenericMessageQueueImpl_0;
    this.messageSemaphore = messageSemaphore;
}

defineSeed(134, 1, makeCastMap([Q$GenericMessageConsumer]), GenericMessageConsumerImpl_0);
_.clearQueuedMessages = function clearQueuedMessages(){
    $clear(this.messageQueue.queue);
    $clear(this.recoveredMessageQueue.queue);
}
;
_.close_0 = function close_0(callback){
    return $close(this, callback);
}
;
_.getDestination_1 = function getDestination(){
    return this.destination;
}
;
_.getDurableSubscriberName = function getDurableSubscriberName(){
    return null;
}
;
_.getMessageListener_0 = function getMessageListener(){
    return this.messageListener;
}
;
_.getMessageProcessor = function getMessageProcessor(){
    return this.messageProcessor;
}
;
_.getMessageSelector_0 = function getMessageSelector(){
    return this.messageSelector;
}
;
_.receiveNoWait_0 = function receiveNoWait(){
    return $receiveNoWait(this);
}
;
_.setMessageListener_0 = function setMessageListener(messageListener){
    var consumer;
    consumer = this;
    $acquire(this.messageSemaphore, new GenericMessageConsumerImpl$2_0(this, consumer, messageListener));
}
;
_.acknowledgementMode = 0;
_.closeFuture = null;
_.destination = null;
_.exceptionListener = null;
_.listener = null;
_.messageListener = null;
_.messageProcessor = null;
_.messageQueue = null;
_.messageSelector = null;
_.messageSemaphore = null;
_.recoveredMessageQueue = null;
function GenericMessageConsumerImpl$1_0(this$0, val$consumer){
    this.this$0 = this$0;
    this.val$consumer = val$consumer;
}

defineSeed(135, 1, makeCastMap([Q$GenericSemaphoreListener]), GenericMessageConsumerImpl$1_0);
_.whenAcquired = function whenAcquired(semaphore){
    var e;
    try {
        !$getAndSet(this.this$0.messageQueue.closing);
        !$getAndSet(this.this$0.recoveredMessageQueue.closing);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $printStackTrace(e);
        }
        else
            throw $e0;
    }
    instanceOf(this.val$consumer, Q$GenericTopicSubscriber) || $consumerUnsubscribed_1(this.this$0.listener, this.val$consumer);
    $closeComplete(this.this$0);
}
;
_.this$0 = null;
_.val$consumer = null;
function GenericMessageConsumerImpl$2_0(this$0, val$consumer, val$messageListener){
    this.this$0 = this$0;
    this.val$consumer = val$consumer;
    this.val$messageListener = val$messageListener;
}

defineSeed(136, 1, makeCastMap([Q$GenericSemaphoreListener]), GenericMessageConsumerImpl$2_0);
_.whenAcquired = function whenAcquired_0(semaphore){
    this.val$consumer.messageListener = this.val$messageListener;
    $release(this.this$0.messageSemaphore);
    while ((this.this$0.messageQueue.queue.size != 0 || this.this$0.recoveredMessageQueue.queue.size != 0) && this.this$0.consumerState.state.value_0 == 1 && !!this.val$messageListener) {
        $synchronize(this.this$0.messageSemaphore, new GenericMessageConsumerImpl$2$1_0(this, this.val$messageListener));
    }
}
;
_.this$0 = null;
_.val$consumer = null;
_.val$messageListener = null;
function GenericMessageConsumerImpl$2$1_0(this$1, val$messageListener){
    this.this$1 = this$1;
    this.val$messageListener = val$messageListener;
}

defineSeed(137, 1, makeCastMap([Q$GenericSemaphoreListener]), GenericMessageConsumerImpl$2$1_0);
_.whenAcquired = function whenAcquired_1(semaphore){
    var e, message;
    if (this.this$1.this$0.consumerState.state.value_0 == 1 && !!this.val$messageListener) {
        try {
            message = $retrieveFromQueue(this.this$1.this$0);
            !!message && message.deliver();
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$Exception)) {
                e = $e0;
                $handleException_1(this.this$1.this$0.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
            }
            else
                throw $e0;
        }
    }
}
;
_.this$1 = null;
_.val$messageListener = null;
function GenericMessageConsumerImpl$3_0(this$0, val$message, val$isRecovered){
    this.this$0 = this$0;
    this.val$message = val$message;
    this.val$isRecovered = val$isRecovered;
}

defineSeed(138, 1, makeCastMap([Q$GenericSemaphoreListener]), GenericMessageConsumerImpl$3_0);
_.whenAcquired = function whenAcquired_2(semaphore){
    this.this$0.messageListener?this.val$message.deliver():$addToQueue(this.this$0, this.val$message, this.val$isRecovered);
}
;
_.this$0 = null;
_.val$isRecovered = false;
_.val$message = null;
function $transitionIf(this$static, fromState, toState){
    if (!$compareAndSet_0(this$static.state, fromState, toState)) {
        return false;
    }
    return true;
}

function $transitionTo(this$static, toState){
    var fromState;
    fromState = $getAndSet_0(this$static.state, toState);
    return fromState;
}

function StateMachine_0(initialState){
    this.state = new AtomicInteger_0(-1);
    $set(this.state, initialState);
}

defineSeed(140, 1, {});
function GenericMessageConsumerImpl$ConsumerState_0(){
    StateMachine_0.call(this, 1);
}

defineSeed(139, 140, {}, GenericMessageConsumerImpl$ConsumerState_0);
function GenericMessageImpl$1_0(val$propIter){
    this.val$propIter = val$propIter;
}

defineSeed(141, 1, {}, GenericMessageImpl$1_0);
_.hasMoreElements_0 = function hasMoreElements_0(){
    return $hasNext(this.val$propIter);
}
;
_.nextElement_0 = function nextElement_0(){
    var propName;
    return propName = dynamicCast($next(this.val$propIter), Q$JmsPropertiesContent$Property).name_0 , asString(propName);
}
;
_.val$propIter = null;
function $checkClosed(this$static){
    if (this$static.closed_0.value_0) {
        throw new IllegalStateException_0('Producer is closed');
    }
}

function $checkDestinationValid_0(destination){
    if (instanceOf(destination, Q$GenericTemporaryDestination) && !dynamicCast(destination, Q$GenericTemporaryDestination).isValid()) {
        throw new InvalidDestinationException_0('Temporary Destination - ' + dynamicCast(destination, Q$GenericTemporaryDestination).getName() + ' is invalid. It must have been created before the connection got dropped/interrupted. Please re-create the temporary destination.');
    }
}

function $send_1(this$static, destination, message, deliveryMode, priority, timeToLive){
    var now;
    $checkClosed(this$static);
    if (!destination) {
        if (!this$static.defaultDestination) {
            throw new UnsupportedOperationException_1('A destination must be specified');
        }
        destination = this$static.defaultDestination;
    }
    else if (!!this$static.defaultDestination && destination != this$static.defaultDestination) {
        throw new UnsupportedOperationException_1('Destination cannot be specified when producer destination is already set');
    }
    $checkDestinationValid_0(destination);
    message.setJMSDestination_0(destination);
    deliveryMode != 2 && message.setJMSDeliveryMode_0(deliveryMode);
    priority != 4 && message.setJMSPriority_0(priority);
    message.setJMSExpiration_0(timeToLive);
    now = fromDouble((new Date).getTime());
    message.setJMSTimestamp_0(now);
    dynamicCast(message, Q$GenericMessage).setWritable(false);
    $messageSent(this$static.listener, this$static, dynamicCast(message, Q$GenericMessage));
}

function $sendComplete(this$static){

}

function $sendFailed(this$static, message){

}

function $setTimeToLive(this$static, timeToLive){
    $checkClosed(this$static);
    this$static.defaultTimeToLive = timeToLive;
}

function GenericMessageProducerImpl_0(destination, listener){
    this.closed_0 = new AtomicBoolean_0(false);
    this.defaultDestination = destination;
    this.listener = listener;
    $add_1(listener.messageProducers, this);
}

defineSeed(142, 1, makeCastMap([Q$GenericMessageProducer]), GenericMessageProducerImpl_0);
_.close_1 = function close_1(){
    $getAndSet(this.closed_0) || $producerClosed(this.listener, this);
}
;
_.getDeliveryMode_0 = function getDeliveryMode(){
    $checkClosed(this);
    return this.defaultDeliveryMode;
}
;
_.getDestination_0 = function getDestination_0(){
    return $checkClosed(this) , this.defaultDestination;
}
;
_.getPriority_0 = function getPriority(){
    $checkClosed(this);
    return this.defaultPriority;
}
;
_.setDeliveryMode_0 = function setDeliveryMode(deliveryMode){
    $checkClosed(this);
    this.defaultDeliveryMode = deliveryMode;
}
;
_.setPriority_0 = function setPriority(defaultPriority){
    $checkClosed(this);
    this.defaultPriority = defaultPriority;
}
;
_.defaultDeliveryMode = 2;
_.defaultDestination = null;
_.defaultPriority = 4;
_.defaultTimeToLive = P0_longLit;
_.listener = null;
_.sendFuture = null;
function $add(this$static, message){
    this$static.closing.value_0 || $add_2(this$static.queue, message);
}

function $receiveNoWait_0(this$static){
    if (this$static.closing.value_0) {
        return null;
    }
    return dynamicCast($poll(this$static.queue), Q$GenericMessage);
}

function GenericMessageQueueImpl_0(){
    this.queue = new LinkedBlockingQueue_0;
    this.closing = new AtomicBoolean_0(false);
}

defineSeed(143, 1, {}, GenericMessageQueueImpl_0);
function GenericQueueImpl_0(queueName){
    this.queueName = queueName;
}

defineSeed(144, 123, makeCastMap([Q$Queue, Q$GenericDestination, Q$Serializable]), GenericQueueImpl_0);
_.getName = function getName(){
    return this.queueName;
}
;
_.getQueueName_0 = function getQueueName(){
    return this.queueName;
}
;
_.queueName = null;
function GenericQueueSubscriptionHandler_0(subscription){
    GenericSubscriptionHandler_0.call(this, subscription);
}

defineSeed(145, 127, makeCastMap([Q$GenericMessageProcessor]), GenericQueueSubscriptionHandler_0);
_.consumerUnsubscribed = function consumerUnsubscribed_0(consumer){
    var index;
    index = $indexOf(this.consumers, consumer);
    index < this.nextQueueConsumer && --this.nextQueueConsumer;
    $consumerUnsubscribed_0(this, consumer);
}
;
_.messageAcknowledged = function messageAcknowledged_4(message){
    this.listener.messageAcknowledged(message);
}
;
_.processMessage = function processMessage_7(message){
    var consumerProcessor, nextConsumer;
    ++this.nextQueueConsumer >= this.consumers.arrayList.size && (this.nextQueueConsumer = 0);
    if (this.consumers.arrayList.size > 0) {
        nextConsumer = dynamicCast($get_1(this.consumers, this.nextQueueConsumer), Q$GenericMessageConsumer);
        consumerProcessor = nextConsumer.getMessageProcessor();
        consumerProcessor.processMessage(message);
    }
}
;
_.nextQueueConsumer = -1;
function GenericRemoteTemporaryQueueImpl_0(queueName){
    this.queueName = queueName;
}

defineSeed(146, 144, makeCastMap([Q$Queue, Q$GenericDestination, Q$Serializable]), GenericRemoteTemporaryQueueImpl_0);
function GenericTopicImpl_0(topicName){
    this.topicName = topicName;
}

defineSeed(148, 123, makeCastMap([Q$Topic, Q$GenericDestination, Q$GenericTopic, Q$Serializable]), GenericTopicImpl_0);
_.getName = function getName_0(){
    return this.topicName;
}
;
_.getTopicName_0 = function getTopicName(){
    return this.topicName;
}
;
_.topicName = null;
function GenericRemoteTemporaryTopicImpl_0(queueName){
    this.topicName = queueName;
}

defineSeed(147, 148, makeCastMap([Q$Topic, Q$GenericDestination, Q$GenericTopic, Q$Serializable]), GenericRemoteTemporaryTopicImpl_0);
function $acquire(this$static, listener){
    if ($compareAndSet(this$static.locked)) {
        listener.whenAcquired(this$static);
        return true;
    }
    else
        !!listener && $add_2(this$static.listeners, listener);
    return false;
}

function $release(this$static){
    var nextListener;
    if (!this$static.locked.value_0) {
        throw new IllegalStateException_3('Invalid semaphore state');
    }
    nextListener = dynamicCast($poll(this$static.listeners), Q$GenericSemaphoreListener);
    nextListener?nextListener.whenAcquired(this$static):(this$static.locked.value_0 = false);
}

function $synchronize(this$static, listener){
    $acquire(this$static, new GenericSemaphoreImpl$1_0(this$static, listener));
}

function GenericSemaphoreImpl_0(){
    this.locked = new AtomicBoolean_0(false);
    this.listeners = new LinkedList_0;
}

defineSeed(149, 1, {}, GenericSemaphoreImpl_0);
function GenericSemaphoreImpl$1_0(this$0, val$listener){
    this.this$0 = this$0;
    this.val$listener = val$listener;
}

defineSeed(150, 1, makeCastMap([Q$GenericSemaphoreListener]), GenericSemaphoreImpl$1_0);
_.whenAcquired = function whenAcquired_3(semaphore){
    try {
        this.val$listener.whenAcquired(semaphore);
    }
    finally {
        $release(this.this$0);
    }
}
;
_.this$0 = null;
_.val$listener = null;
function $clinit_GenericSessionImpl(){
    $clinit_GenericSessionImpl = nullMethod;
    $clinit_GenericDestinationFactory();
    nextTemporaryID = new AtomicInteger_0(1);
    nextTransactionID = new AtomicInteger_0(1);
    nextMessageSentID = new AtomicInteger_0(1);
}

function $acknowledgeConsumedMessages(this$static){
    var consumedMessage, e;
    try {
        while (this$static.consumedMessages.size != 0) {
            consumedMessage = dynamicCast($remove_1(this$static.consumedMessages, 0), Q$GenericMessage);
            $messageAcknowledged(this$static.acknowledgementListener, consumedMessage);
        }
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
        }
        else
            throw $e0;
    }
}

function $checkClosed_0(this$static){
    if (this$static.sessionState.state.value_0 == 3) {
        throw new IllegalStateException_3('Session closed');
    }
}

function $checkDestinationValid_1(destination){
    if (instanceOf(destination, Q$GenericTemporaryDestination) && !dynamicCast(destination, Q$GenericTemporaryDestination).isValid()) {
        throw new InvalidDestinationException_0('Temporary Destination - ' + dynamicCast(destination, Q$GenericTemporaryDestination).getName() + ' is invalid. It must have been created before the connection got dropped/interrupted. Please re-create the temporary destination.');
    }
}

function $checkMustBeNonTransacted(this$static){
    if (this$static.transacted) {
        throw new UnsupportedOperationException_1('This operation is not supported in transacted sessions');
    }
}

function $clearQueuedMessages(this$static){
    var consumer, consumer$iterator;
    DEBUG && log_0('Clearing queued messages');
    $clear(this$static.unconsumedMessages);
    for (consumer$iterator = new AbstractList$IteratorImpl_0(this$static.messageConsumers.arrayList); consumer$iterator.i < consumer$iterator.this$0_0.size_0();) {
        consumer = dynamicCast($next(consumer$iterator), Q$GenericMessageConsumer);
        consumer.clearQueuedMessages();
    }
}

function $close_0(this$static, callback){
    var consumer, consumer$iterator, e, future, openConsumers;
    future = new VoidFuture_0(callback);
    if ($transitionIf(this$static.sessionState, 0, 2) || $transitionIf(this$static.sessionState, 1, 2)) {
        this$static.closeFuture = future;
        $closeProducers(this$static);
        if (this$static.messageConsumers.arrayList.size == 0) {
            $closeComplete_0(this$static);
        }
        else {
            openConsumers = new Vector_1(this$static.messageConsumers);
            for (consumer$iterator = new AbstractList$IteratorImpl_0(openConsumers.arrayList); consumer$iterator.i < consumer$iterator.this$0_0.size_0();) {
                consumer = dynamicCast($next(consumer$iterator), Q$GenericMessageConsumer);
                try {
                    consumer.close_0(null);
                }
                catch ($e0) {
                    $e0 = caught($e0);
                    if (instanceOf($e0, Q$Exception)) {
                        e = $e0;
                        $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
                    }
                    else
                        throw $e0;
                }
            }
        }
    }
    else {
        $schedule(new GenericFuture$1_0(future), 1);
    }
    return future;
}

function $closeComplete_0(this$static){
    var e, e2, pendingTransaction, pendingTransaction$iterator, producer, producer$iterator, tnce;
    $transitionTo(this$static.sessionState, 3);
    for (producer$iterator = $iterator_0($values(this$static.producersWaitingForReceipt)); producer$iterator.val$outerIter.hasNext();) {
        producer = dynamicCast($next_1(producer$iterator), Q$GenericMessageProducer);
        $sendFailed(producer, 'Send aborted');
    }
    if (this$static.transacted) {
        for (pendingTransaction$iterator = $iterator_0($values(this$static.transactions)); pendingTransaction$iterator.val$outerIter.hasNext();) {
            pendingTransaction = dynamicCast($next_1(pendingTransaction$iterator), Q$GenericTransaction);
            e = new TransactionNotCommittedException_0('Transaction Not Committed: ' + pendingTransaction.transactionID);
            $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):e?e:new GenericException_0(null));
        }
        if (this$static.transaction) {
            tnce = new TransactionNotCommittedException_0('Transaction Not Committed: ' + this$static.transaction.transactionID);
            if (this$static.commitFuture) {
                try {
                    $throwException_2(this$static.commitFuture, tnce);
                }
                catch ($e0) {
                    $e0 = caught($e0);
                    if (instanceOf($e0, Q$Exception)) {
                        e2 = $e0;
                        $handleException_1(this$static.exceptionListener, !e2?new JMSException_0('Unknown exception'):instanceOf(e2, Q$JMSException)?dynamicCast(e2, Q$JMSException):new GenericException_0(e2));
                    }
                    else
                        throw $e0;
                }
            }
            $handleException_1(this$static.exceptionListener, !tnce?new JMSException_0('Unknown exception'):tnce?tnce:new GenericException_0(null));
        }
    }
    $sessionClosed(this$static.sessionListener, this$static);
    try {
        $schedule(new GenericFuture$1_0(this$static.closeFuture), 1);
    }
    finally {
        this$static.closeFuture = null;
    }
}

function $closeProducers(this$static){
    var openProducers, producer, producer$iterator;
    openProducers = new Vector_1(this$static.messageProducers);
    for (producer$iterator = new AbstractList$IteratorImpl_0(openProducers.arrayList); producer$iterator.i < producer$iterator.this$0_0.size_0();) {
        producer = dynamicCast($next(producer$iterator), Q$GenericMessageProducer);
        try {
            $getAndSet(producer.closed_0) || $producerClosed(producer.listener, producer);
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (!instanceOf($e0, Q$JMSException))
                throw $e0;
        }
    }
}

function $commit(this$static, callback){
    var e, future, message, message$iterator, receiptID, rollbackReceiptID, trbe, txnID;
    $checkClosed_0(this$static);
    if (!this$static.transacted) {
        throw new IllegalStateException_3('Attempted to commit transaction in non-transacted session');
    }
    if (!this$static.transaction) {
        throw new JMSException_0('No transactions are in progress');
    }
    if (this$static.commitFuture) {
        throw new IllegalStateException_3('CommitFuture already defined');
    }
    txnID = this$static.transaction.transactionID;
    future = new VoidFuture_0(new GenericSessionImpl$4_0(this$static, txnID, callback));
    this$static.commitFuture = future;
    try {
        $beginSent(this$static.outboundListener, txnID);
        for (message$iterator = $listIterator(this$static.transaction.entries, 0); message$iterator.currentNode != message$iterator.this$0.header;) {
            message = dynamicCast($next_3(message$iterator), Q$GenericMessage);
            receiptID = 'SND:' + nextMessageSentID.value_0++;
            message.setReceiptID(receiptID);
            message.setTransactionID(txnID);
            $messageSent_0(this$static.outboundListener, message);
        }
        receiptID = 'TXN:' + txnID;
        this$static.transactions.put_0(txnID, this$static.transaction);
        $commitSent(this$static.outboundListener, txnID, receiptID);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            try {
                rollbackReceiptID = 'RBK:' + txnID;
                $rollbackSent(this$static.outboundListener, txnID, rollbackReceiptID);
            }
            finally {
                trbe = new TransactionRolledBackException_0(e.getMessage_0());
                $fillInStackTrace(trbe);
                trbe.linkedException_0 = e;
                future.exception_0 = trbe;
                $fulfillInternal(future);
            }
        }
        else
            throw $e0;
    }
    return future;
}

function $consumerClosed(this$static, consumer){
    var removed;
    removed = $remove(this$static.messageConsumers, consumer);
    removed && this$static.sessionState.state.value_0 == 2 && this$static.messageConsumers.arrayList.size == 0 && $closeComplete_0(this$static);
}

function $consumerCreated(this$static, consumer){
    var e;
    if (this$static.transacted) {
        e = new IllegalStateException_3('Cannot subscribe in transacted session');
        $fillInStackTrace(e);
        $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):new GenericException_0(e));
    }
    $add_1(this$static.messageConsumers, consumer);
}

function $consumerSubscribed_1(this$static, consumer){
    var durableName;
    if (instanceOf(consumer, Q$GenericTopicSubscriber)) {
        durableName = dynamicCast(consumer, Q$GenericTopicSubscriber).getDurableSubscriberName();
        this$static.topicSubscribers.put_0(durableName, dynamicCast(consumer, Q$GenericTopicSubscriber));
    }
    $consumerSubscribed(this$static.subscriptionListener, consumer);
}

function $consumerUnsubscribed_1(this$static, consumer){
    var durableName;
    if (instanceOf(consumer, Q$GenericTopicSubscriber)) {
        durableName = dynamicCast(consumer, Q$GenericTopicSubscriber).getDurableSubscriberName();
        this$static.topicSubscribers.remove(durableName);
    }
    $consumerUnsubscribed(this$static.subscriptionListener, consumer);
}

function $createConsumer(this$static, destination, messageSelector){
    var consumer, processor;
    $checkClosed_0(this$static);
    if (messageSelector != null && !this$static.selectorsSupported) {
        throw new UnsupportedOperationException_1('Message selectors are not available with this Gateway/Broker configuration');
    }
    $checkMustBeNonTransacted(this$static);
    $checkDestinationValid_1(destination);
    consumer = new GenericMessageConsumerImpl_0(dynamicCast(destination, Q$GenericDestination), messageSelector, this$static.acknowledgeMode, this$static, this$static.sessionSemaphore);
    processor = new GenericSessionImpl$2_0(this$static, consumer);
    consumer.messageProcessor = processor;
    $setExceptionListener(consumer, this$static.exceptionListener);
    $consumerCreated(consumer.listener, consumer);
    $consumerSubscribed_1(consumer.listener, consumer);
    return consumer;
}

function $createDurableSubscriber(this$static, topic, name_0, messageSelector){
    var prevSubscriber, processor, s, subscriber;
    $checkClosed_0(this$static);
    if (instanceOf(topic, Q$TemporaryTopic)) {
        throw new UnsupportedOperationException_1('Durable Subscribers are not supported for temporary topics');
    }
    $checkMustBeNonTransacted(this$static);
    prevSubscriber = dynamicCast(this$static.topicSubscribers.get_0(name_0), Q$TopicSubscriber);
    if (prevSubscriber) {
        s = "Duplicate durable subscriber '" + name_0 + "', must close the original TopicSubscriber first";
        throw new JMSException_0(s);
    }
    subscriber = new GenericTopicSubscriberImpl_0(dynamicCast(topic, Q$GenericTopic), name_0, messageSelector, this$static.acknowledgeMode, this$static, this$static.sessionSemaphore);
    processor = new GenericSessionImpl$3_0(this$static, subscriber);
    subscriber.messageProcessor = processor;
    $setExceptionListener(subscriber, this$static.exceptionListener);
    $consumerCreated(subscriber.listener, subscriber);
    $consumerSubscribed_1(subscriber.listener, subscriber);
    return subscriber;
}

function $deliverRecoveredMessage(this$static, message){
    $add_2(this$static.messagesBeingConsumed, message);
    $onMessage(this$static.messageListener, message);
    $messageConsumed(this$static, message);
}

function $invalidateAndRemoveTempDestinations(this$static){
    var tempDestinaton, tempDestinaton$iterator, validTempDestinations;
    validTempDestinations = new Vector_1(this$static.temporaryDestinations);
    for (tempDestinaton$iterator = new AbstractList$IteratorImpl_0(validTempDestinations.arrayList); tempDestinaton$iterator.i < tempDestinaton$iterator.this$0_0.size_0();) {
        tempDestinaton = dynamicCast($next(tempDestinaton$iterator), Q$GenericTemporaryDestination);
        tempDestinaton.invalidate();
        $remove(this$static.temporaryDestinations, tempDestinaton);
    }
}

function $messageConsumed(this$static, message){
    var e;
    try {
        $processConsumedMessage(this$static, message);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
        }
        else
            throw $e0;
    }
}

function $messageSent(this$static, producer, message){
    var receiptID, txnID;
    if (this$static.transacted) {
        if (!this$static.transaction) {
            txnID = 'txn' + nextTransactionID.value_0++;
            this$static.transaction = new GenericTransaction_0(txnID);
        }
        $add_0(this$static.transaction, message);
        $sendComplete(producer);
    }
    else {
        receiptID = 'SND:' + nextMessageSentID.value_0++;
        message.setReceiptID(receiptID);
        this$static.producersWaitingForReceipt.put_0(receiptID, producer);
        $messageSent_0(this$static.outboundListener, message);
    }
}

function $processConsumedMessage(this$static, message){
    var consumedMessagesIterator, currentMessage;
    if ($remove_0(this$static.messagesBeingConsumed, message) || $remove_0(this$static.unconsumedMessages, message)) {
        if (message.getJMSRedelivered_0()) {
            consumedMessagesIterator = $listIterator(this$static.consumedMessages, 0);
            while (consumedMessagesIterator.currentNode != consumedMessagesIterator.this$0.header) {
                currentMessage = dynamicCast($next_3(consumedMessagesIterator), Q$GenericMessage);
                if ($equals_2(message.getJMSMessageID_0(), currentMessage.getJMSMessageID_0())) {
                    $remove_8(consumedMessagesIterator);
                    break;
                }
            }
        }
        $add_2(this$static.consumedMessages, message);
    }
    (this$static.acknowledgeMode == 1 || this$static.acknowledgeMode == 3) && $acknowledgeConsumedMessages(this$static);
}

function $processConsumerMessage(this$static, message, consumer){
    var e1, state;
    $checkClosed_0(this$static);
    if (!message) {
        throw new IllegalArgumentException_1('Invalid message type');
    }
    state = this$static.sessionState.state.value_0;
    if (state != 2 && state != 3) {
        try {
            message.setAcknowledgementListener(this$static);
            $processQueuedMessage(this$static, new GenericSessionImpl$GenericConsumerMessage_0(this$static, consumer, message));
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$Exception)) {
                e1 = $e0;
                $handleException_1(this$static.exceptionListener, !e1?new JMSException_0('Unknown exception'):instanceOf(e1, Q$JMSException)?dynamicCast(e1, Q$JMSException):new GenericException_0(e1));
            }
            else
                throw $e0;
        }
    }
}

function $processDropped_0(this$static){
    var key, key$array, key$index, key$max, producer;
    $clearQueuedMessages(this$static);
    for (key$array = dynamicCast($keySet(this$static.producersWaitingForReceipt).toArray_0(initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, 0, 0)), Q$String_$1) , key$index = 0 , key$max = key$array.length; key$index < key$max; ++key$index) {
        key = key$array[key$index];
        producer = dynamicCast(this$static.producersWaitingForReceipt.remove(key), Q$GenericMessageProducer);
        $sendFailed(producer, 'Message sent from client may not have been delivered');
    }
    $invalidateAndRemoveTempDestinations(this$static);
    $removeTempDestinationConsumers(this$static);
}

function $processQueuedMessage(this$static, consumerMessage){
    var consumer, e, message;
    message = consumerMessage.message_0;
    consumer = consumerMessage.consumer;
    try {
        message.setAcknowledgementListener(this$static);
        if (this$static.messageListener) {
            $add_2(this$static.messagesBeingConsumed, message);
            $onMessage(this$static.messageListener, message);
            $processConsumedMessage(this$static, message);
        }
        else {
            $add_2(this$static.unconsumedMessages, message);
            consumer.consumerState.state.value_0 == 1 && (consumer.messageListener?$synchronize(consumer.messageSemaphore, new GenericMessageConsumerImpl$3_0(consumer, message, false)):$add(consumer.messageQueue, message));
        }
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
        }
        else
            throw $e0;
    }
}

function $producerClosed(this$static, producer){
    $remove(this$static.messageProducers, producer);
}

function $recreateTempDestinations(this$static){
    var tempDestinaton, tempDestinaton$iterator, validTempDestinations;
    if (!this$static.destinationListener) {
        return;
    }
    validTempDestinations = new Vector_1(this$static.temporaryDestinations);
    for (tempDestinaton$iterator = new AbstractList$IteratorImpl_0(validTempDestinations.arrayList); tempDestinaton$iterator.i < tempDestinaton$iterator.this$0_0.size_0();) {
        tempDestinaton = dynamicCast($next(tempDestinaton$iterator), Q$GenericTemporaryDestination);
        instanceOf(tempDestinaton, Q$GenericTemporaryTopic)?$temporaryTopicCreated(this$static.destinationListener, dynamicCast(tempDestinaton, Q$GenericTemporaryTopic)):instanceOf(tempDestinaton, Q$GenericTemporaryQueue) && $temporaryQueueCreated(this$static.destinationListener, dynamicCast(tempDestinaton, Q$GenericTemporaryQueue));
    }
}

function $removeTempDestinationConsumers(this$static){
    var consumer, consumer$iterator, openConsumers;
    openConsumers = new Vector_1(this$static.messageConsumers);
    for (consumer$iterator = new AbstractList$IteratorImpl_0(openConsumers.arrayList); consumer$iterator.i < consumer$iterator.this$0_0.size_0();) {
        consumer = dynamicCast($next(consumer$iterator), Q$GenericMessageConsumer);
        instanceOf(consumer.getDestination_1(), Q$GenericTemporaryDestination) && $remove(this$static.messageConsumers, consumer);
    }
}

function $setListener(this$static, listener){
    this$static.outboundListener = listener;
}

function $setSelectorsSupported(this$static, selectorsSupported){
    this$static.selectorsSupported = selectorsSupported;
}

function $temporaryQueueDeleted_0(this$static, temporaryQueue){
    var consumer, consumer$iterator, e;
    for (consumer$iterator = new AbstractList$IteratorImpl_0(this$static.messageConsumers.arrayList); consumer$iterator.i < consumer$iterator.this$0_0.size_0();) {
        consumer = dynamicCast($next(consumer$iterator), Q$GenericMessageConsumer);
        if ($equals_2(consumer.getDestination_1().getName(), temporaryQueue.queueName)) {
            try {
                consumer.close_0(null);
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (instanceOf($e0, Q$Exception)) {
                    e = $e0;
                    $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
                }
                else
                    throw $e0;
            }
        }
    }
    !!this$static.destinationListener && $temporaryQueueDeleted(this$static.destinationListener, temporaryQueue);
    $remove(this$static.temporaryDestinations, temporaryQueue);
}

function $temporaryTopicDeleted_0(this$static, temporaryTopic){
    var consumer, consumer$iterator, e;
    for (consumer$iterator = new AbstractList$IteratorImpl_0(this$static.messageConsumers.arrayList); consumer$iterator.i < consumer$iterator.this$0_0.size_0();) {
        consumer = dynamicCast($next(consumer$iterator), Q$GenericMessageConsumer);
        if (consumer.getDestination_1() == temporaryTopic) {
            try {
                consumer.close_0(null);
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (instanceOf($e0, Q$Exception)) {
                    e = $e0;
                    $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
                }
                else
                    throw $e0;
            }
        }
    }
    !!this$static.destinationListener && $temporaryTopicDeleted(this$static.destinationListener, temporaryTopic);
    $remove(this$static.temporaryDestinations, temporaryTopic);
}

function GenericSessionImpl_0(transacted, acknowledgeMode){
    $clinit_GenericSessionImpl();
    this.messageConsumers = new CopyOnWriteArrayList_0;
    this.messageProducers = new CopyOnWriteArrayList_0;
    this.topicSubscribers = new HashMap_0;
    this.temporaryDestinations = new CopyOnWriteArrayList_0;
    this.unconsumedMessages = new LinkedList_0;
    this.messagesBeingConsumed = new LinkedList_0;
    this.consumedMessages = new LinkedList_0;
    this.transactions = new HashMap_0;
    this.producersWaitingForReceipt = new HashMap_0;
    this.sessionSemaphore = new GenericSemaphoreImpl_0;
    this.sessionState = new GenericSessionImpl$SessionState_0;
    this.transacted = transacted;
    this.acknowledgeMode = acknowledgeMode;
    this.sessionListener = null;
    $transitionTo(this.sessionState, 1);
}

defineSeed(151, 1, makeCastMap([Q$GenericMessageProcessor, Q$GenericSession]), GenericSessionImpl_0);
_.createBytesMessage_0 = function createBytesMessage(){
    return $checkClosed_0(this) , new GenericBytesMessageImpl_1(this);
}
;
_.createConsumer_0 = function createConsumer(destination){
    return $createConsumer(this, destination, null);
}
;
_.createConsumer_1 = function createConsumer_0(destination, messageSelector){
    return $createConsumer(this, destination, messageSelector);
}
;
_.createDurableSubscriber_0 = function createDurableSubscriber_0(topic, name_0, messageSelector, noLocal){
    return $createDurableSubscriber(this, topic, name_0, messageSelector);
}
;
_.createMapMessage_0 = function createMapMessage(){
    $checkClosed_0(this);
    return new GenericMapMessageImpl_0(this);
}
;
_.createMessage_0 = function createMessage(){
    return $checkClosed_0(this) , new GenericMessageImpl_1(this);
}
;
_.createProducer_0 = function createProducer_0(destination){
    return $checkClosed_0(this) , $checkDestinationValid_1(destination) , new GenericMessageProducerImpl_0(dynamicCast(destination, Q$GenericDestination), this);
}
;
_.createQueue_0 = function createQueue(name_0){
    return $checkClosed_0(this) , $createQueueInternal(name_0, null);
}
;
_.createTemporaryQueue_0 = function createTemporaryQueue(){
    var name_0;
    return $checkClosed_0(this) , name_0 = '/temp-queue/q' + nextTemporaryID.value_0++ , dynamicCast($createQueueInternal(name_0, this), Q$GenericTemporaryQueue);
}
;
_.createTemporaryTopic_0 = function createTemporaryTopic(){
    var name_0;
    return $checkClosed_0(this) , name_0 = '/temp-topic/t' + nextTemporaryID.value_0++ , dynamicCast($createTopicInternal(name_0, this), Q$GenericTemporaryTopic);
}
;
_.createTextMessage_0 = function createTextMessage_0(text){
    var genericTextMessage;
    return $checkClosed_0(this) , genericTextMessage = new GenericTextMessageImpl_0(this) , $checkWritable(genericTextMessage) , genericTextMessage.text = text , genericTextMessage;
}
;
_.createTopic_0 = function createTopic(name_0){
    return $checkClosed_0(this) , $createTopicInternal(name_0, null);
}
;
_.getAcknowledgeMode_0 = function getAcknowledgeMode(){
    $checkClosed_0(this);
    return this.transacted?0:this.acknowledgeMode;
}
;
_.getMessageListener_0 = function getMessageListener_0(){
    $checkClosed_0(this);
    $checkMustBeNonTransacted(this);
    return this.messageListener;
}
;
_.getTransacted_0 = function getTransacted(){
    $checkClosed_0(this);
    return this.transacted;
}
;
_.messageAcknowledged = function messageAcknowledged_5(message){
    $checkClosed_0(this);
    if (this.acknowledgeMode == 2) {
        $contains(this.messagesBeingConsumed, message) && $messageConsumed(this, message);
        $acknowledgeConsumedMessages(this);
    }
    else {
        DEBUG && log_0('Ignoring client acks');
    }
}
;
_.processClose = function processClose_4(){
}
;
_.processConnected = function processConnected_4(connected){
    $recreateTempDestinations(this);
}
;
_.processDisconnected = function processDisconnected_4(disconnected){
}
;
_.processMessage = function processMessage_8(message){
}
;
_.processOpen = function processOpen_3(){
}
;
_.processReceipt = function processReceipt_5(receipt){
    var producer, receiptID, transaction, transactionID;
    receiptID = receipt.getReceiptID();
    if (receiptID.indexOf('TXN:') == 0) {
        transactionID = $substring(receiptID, 4);
        transaction = dynamicCast(this.transactions.get_0(transactionID), Q$GenericTransaction);
        !!transaction && $schedule(new GenericFuture$1_0(this.commitFuture), 1);
    }
    else if (receiptID.indexOf('SND:') == 0) {
        producer = dynamicCast(this.producersWaitingForReceipt.remove(receiptID), Q$GenericMessageProducer);
        !!producer && $sendComplete(producer);
    }
}
;
_.processStart = function processStart_3(){
    $transitionIf(this.sessionState, 0, 1);
}
;
_.processStop = function processStop_3(){
    $transitionIf(this.sessionState, 1, 0);
}
;
_.recover_0 = function recover_0(){
    var deliveredNotAckedMessages;
    $checkClosed_0(this);
    if (this.transacted) {
        throw new IllegalStateException_3('Cannot recover within transacted sessions');
    }
    $transitionTo(this.sessionState, 0);
    deliveredNotAckedMessages = new ArrayList_2(this.consumedMessages);
    $addAll_0(deliveredNotAckedMessages, this.messagesBeingConsumed);
    $clear(this.consumedMessages);
    $clear(this.messagesBeingConsumed);
    $synchronize(this.sessionSemaphore, new GenericSessionImpl$5_0(this, deliveredNotAckedMessages));
}
;
_.rollback_0 = function rollback(){
    $checkClosed_0(this);
    if (!this.transacted) {
        throw new IllegalStateException_3('Attempted to rollback transaction in non-transacted session');
    }
    if (!this.transaction) {
        throw new JMSException_0('No transactions are in progress');
    }
    if (this.commitFuture) {
        throw new JMSException_0('Transaction commit already in progress');
    }
    this.transaction = null;
}
;
_.unsubscribe_0 = function unsubscribe(name_0){
    var topicSubscriber;
    $checkClosed_0(this);
    if (name_0 == null) {
        throw new JMSException_0('Illegal Argument: name cannot be empty or null');
    }
    topicSubscriber = dynamicCast(this.topicSubscribers.get_0(name_0), Q$GenericTopicSubscriber);
    if (topicSubscriber) {
        throw new JMSException_0('Cannot unsubscribe while a TopicSubscriber is open');
    }
    $unsubscribed(this.subscriptionListener, name_0);
}
;
_.acknowledgeMode = 0;
_.acknowledgementListener = null;
_.closeFuture = null;
_.commitFuture = null;
_.destinationListener = null;
_.exceptionListener = null;
_.messageListener = null;
_.outboundListener = null;
_.selectorsSupported = false;
_.sessionListener = null;
_.subscriptionListener = null;
_.transacted = false;
_.transaction = null;
var nextMessageSentID, nextTemporaryID, nextTransactionID;
function GenericSessionImpl$2_0(val$session, val$consumer){
    this.val$session = val$session;
    this.val$consumer = val$consumer;
}

defineSeed(153, 1, makeCastMap([Q$GenericMessageProcessor]), GenericSessionImpl$2_0);
_.processClose = function processClose_5(){
}
;
_.processConnected = function processConnected_5(connected){
}
;
_.processDisconnected = function processDisconnected_5(disconnected){
}
;
_.processMessage = function processMessage_9(message){
    $processConsumerMessage(this.val$session, message, this.val$consumer);
}
;
_.processOpen = function processOpen_4(){
}
;
_.processReceipt = function processReceipt_6(receipt){
}
;
_.processStart = function processStart_4(){
}
;
_.processStop = function processStop_4(){
}
;
_.val$consumer = null;
_.val$session = null;
function GenericSessionImpl$3_0(val$session, val$subscriber){
    this.val$session = val$session;
    this.val$subscriber = val$subscriber;
}

defineSeed(154, 1, makeCastMap([Q$GenericMessageProcessor]), GenericSessionImpl$3_0);
_.processClose = function processClose_6(){
}
;
_.processConnected = function processConnected_6(connected){
}
;
_.processDisconnected = function processDisconnected_6(disconnected){
}
;
_.processMessage = function processMessage_10(message){
    $processConsumerMessage(this.val$session, message, this.val$subscriber);
}
;
_.processOpen = function processOpen_5(){
}
;
_.processReceipt = function processReceipt_7(receipt){
}
;
_.processStart = function processStart_5(){
}
;
_.processStop = function processStop_5(){
}
;
_.val$session = null;
_.val$subscriber = null;
function $complete(this$static){
    this$static.this$0.commitFuture = null;
    this$static.this$0.transactions.remove(this$static.val$txnID);
    this$static.this$0.transaction = null;
}

function $onReturn_1(this$static){
    $complete(this$static);
    $fulfill_1(this$static.val$callback.voidFuture);
}

function GenericSessionImpl$4_0(this$0, val$txnID, val$callback){
    this.this$0 = this$0;
    this.val$txnID = val$txnID;
    this.val$callback = val$callback;
}

defineSeed(155, 1, {}, GenericSessionImpl$4_0);
_.onException_1 = function onException_4(e){
    $complete(this);
    $onException_0(this.val$callback, e);
}
;
_.onReturn = function onReturn_2(value){
    $onReturn_1(this, throwClassCastExceptionUnlessNull(value));
}
;
_.this$0 = null;
_.val$callback = null;
_.val$txnID = null;
function GenericSessionImpl$5_0(this$0, val$deliveredNotAckedMessages){
    this.this$0 = this$0;
    this.val$deliveredNotAckedMessages = val$deliveredNotAckedMessages;
}

defineSeed(156, 1, makeCastMap([Q$GenericSemaphoreListener]), GenericSessionImpl$5_0);
_.whenAcquired = function whenAcquired_4(semaphore){
    var deliveredNotAckedMsg, deliveredNotAckedMsg$iterator;
    try {
        for (deliveredNotAckedMsg$iterator = new AbstractList$IteratorImpl_0(this.val$deliveredNotAckedMessages); deliveredNotAckedMsg$iterator.i < deliveredNotAckedMsg$iterator.this$0_0.size_0();) {
            deliveredNotAckedMsg = dynamicCast($next(deliveredNotAckedMsg$iterator), Q$GenericMessage);
            deliveredNotAckedMsg.setJMSRedelivered_0(true);
            this.this$0.messageListener?$deliverRecoveredMessage(this.this$0, deliveredNotAckedMsg):deliveredNotAckedMsg.recover_0();
        }
    }
    finally {
        $transitionTo(this.this$0.sessionState, 1);
    }
}
;
_.this$0 = null;
_.val$deliveredNotAckedMessages = null;
function $messageDelivered(this$static){
    var ex, messageListener;
    messageListener = this$static.consumer.messageListener;
    if (messageListener) {
        $remove_0(this$static.this$0.unconsumedMessages, this$static.message_0);
        $add_2(this$static.this$0.messagesBeingConsumed, this$static.message_0);
        try {
            $onMessage(messageListener, this$static.message_0);
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$Exception)) {
                ex = $e0;
                trace('Unhandled exception thrown from message listener: ' + $toString(ex));
            }
            else
                throw $e0;
        }
        finally {
            $messageConsumed(this$static.this$0, this$static.message_0);
        }
    }
}

function $messageRecovered(this$static){
    $add_2(this$static.this$0.unconsumedMessages, this$static.message_0);
    $processRecoveredMessage(this$static.consumer, this$static.message_0);
}

function GenericSessionImpl$GenericConsumerMessage_0(this$0, consumer, message){
    this.this$0 = this$0;
    this.consumer = consumer;
    this.message_0 = message;
    message.setDeliveryListener(this);
}

defineSeed(157, 1, {}, GenericSessionImpl$GenericConsumerMessage_0);
_.consumer = null;
_.message_0 = null;
_.this$0 = null;
function GenericSessionImpl$SessionState_0(){
    StateMachine_0.call(this, 0);
}

defineSeed(158, 140, {}, GenericSessionImpl$SessionState_0);
function $beginSent(this$static, txnID){
    $beginSent_0(this$static.listener, txnID);
}

function $commitSent(this$static, txnID, receiptID){
    $commitSent_0(this$static.listener, txnID, receiptID);
}

function $destinationCreated(this$static, creation, receiptID){
    $destinationCreated_0(this$static.listener, creation, receiptID);
}

function $destinationDeleted(this$static, deletion, receiptID){
    $destinationDeleted_0(this$static.listener, deletion, receiptID);
}

function $messageSent_0(this$static, message){
    $messageSent_1(this$static.listener, message);
}

function $processConnected_2(this$static, connected){
    this$static.subscriptions = new LinkedHashMap_0;
    $processConnected_1(this$static.nextProcessor, connected);
}

function $processDisconnected_1(this$static, disconnected){
    $processDisconnected_0(this$static.nextProcessor, disconnected);
}

function $processMessage_1(this$static, message){
    var deliverLater, subscriptionID;
    if (this$static.startStopState.state.value_0 == 2) {
        $processMessage_0(this$static.nextProcessor, message);
    }
    else {
        subscriptionID = message.getSubscriptionID();
        deliverLater = subscriptionID.indexOf('dts/') == 0 || subscriptionID.indexOf('q/') == 0 || subscriptionID.indexOf('tq/') == 0 || subscriptionID.indexOf('rtq/') == 0;
        deliverLater && $add_2(this$static.pendingQueue, message);
    }
}

function $processReceipt_1(this$static, receipt){
    $processReceipt_0(this$static.nextProcessor, receipt);
}

function $processStart_1(this$static){
    var entry, entry$iterator, message, subscriptionEntriesSnapshot;
    if ($transitionIf(this$static.startStopState, 4, 1)) {
        subscriptionEntriesSnapshot = new ArrayList_2($values(this$static.subscriptions));
        for (entry$iterator = new AbstractList$IteratorImpl_0(subscriptionEntriesSnapshot); entry$iterator.i < entry$iterator.this$0_0.size_0();) {
            entry = dynamicCast($next(entry$iterator), Q$GenericStartStopHandlerImpl$GenericSubscriptionEntry);
            $subscribed(this$static.listener, entry.subscription);
        }
        $processStart_0(this$static.nextProcessor);
        if ($transitionIf(this$static.startStopState, 1, 2)) {
            $onStart(this$static.startStopListener);
            while (this$static.startStopState.state.value_0 == 2) {
                message = dynamicCast($poll(this$static.pendingQueue), Q$GenericMessage);
                if (!message) {
                    break;
                }
                $processMessage_0(this$static.nextProcessor, message);
            }
        }
        else {
            throw new IllegalStateException_3('State changed illegally while starting');
        }
    }
    else if (this$static.startStopState.state.value_0 == 3) {
        throw new IllegalStateException_3('Stop must complete before starting');
    }
}

function $processStop_1(this$static){
    var entry, entry$iterator, subscription, subscriptionEntriesSnapshot;
    if ($transitionIf(this$static.startStopState, 2, 3)) {
        $processStop_0(this$static.nextProcessor);
        subscriptionEntriesSnapshot = new ArrayList_2($values(this$static.subscriptions));
        for (entry$iterator = new AbstractList$IteratorImpl_0(subscriptionEntriesSnapshot); entry$iterator.i < entry$iterator.this$0_0.size_0();) {
            entry = dynamicCast($next(entry$iterator), Q$GenericStartStopHandlerImpl$GenericSubscriptionEntry);
            subscription = entry.subscription;
            $unsubscribed_0(this$static.listener, subscription);
        }
        if ($transitionIf(this$static.startStopState, 3, 4)) {
            $fulfillInternal(this$static.startStopListener.stopFuture);
        }
        else {
            throw new IllegalStateException_3('State changed illegally while stopping');
        }
    }
    else if (this$static.startStopState.state.value_0 == 1) {
        throw new IllegalStateException_3('Start must complete before stopping');
    }
}

function $rollbackSent(this$static, txnID, receiptID){
    $rollbackSent_0(this$static.listener, txnID, receiptID);
}

function $setListener_0(this$static, listener){
    this$static.listener = listener;
}

function $subscriberDeleted(this$static, deletion, receiptID){
    $subscriberDeleted_0(this$static.listener, deletion, receiptID);
}

function GenericStartStopHandlerImpl_0(){
    this.subscriptions = new LinkedHashMap_0;
    this.startStopState = new GenericStartStopHandlerImpl$StartStopState_0;
    this.pendingQueue = new LinkedList_0;
}

defineSeed(159, 1, makeCastMap([Q$GenericMessageProcessor]), GenericStartStopHandlerImpl_0);
_.messageAcknowledged = function messageAcknowledged_6(message){
    $messageAcknowledged_1(this.listener, message);
}
;
_.processClose = function processClose_7(){
    $processClose(this.nextProcessor.nextMessageProcessor);
}
;
_.processConnected = function processConnected_7(connected){
    $processConnected_2(this, connected);
}
;
_.processDisconnected = function processDisconnected_7(disconnected){
    $processDisconnected_1(this, disconnected);
}
;
_.processMessage = function processMessage_11(message){
    $processMessage_1(this, message);
}
;
_.processOpen = function processOpen_6(){
    $processOpen(this.nextProcessor.nextMessageProcessor);
}
;
_.processReceipt = function processReceipt_8(receipt){
    $processReceipt_1(this, receipt);
}
;
_.processStart = function processStart_6(){
    $processStart_1(this);
}
;
_.processStop = function processStop_6(){
    $processStop_1(this);
}
;
_.subscribed = function subscribed_0(subscription){
    var entry;
    entry = new GenericStartStopHandlerImpl$GenericSubscriptionEntry_0;
    entry.subscription = subscription;
    $put_1(this.subscriptions, subscription.subscriptionID != null?'SUB:' + subscription.subscriptionID:'SUB:' + $getUniqueID(subscription), entry);
    this.startStopState.state.value_0 == 2 && $subscribed(this.listener, subscription);
}
;
_.unsubscribed = function unsubscribed_0(subscription, receiptID, stopped){
    this.startStopState.state.value_0 == 2 && $unsubscribed_0(this.listener, subscription);
    $remove_6(this.subscriptions, subscription.subscriptionID != null?'SUB:' + subscription.subscriptionID:'SUB:' + $getUniqueID(subscription));
}
;
_.listener = null;
_.nextProcessor = null;
_.startStopListener = null;
function GenericStartStopHandlerImpl$GenericSubscriptionEntry_0(){
}

defineSeed(160, 1, makeCastMap([Q$GenericStartStopHandlerImpl$GenericSubscriptionEntry]), GenericStartStopHandlerImpl$GenericSubscriptionEntry_0);
_.subscription = null;
function GenericStartStopHandlerImpl$StartStopState_0(){
    StateMachine_0.call(this, 4);
}

defineSeed(161, 140, {}, GenericStartStopHandlerImpl$StartStopState_0);
function GenericSubscribeReceipt_0(){
}

defineSeed(162, 109, makeCastMap([Q$GenericSubscribeReceipt]), GenericSubscribeReceipt_0);
function GenericSubscriberDeletion_0(durableName){
    this.durableName = durableName;
}

defineSeed(163, 1, {}, GenericSubscriberDeletion_0);
_.durableName = null;
function $getUniqueID(this$static){
    this$static.uniqueID == 0 && (this$static.uniqueID = nextUniqueID++);
    return this$static.uniqueID;
}

function $setSubscriptionID_0(this$static, subscriptionID){
    this$static.subscriptionID = subscriptionID;
}

function GenericSubscription_0(destination, durableSubscriberName, messageSelector, sessionAcknowledgementMode){
    if (!instanceOf(destination, Q$Topic) && durableSubscriberName != null) {
        throw new IllegalArgumentException_1('Only topics can have durable subscriptions');
    }
    this.destination = destination;
    this.durableSubscriberName = durableSubscriberName;
    this.messageSelector = messageSelector;
    this.sessionAcknowledgementMode = sessionAcknowledgementMode;
    this.acknowledgementMode = sessionAcknowledgementMode;
    this.subscriptionKey = createSubscriptionKey_0(destination.getName(), durableSubscriberName, messageSelector);
    (messageSelector == null || durableSubscriberName != null) && (this.subscriptionID = this.subscriptionKey);
}

function createSubscriptionKey(destination, durableName, messageSelector){
    return createSubscriptionKey_0(destination.getName(), durableName, messageSelector);
}

function createSubscriptionKey_0(destinationName, durableName, messageSelector){
    var newPrefix, oldPrefix, unescapedSubscriptionId;
    if (durableName != null) {
        return 'dts/' + durableName;
    }
    if (destinationName.indexOf('/topic/') == 0) {
        oldPrefix = '/topic/';
        newPrefix = 't/';
    }
    else if (destinationName.indexOf('/temp-topic/') == 0) {
        oldPrefix = '/temp-topic/';
        newPrefix = 'tt/';
    }
    else if (destinationName.indexOf('/queue/') == 0) {
        oldPrefix = '/queue/';
        newPrefix = 'q/';
    }
    else if (destinationName.indexOf('/temp-queue/') == 0) {
        oldPrefix = '/temp-queue/';
        newPrefix = 'tq/';
    }
    else {
        throw new JMSException_0('Unknown destination: ' + destinationName);
    }
    unescapedSubscriptionId = $replace(destinationName, oldPrefix, newPrefix);
    messageSelector != null && (unescapedSubscriptionId = unescapedSubscriptionId + messageSelector);
    return unescapedSubscriptionId;
}

defineSeed(164, 1, {}, GenericSubscription_0);
_.acknowledgementMode = 0;
_.destination = null;
_.durableSubscriberName = null;
_.messageSelector = null;
_.sessionAcknowledgementMode = 0;
_.subscriptionID = null;
_.subscriptionKey = null;
_.uniqueID = 0;
var nextUniqueID = 1;
function $onException_2(this$static, e){
    $onException_1(this$static.exceptionListener, e);
}

function $processReceipt_2(this$static, receipt){
    var subscriptionID;
    if (instanceOf(receipt, Q$GenericSubscribeReceipt)) {
        subscriptionID = dynamicCast(receipt, Q$GenericSubscribeReceipt).subscriptionID;
        subscriptionID != null && $setSubscriptionID_0(this$static.subscription, subscriptionID);
    }
    this$static.redeliveryHandler.processReceipt(receipt);
}

function $setListener_1(this$static, listener){
    this$static.redeliveryHandler.setListener(listener);
}

function $setNextProcessor_1(this$static, nextProcessor){
    $setNextProcessor(this$static.subscriptionHandler, nextProcessor);
}

function GenericSubscriptionMessageProcessor_0(subscription){
    this.subscription = subscription;
    if (instanceOf(subscription.destination, Q$Queue)) {
        this.subscriptionHandler = new GenericQueueSubscriptionHandler_0(subscription);
        this.redeliveryHandler = new GenericGuaranteedRedeliveryHandler_0(subscription);
    }
    else if (subscription.durableSubscriberName != null) {
        this.subscriptionHandler = new GenericDurableSubscriptionHandler_0(subscription);
        this.redeliveryHandler = new GenericGuaranteedRedeliveryHandler_0(subscription);
    }
    else {
        this.subscriptionHandler = new GenericTopicSubscriptionHandler_0(subscription);
        this.redeliveryHandler = new GenericTopicRedeliveryHandler_0(subscription);
    }
    this.subscriptionHandler.exceptionListener = this;
    this.redeliveryHandler.exceptionListener = this;
    $setNextProcessor_0(this.redeliveryHandler, this.subscriptionHandler);
}

defineSeed(165, 1, makeCastMap([Q$GenericMessageProcessor, Q$GenericSubscriptionMessageProcessor]), GenericSubscriptionMessageProcessor_0);
_.messageAcknowledged = function messageAcknowledged_7(message){
    this.subscriptionHandler.messageAcknowledged(message);
}
;
_.onException_0 = function onException_5(e){
    $onException_2(this, e);
}
;
_.processClose = function processClose_8(){
    this.redeliveryHandler.processClose();
}
;
_.processConnected = function processConnected_8(connected){
    $processConnected(this.redeliveryHandler, connected);
}
;
_.processDisconnected = function processDisconnected_8(disconnected){
    this.redeliveryHandler.processDisconnected(disconnected);
}
;
_.processMessage = function processMessage_12(message){
    this.redeliveryHandler.processMessage(message);
}
;
_.processOpen = function processOpen_7(){
    this.redeliveryHandler.nextProcessor.processOpen();
}
;
_.processReceipt = function processReceipt_9(receipt){
    $processReceipt_2(this, receipt);
}
;
_.processStart = function processStart_7(){
    this.redeliveryHandler.nextProcessor.processStart();
}
;
_.processStop = function processStop_7(){
    this.redeliveryHandler.nextProcessor.processStop();
}
;
_.exceptionListener = null;
_.redeliveryHandler = null;
_.subscription = null;
_.subscriptionHandler = null;
function GenericTemporaryQueueImpl_0(queueName, listener){
    this.queueName = queueName;
    this.valid = new AtomicBoolean_0(true);
    this.listener = listener;
    !!listener && (!!listener.destinationListener && $temporaryQueueCreated(listener.destinationListener, this) , $add_1(listener.temporaryDestinations, this));
}

defineSeed(166, 144, makeCastMap([Q$Queue, Q$TemporaryQueue, Q$GenericDestination, Q$GenericTemporaryDestination, Q$GenericTemporaryQueue, Q$Serializable]), GenericTemporaryQueueImpl_0);
_.delete_$ = function delete_$(){
    !!this.listener && $temporaryQueueDeleted_0(this.listener, this);
}
;
_.invalidate = function invalidate(){
    this.valid.value_0 = false;
}
;
_.isValid = function isValid(){
    return this.valid.value_0;
}
;
_.listener = null;
function GenericTemporaryTopicImpl_0(topicName, listener){
    this.topicName = topicName;
    this.valid = new AtomicBoolean_0(true);
    this.listener = listener;
    !!listener && (!!listener.destinationListener && $temporaryTopicCreated(listener.destinationListener, this) , $add_1(listener.temporaryDestinations, this));
}

defineSeed(167, 148, makeCastMap([Q$TemporaryTopic, Q$Topic, Q$GenericDestination, Q$GenericTemporaryDestination, Q$GenericTemporaryTopic, Q$GenericTopic, Q$Serializable]), GenericTemporaryTopicImpl_0);
_.delete_$ = function delete_$_0(){
    !!this.listener && $temporaryTopicDeleted_0(this.listener, this);
}
;
_.invalidate = function invalidate_0(){
    this.valid.value_0 = false;
}
;
_.isValid = function isValid_0(){
    return this.valid.value_0;
}
;
_.listener = null;
function $clinit_GenericTextMessageImpl(){
    $clinit_GenericTextMessageImpl = nullMethod;
    $clinit_GenericMessageImpl();
    getUTF8();
}

function GenericTextMessageImpl_0(listener){
    $clinit_GenericTextMessageImpl();
    GenericMessageImpl_1.call(this, listener);
    this.writable = true;
}

function GenericTextMessageImpl_1(text, listener){
    $clinit_GenericTextMessageImpl();
    GenericMessageImpl_1.call(this, listener);
    this.text = text;
    this.writable = false;
}

defineSeed(168, 114, makeCastMap([Q$TextMessage, Q$GenericMessage, Q$GenericTextMessage]), GenericTextMessageImpl_0, GenericTextMessageImpl_1);
_.clearBody_0 = function clearBody_2(){
    this.writable = true;
    this.text = null;
}
;
_.clone = function clone_5(){
    return $clone(this);
}
;
_.clone_0 = function clone_6(){
    return $clone(this);
}
;
_.createGenericMessage = function createGenericMessage_2(){
    return new GenericTextMessageImpl_1(this.text, this.acknowledgementListener);
}
;
_.getBodyAsBytes = function getBodyAsBytes_1(){
    return asUTF8EncodingBytes(this.text);
}
;
_.getText_0 = function getText(){
    return this.text;
}
;
_.setText_0 = function setText(value){
    $checkWritable(this);
    this.text = value;
}
;
_.text = null;
function GenericTopicRedeliveryHandler_0(subscription){
    GenericRedeliveryHandler_0.call(this, subscription, 1);
}

defineSeed(169, 131, makeCastMap([Q$GenericMessageProcessor]), GenericTopicRedeliveryHandler_0);
function GenericTopicSubscriberImpl_0(topic, name_0, messageSelector, ackMode, listener, messageSemaphore){
    GenericMessageConsumerImpl_0.call(this, topic, messageSelector, ackMode, listener, messageSemaphore);
    this.durableSubscriberName = name_0;
}

defineSeed(170, 134, makeCastMap([Q$TopicSubscriber, Q$GenericMessageConsumer, Q$GenericTopicSubscriber]), GenericTopicSubscriberImpl_0);
_.close_0 = function close_2(callback){
    $consumerUnsubscribed_1(this.listener, this);
    return $close(this, callback);
}
;
_.getDurableSubscriberName = function getDurableSubscriberName_0(){
    return this.durableSubscriberName;
}
;
_.durableSubscriberName = null;
function $add_0(this$static, entry){
    $add_2(this$static.entries, entry);
}

function GenericTransaction_0(transactionID){
    this.entries = new LinkedList_0;
    this.transactionID = transactionID;
}

defineSeed(171, 1, makeCastMap([Q$GenericTransaction]), GenericTransaction_0);
_.transactionID = null;
function GenericUnsubscribeReceipt_0(){
}

defineSeed(172, 109, makeCastMap([Q$GenericUnsubscribeReceipt]), GenericUnsubscribeReceipt_0);
function $clinit_JmsPropertiesContent(){
    $clinit_JmsPropertiesContent = nullMethod;
    propertyComparator = new JmsPropertiesContent$1_0;
}

function $addProperty(this$static, name_0, type, value){
    var p;
    if (!name_0 || !type) {
        throw new IllegalArgumentException_1('Invalid Property: Must have both name and type');
    }
    p = new JmsPropertiesContent$Property_0(name_0, type, value);
    $add_4(this$static.properties, p);
    return p;
}

function $addProperty_0(this$static, name_0, value){
    var rawValue, type;
    if (name_0 == null) {
        throw new IllegalArgumentException_1('Invalid Property: Must have a name');
    }
    type = getType(value);
    rawValue = $asBytesObject(type, value);
    return this$static.addProperty(asByteBuffer(name_0), type, value == null?null:/*$wnd.*/ByteBuffer.wrap(rawValue));
}

function $equals_0(this$static, obj){
    var that, thatProperties, thisProperties;
    if (obj == null) {
        return false;
    }
    if (this$static.___clazz$ != getClass__devirtual$(obj)) {
        return false;
    }
    that = dynamicCast(obj, Q$JmsPropertiesContent);
    if (this$static.properties.size != that.properties.size) {
        return false;
    }
    thisProperties = dynamicCast($toArray_1(this$static.properties, initValues(_3Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent$Property_2_classLit, makeCastMap([Q$JmsPropertiesContent$Property_$1, Q$Serializable, Q$Object_$1]), Q$JmsPropertiesContent$Property, [])), Q$JmsPropertiesContent$Property_$1);
    sort(thisProperties, propertyComparator);
    thatProperties = dynamicCast($toArray_1(that.properties, initValues(_3Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent$Property_2_classLit, makeCastMap([Q$JmsPropertiesContent$Property_$1, Q$Serializable, Q$Object_$1]), Q$JmsPropertiesContent$Property, [])), Q$JmsPropertiesContent$Property_$1);
    sort(thatProperties, propertyComparator);
    return equals_19(thisProperties, thatProperties);
}

function $getProperty_0(this$static, name_0){
    var p, p$iterator;
    for (p$iterator = new AbstractList$IteratorImpl_0(this$static.properties); p$iterator.i < p$iterator.this$0_0.size_0();) {
        p = dynamicCast($next(p$iterator), Q$JmsPropertiesContent$Property);
        if (sameOrEquals(p.name_0, name_0)) {
            return p;
        }
    }
    return null;
}

function $toString_1(this$static){
    var property, property$iterator, sb;
    if (this$static.properties.size == 0) {
        return '{}';
    }
    sb = new StringBuilder_0;
    for (property$iterator = new AbstractList$IteratorImpl_0(this$static.properties); property$iterator.i < property$iterator.this$0_0.size_0();) {
        property = dynamicCast($next(property$iterator), Q$JmsPropertiesContent$Property);
        sb.impl.string.length > 1 && (sb.impl.string += ', ' , sb);
        $append_1(sb, $toString_2(property));
    }
    return '{' + sb.impl.string + '}';
}

function JmsPropertiesContent_0(){
    $clinit_JmsPropertiesContent();
    this.properties = new ArrayList_0;
}

defineSeed(174, 1, makeCastMap([Q$JmsPropertiesContent]), JmsPropertiesContent_0);
_.addProperty = function addProperty(name_0, type, value){
    return $addProperty(this, name_0, type, value);
}
;
_.addProperty_0 = function addProperty_0(name_0, value){
    return $addProperty_0(this, name_0, value);
}
;
_.clone_1 = function clone_7(){
    var clonedPropertiesContent;
    clonedPropertiesContent = new JmsPropertiesContent_0;
    clonedPropertiesContent.properties = new ArrayList_2(this.properties);
    return clonedPropertiesContent;
}
;
_.equals$ = function equals_4(obj){
    return $equals_0(this, obj);
}
;
_.toString$ = function toString_12(){
    return $toString_1(this);
}
;
var propertyComparator;
function $addProperty_1(this$static, index, name_0, type, value){
    var p;
    p = $addProperty(this$static, name_0, type, value);
    this$static.indexes.put_0(valueOf(index), p);
    return p;
}

function $addProperty_2(this$static, index, value){
    $add_4(this$static.properties, value);
    this$static.indexes.put_0(valueOf(index), value);
    return value;
}

function $getProperty_1(this$static, index){
    return dynamicCast(this$static.indexes.get_0(valueOf(index)), Q$JmsPropertiesContent$Property);
}

function $removeProperty(this$static, index){
    var p;
    p = dynamicCast(this$static.indexes.get_0(valueOf(index)), Q$JmsPropertiesContent$Property);
    if (!p) {
        throw new IllegalArgumentException_1('property not exist');
    }
    this$static.indexes.remove(valueOf(index));
    $remove_4(this$static.properties, p);
}

function IndexedPropertiesContent_0(){
    $clinit_JmsPropertiesContent();
    JmsPropertiesContent_0.call(this);
    this.indexes = new HashMap_0;
}

defineSeed(173, 174, makeCastMap([Q$IndexedPropertiesContent, Q$JmsPropertiesContent]), IndexedPropertiesContent_0);
_.addProperty = function addProperty_1(name_0, type, value){
    var nextIndex;
    nextIndex = this.properties.size;
    return $addProperty_1(this, nextIndex << 24 >> 24, name_0, type, value);
}
;
_.addProperty_0 = function addProperty_2(name_0, value){
    var nextIndex, p;
    p = $addProperty_0(this, name_0, value);
    nextIndex = this.properties.size;
    this.indexes.put_0(valueOf(nextIndex << 24 >> 24), p);
    return p;
}
;
_.clone_1 = function clone_8(){
    var clonedPropsContent;
    return clonedPropsContent = new IndexedPropertiesContent_0 , clonedPropsContent.indexes = new HashMap_2(this.indexes) , clonedPropsContent.properties = new ArrayList_2(this.properties) , clonedPropsContent;
}
;
function $canAddToPendingFrames(this$static, frame){
    var addToPendingFrames;
    switch (frame.framecode.ordinal) {
        case 44:
        case 46:
            addToPendingFrames = this$static.channelFilterState.state.value_0 == 2;
            break;
        case 2:
        case 13:
        case 14:
            addToPendingFrames = false;
            break;
        default:addToPendingFrames = true;
    }
    return addToPendingFrames;
}

function $filterPendingFrames(this$static){
    var frame, framesToFilter;
    if (this$static.pendingFrames.arrayList.size != 0) {
        framesToFilter = new LinkedList_0;
        $addAll(framesToFilter, this$static.pendingFrames);
        $clear_0(this$static.pendingFrames.arrayList);
        while (framesToFilter.size != 0) {
            frame = dynamicCast($remove_1(framesToFilter, 0), Q$BumpFrame);
            $canAddToPendingFrames(this$static, frame) && $add_6(this$static.pendingFrames, frame);
        }
    }
}

function $frameWritten(this$static, frame){
    if (this$static.channelFilterState.state.value_0 == 1 || this$static.channelFilterState.state.value_0 == 2) {
        if (frame.framecode == ($clinit_BumpFrame$FrameCode() , CONNECT) || frame.framecode == DISCONNECT) {
            $write(this$static.nextListener, frame);
        }
        else if ($canAddToPendingFrames(this$static, frame)) {
            DEBUG && DEBUG && log_0('Adding pending frame');
            $add_6(this$static.pendingFrames, frame);
        }
        return;
    }
    $write(this$static.nextListener, frame);
}

function $onBrokerConnectionInterrupted(this$static){
    $transitionTo(this$static.channelFilterState, 2);
    $onBrokerConnectionInterrupted_0(this$static.nextChannelListener);
}

function $onBrokerConnectionRestored(this$static){
    $sendPendingFrames(this$static);
    $handleException_1(this$static.nextChannelListener, new ConnectionRestoredException_0('Gateway reported JMS Connection restored'));
}

function $onConnectionFailed(this$static, errorMessage){
    $onConnectionFailed_0(this$static.nextChannelListener, errorMessage);
}

function $onDropped(this$static){
    var wasInterrupted;
    wasInterrupted = this$static.channelFilterState.state.value_0 == 2;
    $transitionTo(this$static.channelFilterState, 1);
    wasInterrupted && $filterPendingFrames(this$static);
    $onDropped_0(this$static.nextChannelListener);
}

function $onReconnect(this$static){
    $sendPendingFrames(this$static);
    $handleException_1(this$static.nextChannelListener, new ConnectionRestoredException_0('WebSocket reconnected'));
}

function $processFrame(this$static, frame){
    frame.framecode == ($clinit_BumpFrame$FrameCode() , CONNECTED) && $transitionTo(this$static.channelFilterState, 0);
    $processFrame_0(this$static.nextHandler, frame);
}

function $processOpen_0(this$static, reconnecting){
    $processOpen_1(this$static.nextHandler, reconnecting);
}

function $sendPendingFrames(this$static){
    var frameToSend, framesToSend;
    if (this$static.pendingFrames.arrayList.size != 0) {
        framesToSend = new LinkedList_0;
        $addAll(framesToSend, this$static.pendingFrames);
        $clear_0(this$static.pendingFrames.arrayList);
        while (framesToSend.size != 0) {
            frameToSend = dynamicCast($remove_1(framesToSend, 0), Q$BumpFrame);
            $write(this$static.nextListener, frameToSend);
        }
    }
}

function $setChannelListener(this$static, listener){
    this$static.nextChannelListener = listener;
}

function JmsChannelFilter_0(handler){
    this.pendingFrames = new Vector_0;
    this.channelFilterState = new JmsChannelFilter$JmsChannelFilterState_0;
    this.nextHandler = handler;
    handler.listener = this;
}

defineSeed(175, 1, {}, JmsChannelFilter_0);
_.nextChannelListener = null;
_.nextHandler = null;
_.nextListener = null;
function JmsChannelFilter$JmsChannelFilterState_0(){
    StateMachine_0.call(this, -1);
}

defineSeed(176, 140, {}, JmsChannelFilter$JmsChannelFilterState_0);
function $attemptReconnect(this$static){
    var e;
    if (this$static.properties.reconnectAttemptsMax_0 == -1 || this$static.reconnectAttemptsRemaining-- > 0) {
        try {
            this$static.channel = null;
            $connect(this$static);
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$Exception)) {
                e = $e0;
                $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
            }
            else
                throw $e0;
        }
    }
}

function $checkConnection(this$static){
    this$static.connectedFrameReceived || !!this$static.channel && $close_3(this$static.channel);
}

function $cleanup(this$static, sendDisconnect){
    var frame, t;
    if (sendDisconnect) {
        frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , DISCONNECT));
        $write(this$static, frame);
    }
    t = new JmsChannelImpl$3_0(this$static);
    $schedule(t, this$static.properties.shutdownDelay_0);
}

function $close_1(this$static){
    var e, sendDisconnect, state;
    state = this$static.channelState.state.value_0;
    if (state == 1 && this$static.reconnecting) {
        this$static.reconnecting = false;
        if (this$static.channel) {
            try {
                $close_3(this$static.channel);
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (instanceOf($e0, Q$Exception)) {
                    e = $e0;
                    $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
                }
                else
                    throw $e0;
            }
        }
    }
    else if (state != 3 && state != 4) {
        $transitionTo(this$static.channelState, 3);
        sendDisconnect = state == 2 && !this$static.serverDisconnecting;
        $cleanup(this$static, sendDisconnect);
    }
    else
        this$static.reconnecting && (this$static.reconnecting = false);
}

function $connect(this$static){
    var e;
    if (!$transitionIf(this$static.channelState, 4, 1)) {
        throw new IllegalStateException_0('Cannot connect: connection not closed');
    }
    try {
        this$static.channel = $createChannel_0(this$static.channelFactory, this$static);
        $connect_1(this$static.channel);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $transitionTo(this$static.channelState, 4);
            this$static.channel = null;
            throw new ConnectionFailedException_0(e);
        }
        else
            throw $e0;
    }
}

function $handleException_0(this$static, e){
    $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
}

function $handleOpen(this$static){
    var t;
    if (!this$static.connectedFrameReceived && this$static.properties.connectionTimeout_0 > 0) {
        t = new JmsChannelImpl$4_0(this$static);
        $schedule(t, this$static.properties.connectionTimeout_0);
    }
    $processOpen_0(this$static.handler, false);
    !!this$static.listener && DEBUG && log_0('JmsConnection onOpen');
}

function $onClose_0(this$static){
    var prevState, t;
    prevState = this$static.channelState.state.value_0;
    $transitionTo(this$static.channelState, 4);
    !!this$static.channel && (this$static.channel = null);
    if (this$static.serverDisconnecting) {
        $onGatewayDisconnected(this$static.listener.nextChannelListener);
        !!this$static.listener && $onClose_2(this$static.listener.nextChannelListener);
        $processClose(this$static.handler.nextHandler.nextProcessor.nextProcessor.nextMessageProcessor);
    }
    else if (prevState == 2 && this$static.connectedFrameReceived) {
        $onDropped(this$static.listener);
        this$static.reconnecting = true;
        this$static.reconnectAttemptsRemaining = this$static.properties.reconnectAttemptsMax_0;
        this$static.interrupted = false;
        $attemptReconnect(this$static);
    }
    else if (this$static.reconnecting) {
        $handleException_1(this$static.listener.nextChannelListener, new ReconnectFailedException_0);
        t = new JmsChannelImpl$1_0(this$static);
        $schedule(t, this$static.properties.reconnectDelay_0);
    }
    else {
        !!this$static.listener && $onClose_2(this$static.listener.nextChannelListener);
        $processClose(this$static.handler.nextHandler.nextProcessor.nextProcessor.nextMessageProcessor);
    }
}

function $onClose_1(this$static, exception){
    var e, ex;
    if (this$static.connectedFrameReceived) {
        $onClose_0(this$static);
    }
    else {
        if (this$static.channel) {
            try {
                $close_3(this$static.channel);
                this$static.channel = null;
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (instanceOf($e0, Q$Exception)) {
                    e = $e0;
                    $printStackTrace(e);
                }
                else
                    throw $e0;
            }
        }
        if (exception) {
            ex = new ConnectionFailedException_2(exception);
            $handleException_1(this$static.exceptionListener, !ex?new JMSException_0('Unknown exception'):ex?ex:new GenericException_0(null));
        }
    }
}

function $onFrame(this$static, frame){
    var connectionRestored, errorMessage, firstTime, keepAlive;
    DEBUG && DEBUG && log_0('IN:  ' + frame);
    switch (frame.framecode.ordinal) {
        case 12:
            firstTime = !this$static.connectedFrameReceived && !this$static.interrupted;
            connectionRestored = this$static.interrupted;
            this$static.connectedFrameReceived = true;
            this$static.interrupted = false;
            $processFrame(this$static.handler, frame);
            firstTime?$onGatewayConnected(this$static.listener.nextChannelListener):connectionRestored?$onBrokerConnectionRestored(this$static.listener):$onReconnect(this$static.listener);
            break;
        case 19:
            keepAlive = dynamicCast(!frame.headers?null:frame.headers.get_0('keep-alive'), Q$Boolean);
            if (!!keepAlive && keepAlive.value_0) {
                this$static.interrupted = true;
                $onBrokerConnectionInterrupted(this$static.listener);
            }
            else {
                this$static.channelState.state.value_0 != 3 && (this$static.serverDisconnecting = true);
            }

            $processFrame(this$static.handler, frame);
            break;
        case 23:
            if (this$static.connectedFrameReceived) {
                $processFrame(this$static.handler, frame);
            }
            else {
                errorMessage = dynamicCast(!frame.headers?null:frame.headers.get_0('message'), Q$String);
                $equals_2('Authentication failed', errorMessage)?$onAuthenticationFailed(this$static.listener.nextChannelListener):$onConnectionFailed(this$static.listener, errorMessage);
            }

            break;
        default:$processFrame(this$static.handler, frame);
    }
}

function $onMessage_0(this$static, buffer){
    $synchronize(this$static.messageSemaphore, new JmsChannelImpl$2_0(this$static, buffer));
}

function $onOpen(this$static){
    var e;
    try {
        if ($transitionIf(this$static.channelState, 1, 2)) {
            if (this$static.reconnecting) {
                this$static.reconnecting = false;
                $processOpen_0(this$static.handler, true);
            }
            else {
                $handleOpen(this$static);
            }
        }
        else {
            if (this$static.channel) {
                $close_3(this$static.channel);
                this$static.channel = null;
            }
            if (this$static.channelState.state.value_0 == 2) {
                throw new IllegalStateException_3('Open fired during CONNECTED state');
            }
        }
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
        }
        else
            throw $e0;
    }
}

function $setChannelFactory(this$static, channelFactory){
    this$static.channelFactory = channelFactory;
}

function $setExceptionListener_0(this$static, exceptionListener){
    this$static.exceptionListener = exceptionListener;
}

function $write(this$static, frame){
    var buffer, exception;
    DEBUG && DEBUG && log_0('OUT: ' + frame);
    if (this$static.channelState.state.value_0 == 2 || this$static.channelState.state.value_0 == 1 && frame.framecode == ($clinit_BumpFrame$FrameCode() , CONNECT) || this$static.channelState.state.value_0 == 3 && frame.framecode == ($clinit_BumpFrame$FrameCode() , DISCONNECT)) {
        try {
            buffer = $encode_0(frame);
            $send_2(this$static.channel, buffer);
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$Exception)) {
                exception = $e0;
                $handleException_1(this$static.exceptionListener, !exception?new JMSException_0('Unknown exception'):instanceOf(exception, Q$JMSException)?dynamicCast(exception, Q$JMSException):new GenericException_0(exception));
            }
            else
                throw $e0;
        }
    }
}

function JmsChannelImpl_0(handler, properties, codec){
    this.messageSemaphore = new GenericSemaphoreImpl_0;
    this.channelState = new JmsChannelImpl$ChannelState_0;
    this.handler = handler;
    handler.nextListener = this;
    this.properties = properties;
    this.bumpCodec = codec;
    this.bumpCodec.listener = this;
}

defineSeed(177, 1, {}, JmsChannelImpl_0);
_.onException_0 = function onException_6(e){
    DEBUG && trace('Exception: ' + $toString(e));
    $handleException_1(this.exceptionListener, !e?new JMSException_0('Unknown exception'):e?e:new GenericException_0(null));
}
;
_.bumpCodec = null;
_.channel = null;
_.channelFactory = null;
_.connectedFrameReceived = false;
_.exceptionListener = null;
_.handler = null;
_.interrupted = false;
_.listener = null;
_.properties = null;
_.reconnectAttemptsRemaining = 0;
_.reconnecting = false;
_.serverDisconnecting = false;
function JmsChannelImpl$1_0(this$0){
    $clinit_Timer();
    this.this$0 = this$0;
}

defineSeed(178, 52, makeCastMap([Q$Timer]), JmsChannelImpl$1_0);
_.run_0 = function run_1(){
    $attemptReconnect(this.this$0);
}
;
_.this$0 = null;
function JmsChannelImpl$2_0(this$0, val$buffer){
    this.this$0 = this$0;
    this.val$buffer = val$buffer;
}

defineSeed(179, 1, makeCastMap([Q$GenericSemaphoreListener]), JmsChannelImpl$2_0);
_.whenAcquired = function whenAcquired_5(semaphore){
    var e;
    try {
        $decode_1(this.this$0.bumpCodec, this.val$buffer);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_0(this.this$0, e);
        }
        else
            throw $e0;
    }
}
;
_.this$0 = null;
_.val$buffer = null;
function JmsChannelImpl$3_0(this$0){
    $clinit_Timer();
    this.this$0 = this$0;
}

defineSeed(180, 52, makeCastMap([Q$Timer]), JmsChannelImpl$3_0);
_.run_0 = function run_2(){
    var e;
    try {
        !!this.this$0.channel && $close_3(this.this$0.channel);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_0(this.this$0, e);
        }
        else
            throw $e0;
    }
}
;
_.this$0 = null;
function JmsChannelImpl$4_0(this$0){
    $clinit_Timer();
    this.this$0 = this$0;
}

defineSeed(181, 52, makeCastMap([Q$Timer]), JmsChannelImpl$4_0);
_.run_0 = function run_3(){
    var e;
    try {
        $checkConnection(this.this$0);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_0(this.this$0, e);
        }
        else
            throw $e0;
    }
}
;
_.this$0 = null;
function JmsChannelImpl$ChannelState_0(){
    StateMachine_0.call(this, 4);
}

defineSeed(182, 140, {}, JmsChannelImpl$ChannelState_0);
function $checkClosed_1(this$static){
    if (this$static.closed_0) {
        throw new IllegalStateException_3('Connection closed');
    }
}

function $checkOpen(this$static){
    if (this$static.closed_0 || !this$static.channel) {
        throw new IllegalStateException_3('Connection not open');
    }
}

function $close_2(this$static, callback){
    if (!this$static.channel) {
        throw new IllegalStateException_3('Close called without calling connect');
    }
    if (!this$static.closed_0) {
        this$static.closed_0 = true;
        this$static.closeFuture = new VoidFuture_0(callback);
        $closeInternal(this$static);
    }
    return this$static.closeFuture;
}

function $closeInternal(this$static){
    var openSessions, session, session$iterator;
    if (this$static.sessions.map.size_0() == 0) {
        !!this$static.channel && $close_1(this$static.channel);
    }
    else {
        openSessions = new HashSet_0;
        openSessions.addAll(this$static.sessions);
        for (session$iterator = $iterator($keySet(openSessions.map)); session$iterator.val$outerIter.hasNext();) {
            session = dynamicCast($next_0(session$iterator), Q$GenericSession);
            try {
                $close_0(session, null);
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (!instanceOf($e0, Q$JMSException))
                    throw $e0;
            }
        }
    }
}

function $connect_0(this$static, callback){
    if (this$static.channel) {
        throw new IllegalStateException_0('connect can only be called once');
    }
    this$static.connectFuture = new VoidFuture_0(callback);
    this$static.channel = $createChannel(this$static.jmsChannelFactory);
    $connect(this$static.channel);
    return this$static.connectFuture;
}

function $connectFailed(this$static, e){
    var future;
    future = this$static.connectFuture;
    this$static.connectFuture = null;
    future.exception_0 = e;
    $fulfillInternal(future);
}

function $createSession(this$static, transacted, acknowledgeMode){
    var session;
    if (!transacted && this$static.nontransactedSessionInUse) {
        throw new UnsupportedOperationException_1('Only one non-transacted session can be active at a time');
    }
    session = new GenericSessionImpl_0(transacted, acknowledgeMode);
    session.sessionListener = this$static;
    $checkClosed_0(session);
    session.exceptionListener = this$static;
    $sessionCreated(session.sessionListener, session);
    return session;
}

function $handleException_1(this$static, e){
    var ex;
    if (this$static.exceptionListener) {
        try {
            this$static.exceptionListener.onException_0(!e?new JMSException_0('Unknown exception'):e?e:new GenericException_0(null));
        }
        catch ($e0) {
            $e0 = caught($e0);
            if (instanceOf($e0, Q$Exception)) {
                ex = $e0;
                trace('Unhandled exception thrown from exception listener:  ' + $toString(ex));
            }
            else
                throw $e0;
        }
    }
    else
        !!this$static.connectFuture && !this$static.connectFuture.fulfilled?$throwException_2(this$static.connectFuture, e):!e.linkedException_0?DEBUG && trace('Exception:  ' + $toString(e)):DEBUG && trace('Exception:  ' + $toString(e.linkedException_0));
}

function $onAuthenticationFailed(this$static){
    this$static.connectFuture?$connectFailed(this$static, new JMSSecurityException_0):$handleException_1(this$static, new IllegalStateException_0('Connection failed without connect future'));
}

function $onBrokerConnectionInterrupted_0(this$static){
    var session, session$iterator;
    for (session$iterator = $iterator($keySet(this$static.sessions.map)); session$iterator.val$outerIter.hasNext();) {
        session = dynamicCast($next_0(session$iterator), Q$GenericSession);
        $clearQueuedMessages(session);
        $invalidateAndRemoveTempDestinations(session);
        $removeTempDestinationConsumers(session);
    }
    !!this$static.concentrator && $removeSubscriptionsForTemporaryDestination(this$static.concentrator);
    $handleException_1(this$static, new ConnectionInterruptedException_0);
}

function $onClose_2(this$static){
    DEBUG && log_0('JmsConnection onClose');
    !!this$static.connectFuture && $connectFailed(this$static, new ConnectionFailedException_1('WebSocket connection failed'));
    if (this$static.closeFuture) {
        try {
            $fulfillInternal(this$static.closeFuture);
        }
        finally {
            this$static.closeFuture = null;
        }
    }
}

function $onConnectionFailed_0(this$static, errorMessage){
    this$static.connectFuture?$connectFailed(this$static, new ConnectionFailedException_1(errorMessage)):$handleException_1(this$static, new IllegalStateException_0('Connection failed without connect future'));
}

function $onDropped_0(this$static){
    var session, session$iterator;
    for (session$iterator = $iterator($keySet(this$static.sessions.map)); session$iterator.val$outerIter.hasNext();) {
        session = dynamicCast($next_0(session$iterator), Q$GenericSession);
        $processDropped_0(session);
    }
    !!this$static.concentrator && $processDropped(this$static.concentrator);
    $handleException_1(this$static, new ConnectionDroppedException_0);
}

function $onGatewayConnected(this$static){
    var future;
    !!this$static.connectFuture && (future = this$static.connectFuture , this$static.connectFuture = null , $fulfillInternal(future) , undefined);
}

function $onGatewayDisconnected(this$static){
    if (!this$static.closed_0) {
        this$static.closed_0 = true;
        $closeInternal(this$static);
    }
    this$static.connectFuture?$connectFailed(this$static, new ConnectionFailedException_1('Connection failed')):$handleException_1(this$static, new ConnectionDisconnectedException_0);
}

function $onStart(this$static){
    if (this$static.startFuture) {
        $fulfillInternal(this$static.startFuture);
        this$static.startFuture = null;
    }
}

function $sessionClosed(this$static, session){
    $removeSession(this$static.concentrator, session);
    session.transacted || (this$static.nontransactedSessionInUse = false);
    $remove_5(this$static.sessions, session);
    this$static.closed_0 && this$static.sessions.map.size_0() == 0 && !!this$static.channel && $close_1(this$static.channel);
}

function $sessionCreated(this$static, session){
    $add_5(this$static.sessions, session);
    session.transacted || (this$static.nontransactedSessionInUse = true);
    $addSession(this$static.concentrator, session);
}

function $setJmsConnectionFactory(this$static, channelFactory){
    this$static.jmsChannelFactory = channelFactory;
}

function JmsConnection_0(clientID){
    $clinit_GenericSessionImpl();
    this.sessions = new HashSet_0;
    this.metaData = new GenericConnectionMetaData_0;
    this.clientID = clientID;
}

defineSeed(183, 1, {}, JmsConnection_0);
_.getClientID_0 = function getClientID(){
    return this.clientID;
}
;
_.getMetaData_0 = function getMetaData(){
    return this.metaData;
}
;
_.onException_0 = function onException_7(e){
    $handleException_1(this, e);
}
;
_.setClientID_0 = function setClientID(clientID){
    throw new UnsupportedOperationException_1("Setting client ID only supported from JmsConnectionFactory's connect() method");
}
;
_.channel = null;
_.clientID = null;
_.closeFuture = null;
_.closed_0 = false;
_.concentrator = null;
_.connectFuture = null;
_.exceptionListener = null;
_.jmsChannelFactory = null;
_.metaData = null;
_.nontransactedSessionInUse = false;
_.startFuture = null;
_.startStopHandler = null;
_.stopFuture = null;
function JmsConnection$1_0(this$0){
    $clinit_Timer();
    this.this$0 = this$0;
}

defineSeed(184, 52, makeCastMap([Q$Timer]), JmsConnection$1_0);
_.run_0 = function run_4(){
    $checkClosed_1(this.this$0);
    $processStart_1(this.this$0.startStopHandler);
}
;
_.this$0 = null;
function JmsConnection$2_0(this$0){
    $clinit_Timer();
    this.this$0 = this$0;
}

defineSeed(185, 52, makeCastMap([Q$Timer]), JmsConnection$2_0);
_.run_0 = function run_5(){
    $checkClosed_1(this.this$0);
    $processStop_1(this.this$0.startStopHandler);
}
;
_.this$0 = null;
function JmsConnectionFactory_0(url){
    JmsConnectionFactory_1.call(this, url, new JmsConnectionProperties_0);
}

function JmsConnectionFactory_1(url, properties){
    this.url = url;
    this.properties = properties;
}

defineSeed(186, 1, {}, JmsConnectionFactory_0, JmsConnectionFactory_1);
_.setWebSocketFactory = function setWebSocketFactory(webSocketFactory){
    this.webSocketFactory = webSocketFactory;
    !!webSocketFactory && this.properties.connectionTimeout_0 > 0 && $setDefaultConnectTimeout(webSocketFactory, this.properties.connectionTimeout_0);
}
;
_.channelFactory = null;
_.properties = null;
_.url = null;
_.webSocketFactory = null;
function $createChannel(this$static){
    var channel, channelFilter, codec;
    channelFilter = new JmsChannelFilter_0(this$static.val$handler);
    codec = new BumpCodecImpl_0;
    channel = new JmsChannelImpl_0(channelFilter, this$static.this$0.properties, codec);
    channel.listener = channelFilter;
    $setChannelListener(channelFilter, this$static.val$conn);
    $setExceptionListener_0(channel, this$static.val$conn);
    !this$static.this$0.channelFactory && (this$static.this$0.channelFactory = new JmsConnectionFactory$1$1_0(this$static));
    $setChannelFactory(channel, this$static.this$0.channelFactory);
    return channel;
}

function JmsConnectionFactory$1_0(this$0, val$handler, val$conn){
    this.this$0 = this$0;
    this.val$handler = val$handler;
    this.val$conn = val$conn;
}

defineSeed(187, 1, {}, JmsConnectionFactory$1_0);
_.this$0 = null;
_.val$conn = null;
_.val$handler = null;
function $createChannel_0(this$static, listener){
    var wsChannel;
    wsChannel = new JmsWebSocketChannel_0(this$static.this$1.this$0.webSocketFactory, this$static.this$1.this$0.url, initValues(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, ['x-kaazing-bump']));
    wsChannel.listener = listener;
    return wsChannel;
}

function JmsConnectionFactory$1$1_0(this$1){
    this.this$1 = this$1;
}

defineSeed(188, 1, {}, JmsConnectionFactory$1$1_0);
_.this$1 = null;
function $onReturn_2(this$static){
    $setValueInternal(this$static.val$connectionFuture, this$static.val$conn);
}

function JmsConnectionFactory$2_0(val$connectionFuture, val$conn){
    this.val$connectionFuture = val$connectionFuture;
    this.val$conn = val$conn;
}

defineSeed(189, 1, {}, JmsConnectionFactory$2_0);
_.onException_1 = function onException_8(e){
    $throwException_2(this.val$connectionFuture, e);
}
;
_.onReturn = function onReturn_3(value){
    $onReturn_2(this, throwClassCastExceptionUnlessNull(value));
}
;
_.val$conn = null;
_.val$connectionFuture = null;
function JmsConnectionProperties_0(){
}

defineSeed(190, 1, {}, JmsConnectionProperties_0);
_.connectionTimeout_0 = 15000;
_.reconnectAttemptsMax_0 = -1;
_.reconnectDelay_0 = 3000;
_.shutdownDelay_0 = 5000;
function $clinit_JmsDataType(){
    $clinit_JmsDataType = nullMethod;
    getUTF8();
    BOOLEAN_0 = new JmsDataType$JmsBooleanDataType_0;
    BYTE_0 = new JmsDataType$JmsByteDataType_0;
    BYTE_ARRAY = new JmsDataType$JmsByteArrayDataType_0;
    CHAR = new JmsDataType$JmsCharDataType_0;
    DOUBLE = new JmsDataType$JmsDoubleDataType_0;
    FLOAT = new JmsDataType$JmsFloatDataType_0;
    INT_0 = new JmsDataType$JmsIntegerDataType_0;
    LONG_0 = new JmsDataType$JmsLongDataType_0;
    NULL = new JmsDataType$JmsNullDataType_0(9, 'null');
    SHORT = new JmsDataType$JmsShortDataType_0;
    STRING_0 = new JmsDataType$JmsStringDataType_0;
    UNDEFINED = new JmsDataType$JmsNullDataType_0(12, 'undefined');
    TYPES = initValues(_3Lcom_kaazing_gateway_jms_client_bump_JmsDataType_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$JmsDataType, [null, BOOLEAN_0, BYTE_0, BYTE_ARRAY, CHAR, DOUBLE, FLOAT, INT_0, LONG_0, NULL, SHORT, STRING_0, UNDEFINED]);
}

function $asBytesObject(this$static, in_$){
    try {
        return this$static.asBytes(in_$);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$ClassCastException)) {
            throw new IllegalArgumentException_1('Invalidate Map Object type: ' + getClass__devirtual$(in_$));
        }
        else
            throw $e0;
    }
}

function JmsDataType_0(encodedType, name_0){
    this.dataTypeByte = encodedType;
    this.name_0 = name_0;
}

function getType(value){
    $clinit_JmsDataType();
    var c;
    if (value == null) {
        return NULL;
    }
    c = getClass__devirtual$(value);
    if (c == Ljava_lang_Boolean_2_classLit) {
        return BOOLEAN_0;
    }
    else if (c == Ljava_lang_Byte_2_classLit) {
        return BYTE_0;
    }
    else if (c == Ljava_lang_Character_2_classLit) {
        return CHAR;
    }
    else if (c == Ljava_lang_Double_2_classLit) {
        return DOUBLE;
    }
    else if (c == Ljava_lang_Float_2_classLit) {
        return FLOAT;
    }
    else if (c == Ljava_lang_Integer_2_classLit) {
        return INT_0;
    }
    else if (c == Ljava_lang_Long_2_classLit) {
        return LONG_0;
    }
    else if (c == Ljava_lang_Short_2_classLit) {
        return SHORT;
    }
    else if (c == Ljava_lang_String_2_classLit) {
        return STRING_0;
    }
    else if (instanceOf(value, Q$byte_$1)) {
        return BYTE_ARRAY;
    }
    throw new IllegalArgumentException_0;
}

defineSeed(191, 1, makeCastMap([Q$JmsDataType]));
_.getFixedLength = function getFixedLength(){
    return -1;
}
;
_.toString$ = function toString_13(){
    return this.name_0;
}
;
_.dataTypeByte = 0;
_.name_0 = null;
var BOOLEAN_0, BYTE_0, BYTE_ARRAY, CHAR, DOUBLE, FLOAT, INT_0, LONG_0, NULL, SHORT, STRING_0, TYPES, UNDEFINED;
function $asObject(value){
    switch (value[0]) {
        case 49:
            return $clinit_Boolean() , TRUE;
        case 48:
            return $clinit_Boolean() , FALSE;
        default:throw new IllegalArgumentException_1($decode_0(value));
    }
}

function JmsDataType$JmsBooleanDataType_0(){
    JmsDataType_0.call(this, 1, 'boolean');
}

defineSeed(192, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsBooleanDataType_0);
_.asBytes = function asBytes(in_$){
    var b;
    return b = dynamicCast(in_$, Q$Boolean).value_0?49:48 , initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [b]);
}
;
_.asObject = function asObject(value){
    return $asObject(value);
}
;
_.getFixedLength = function getFixedLength_0(){
    return 1;
}
;
function JmsDataType$JmsByteArrayDataType_0(){
    JmsDataType_0.call(this, 3, 'byte[]');
}

defineSeed(193, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsByteArrayDataType_0);
_.asBytes = function asBytes_0(in_$){
    return dynamicCast(in_$, Q$byte_$1);
}
;
_.asObject = function asObject_0(value){
    return value;
}
;
function JmsDataType$JmsByteDataType_0(){
    JmsDataType_0.call(this, 2, 'byte');
}

defineSeed(194, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsByteDataType_0);
_.asBytes = function asBytes_1(in_$){
    return initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [dynamicCast(in_$, Q$Byte).value_0]);
}
;
_.asObject = function asObject_1(value){
    return new Byte_0(value[0]);
}
;
_.getFixedLength = function getFixedLength_1(){
    return 1;
}
;
function JmsDataType$JmsCharDataType_0(){
    JmsDataType_0.call(this, 4, 'char');
}

defineSeed(195, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsCharDataType_0);
_.asBytes = function asBytes_2(in_$){
    var c;
    return c = dynamicCast(in_$, Q$Character).value_0 , initValues(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, [c >> 8 << 24 >> 24, c << 24 >> 24]);
}
;
_.asObject = function asObject_2(value){
    var b1, b2;
    return b1 = value[0] , b2 = value[1] , valueOf_0((b1 << 8 | b2) & 65535);
}
;
_.getFixedLength = function getFixedLength_2(){
    return 2;
}
;
function JmsDataType$JmsDoubleDataType_0(){
    JmsDataType_0.call(this, 5, 'double');
}

defineSeed(196, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsDoubleDataType_0);
_.asBytes = function asBytes_3(in_$){
    return asUTF8EncodingBytes('' + dynamicCast(in_$, Q$Double).value_0);
}
;
_.asObject = function asObject_3(value){
    return new Double_0(__parseAndValidateDouble($decode_0(value)));
}
;
function JmsDataType$JmsFloatDataType_0(){
    JmsDataType_0.call(this, 6, 'float');
}

defineSeed(197, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsFloatDataType_0);
_.asBytes = function asBytes_4(in_$){
    return asUTF8EncodingBytes('' + dynamicCast(in_$, Q$Float).value_0);
}
;
_.asObject = function asObject_4(value){
    return new Float_0(parseFloat_0($decode_0(value)));
}
;
function $asBytes(in_$){
    var bytes, valueBuffer;
    valueBuffer = $putInt(new /*$wnd.*/ByteBuffer.allocate(4), in_$.value_0);
    bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 4, 1);
    $get(valueBuffer, bytes, 0, 4);
    return bytes;
}

function JmsDataType$JmsIntegerDataType_0(){
    JmsDataType_0.call(this, 7, 'int');
}

defineSeed(198, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsIntegerDataType_0);
_.asBytes = function asBytes_5(in_$){
    return $asBytes(dynamicCast(in_$, Q$Integer));
}
;
_.asObject = function asObject_5(value){
    return valueOf_1(/*$wnd.*/ByteBuffer.wrap(value).getInt());
}
;
_.getFixedLength = function getFixedLength_3(){
    return 4;
}
;
function $asBytes_0(in_$){
    var bytes, valueBuffer;
    valueBuffer = new /*$wnd.*/ByteBuffer.allocate(8);
    putLong(valueBuffer, in_$.value_0);
    bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 8, 1);
    $get(valueBuffer, bytes, 0, 8);
    return bytes;
}

function JmsDataType$JmsLongDataType_0(){
    JmsDataType_0.call(this, 8, 'long');
}

defineSeed(199, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsLongDataType_0);
_.asBytes = function asBytes_6(in_$){
    return $asBytes_0(dynamicCast(in_$, Q$Long));
}
;
_.asObject = function asObject_6(value){
    var valueBuffer;
    return valueBuffer = /*$wnd.*/ByteBuffer.wrap(value) , valueOf_2(($clinit_ByteBufferUtils() , makeLong(valueBuffer.get(), valueBuffer.get(), valueBuffer.get(), valueBuffer.get(), valueBuffer.get(), valueBuffer.get(), valueBuffer.get(), valueBuffer.get())));
}
;
_.getFixedLength = function getFixedLength_4(){
    return 8;
}
;
function JmsDataType$JmsNullDataType_0(encodedType, name_0){
    JmsDataType_0.call(this, encodedType, name_0);
}

defineSeed(200, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsNullDataType_0);
_.asBytes = function asBytes_7(in_$){
    return null;
}
;
_.asObject = function asObject_7(value){
    return null;
}
;
_.getFixedLength = function getFixedLength_5(){
    return 0;
}
;
function $asBytes_1(in_$){
    var bytes, valueBuffer;
    valueBuffer = $putShort(new /*$wnd.*/ByteBuffer.allocate(2), in_$.value_0);
    bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 2, 1);
    $get(valueBuffer, bytes, 0, 2);
    return bytes;
}

function JmsDataType$JmsShortDataType_0(){
    JmsDataType_0.call(this, 10, 'short');
}

defineSeed(201, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsShortDataType_0);
_.asBytes = function asBytes_8(in_$){
    return $asBytes_1(dynamicCast(in_$, Q$Short));
}
;
_.asObject = function asObject_8(value){
    return valueOf_3(/*$wnd.*/ByteBuffer.wrap(value).getShort());
}
;
_.getFixedLength = function getFixedLength_6(){
    return 2;
}
;
function JmsDataType$JmsStringDataType_0(){
    JmsDataType_0.call(this, 11, 'String');
}

defineSeed(202, 191, makeCastMap([Q$JmsDataType]), JmsDataType$JmsStringDataType_0);
_.asBytes = function asBytes_9(in_$){
    return asUTF8EncodingBytes(dynamicCast(in_$, Q$String));
}
;
_.asObject = function asObject_9(value){
    return $decode_0(value);
}
;
function $clinit_JmsExtension(){
    $clinit_JmsExtension = nullMethod;
    DURABLE = new JmsExtension_0(($clinit_JmsExtension$Kind() , DURABLE_0));
    MAP_MESSAGE = new JmsExtension_0(MAP_MESSAGE_0);
    SELECTORS = new JmsExtension_0(SELECTORS_0);
    TEMPDEST = new JmsExtension_0(TEMPDEST_0);
    TYPED_PROPERTIES = new JmsExtension_0(TYPED_PROPERTIES_0);
    Extensions = initValues(_3Lcom_kaazing_gateway_jms_client_bump_JmsExtension_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$JmsExtension, [DURABLE, MAP_MESSAGE, SELECTORS, TEMPDEST, null, TYPED_PROPERTIES]);
}

function JmsExtension_0(kind){
    this.kind = kind;
    this.value_0 = 'x-kaazing-' + $replaceAll(kind.name_0.toLowerCase(), '_', '-');
}

defineSeed(203, 1, makeCastMap([Q$JmsExtension]), JmsExtension_0);
_.equals$ = function equals_5(obj){
    var that;
    if (!instanceOf(obj, Q$JmsExtension)) {
        return false;
    }
    that = dynamicCast(obj, Q$JmsExtension);
    return this.kind == that.kind;
}
;
_.hashCode$ = function hashCode_4(){
    return getHashCode(this.kind);
}
;
_.kind = null;
_.parameters = null;
_.value_0 = null;
var DURABLE, Extensions, MAP_MESSAGE, SELECTORS, TEMPDEST, TYPED_PROPERTIES;
function $clinit_JmsExtension$Kind(){
    $clinit_JmsExtension$Kind = nullMethod;
    DURABLE_0 = new JmsExtension$Kind_0('DURABLE', 0);
    MAP_MESSAGE_0 = new JmsExtension$Kind_0('MAP_MESSAGE', 1);
    SELECTORS_0 = new JmsExtension$Kind_0('SELECTORS', 2);
    TEMPDEST_0 = new JmsExtension$Kind_0('TEMPDEST', 3);
    APNS = new JmsExtension$Kind_0('APNS', 4);
    TYPED_PROPERTIES_0 = new JmsExtension$Kind_0('TYPED_PROPERTIES', 5);
    $VALUES_1 = initValues(_3Lcom_kaazing_gateway_jms_client_bump_JmsExtension$Kind_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$JmsExtension$Kind, [DURABLE_0, MAP_MESSAGE_0, SELECTORS_0, TEMPDEST_0, APNS, TYPED_PROPERTIES_0]);
}

function JmsExtension$Kind_0(enum$name, enum$ordinal){
    Enum_0.call(this, enum$name, enum$ordinal);
}

function values_2(){
    $clinit_JmsExtension$Kind();
    return $VALUES_1;
}

defineSeed(204, 98, makeCastMap([Q$JmsExtension$Kind, Q$Serializable, Q$Comparable, Q$Enum]), JmsExtension$Kind_0);
var $VALUES_1, APNS, DURABLE_0, MAP_MESSAGE_0, SELECTORS_0, TEMPDEST_0, TYPED_PROPERTIES_0;
function $clinit_JmsHandlerImpl(){
    $clinit_JmsHandlerImpl = nullMethod;
    UTF8_1 = getUTF8();
}

function $beginSent_0(this$static, txnID){
    var frame;
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , BEGIN));
    $setHeader(frame, 'transaction', txnID);
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $commitSent_0(this$static, txnID, receiptID){
    var frame;
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , COMMIT));
    $setHeader(frame, 'transaction', txnID);
    $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $createMessage(this$static, frame){
    var body, buffer, correlationID, destination, destinationHeaderValue, destinationName, e, index, index$iterator, indexes, keys, mapMessage, message, priority, prop, prop$iterator, propertiesContent, property, replyTo, subEntry, subscriptionID, t, text;
    try {
        body = frame.body;
        if (frame.framecode == ($clinit_BumpFrame$FrameCode() , MESSAGE_TEXT) || frame.framecode == MESSAGE_TEXT_SNAPSHOT) {
            text = $decode(UTF8_1, body);
            message = new GenericTextMessageImpl_1(text, null);
        }
        else if (frame.framecode == MESSAGE_MAP || frame.framecode == MESSAGE_MAP_SNAPSHOT) {
            mapMessage = new GenericMapMessageImpl_0(null);
            if (!!frame.namedItems && frame.namedItems.properties.size != 0) {
                for (prop$iterator = new AbstractList$IteratorImpl_0(frame.namedItems.properties); prop$iterator.i < prop$iterator.this$0_0.size_0();) {
                    prop = dynamicCast($next(prop$iterator), Q$JmsPropertiesContent$Property);
                    $setMapMessage(mapMessage, prop);
                }
            }
            if (frame.indexedItems) {
                indexes = $keySet(frame.indexedItems);
                for (index$iterator = $iterator(indexes); index$iterator.val$outerIter.hasNext();) {
                    index = dynamicCast($next_0(index$iterator), Q$Byte).value_0;
                    buffer = dynamicCastJso(frame.indexedItems.get_0(valueOf(index)));
                    if (buffer) {
                        property = $getProperty_1(frame.itemsDictionary, index);
                        if (!property) {
                            throw new JMSException_0('indexed item not found for index [' + index + ']');
                        }
                        $setMapMessage_0(mapMessage, property, buffer);
                    }
                }
            }
            mapMessage.writable = false;
            message = mapMessage;
        }
        else {
            message = new GenericBytesMessageImpl_0(body.slice());
        }
        message.writableProperties = true;
        destinationHeaderValue = null;
        if ((!frame.headers?null:frame.headers.get_0('correlation-id')) != null) {
            correlationID = dynamicCast(!frame.headers?null:frame.headers.get_0('correlation-id'), Q$byte_$1);
            $setJMSCorrelationID(message, $decode_0(correlationID));
        }
        (!frame.headers?null:frame.headers.get_0('destination')) != null && (destinationHeaderValue = toString__devirtual$(!frame.headers?null:frame.headers.get_0('destination')));
        (!frame.headers?null:frame.headers.get_0('expires')) != null && $setJMSExpiration(message, dynamicCast(!frame.headers?null:frame.headers.get_0('expires'), Q$Long).value_0);
        (!frame.headers?null:frame.headers.get_0('message-id')) != null && $setJMSMessageID(message, dynamicCast(!frame.headers?null:frame.headers.get_0('message-id'), Q$String));
        if ((!frame.headers?null:frame.headers.get_0('priority')) != null) {
            t = dynamicCast(!frame.headers?null:frame.headers.get_0('priority'), Q$Byte).value_0;
            priority = 15 & t;
            if (priority < 0 || priority > 9) {
                throw new JMSException_0('Invalid priority: ' + priority);
            }
            $setJMSPriority(message, priority);
        }
        (!frame.headers?null:frame.headers.get_0('persistent')) != null && $setJMSDeliveryMode(message, dynamicCast(!frame.headers?null:frame.headers.get_0('persistent'), Q$Boolean).value_0?2:1);
        (!frame.headers?null:frame.headers.get_0('redelivered')) != null && $setJMSRedelivered(message, dynamicCast(!frame.headers?null:frame.headers.get_0('redelivered'), Q$Boolean).value_0);
        if ((!frame.headers?null:frame.headers.get_0('reply-to')) != null) {
            replyTo = $lookup(this$static.destinationFactory, dynamicCast(!frame.headers?null:frame.headers.get_0('reply-to'), Q$String));
            message.replyTo = replyTo;
        }
        if ((!frame.headers?null:frame.headers.get_0('subscription')) != null) {
            subEntry = dynamicCast(this$static.subscriptionIdMap.get_0(dynamicCast(!frame.headers?null:frame.headers.get_0('subscription'), Q$Integer)), Q$JmsHandlerImpl$SubscriptionEntry);
            if (subEntry) {
                $setSubscriptionID(message, subEntry.subscriptionKey);
            }
            else {
                throw new JMSException_0('Subscription ID not found - ' + (!frame.headers?null:frame.headers.get_0('subscription')));
            }
        }
        (!frame.headers?null:frame.headers.get_0('type')) != null && $setJMSType(message, dynamicCast(!frame.headers?null:frame.headers.get_0('type'), Q$String));
        (!frame.headers?null:frame.headers.get_0('timestamp')) != null && $setJMSTimestamp(message, dynamicCast(!frame.headers?null:frame.headers.get_0('timestamp'), Q$Long).value_0);
        (!frame.headers?null:frame.headers.get_0('transaction')) != null && $setTransactionID(message, dynamicCast(!frame.headers?null:frame.headers.get_0('transaction'), Q$String));
        propertiesContent = frame.namedProperties;
        if (!!frame.namedProperties && frame.namedProperties.properties.size != 0) {
            for (prop$iterator = new AbstractList$IteratorImpl_0(propertiesContent.properties); prop$iterator.i < prop$iterator.this$0_0.size_0();) {
                prop = dynamicCast($next(prop$iterator), Q$JmsPropertiesContent$Property);
                $setMessageProperty(message, prop);
            }
        }
        if (frame.indexedProperties) {
            keys = $keySet(frame.propertiesDictionary.indexes);
            for (index$iterator = $iterator(keys); index$iterator.val$outerIter.hasNext();) {
                index = dynamicCast($next_0(index$iterator), Q$Byte).value_0;
                buffer = dynamicCastJso(frame.indexedProperties.get_0(valueOf(index)));
                property = $getProperty_1(frame.propertiesDictionary, index);
                if (!property) {
                    throw new BumpException_0('indexed item not found for index [' + index + ']');
                }
                $setMessageProperty_0(message, property, buffer);
            }
        }
        subscriptionID = message.subscriptionID;
        if (subscriptionID == null) {
            throw new BumpException_0('Subscription ID missing or invalid subscription Id on message ' + message.messageID);
        }
        destinationName = destinationHeaderValue;
        destinationHeaderValue == null && (destinationName = $getDestinationName(subscriptionID));
        destination = $lookup(this$static.destinationFactory, destinationName);
        message.destination = destination;
        message.writableProperties = false;
        return message;
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            throw !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e);
        }
        else
            throw $e0;
    }
}

function $createReceipt(this$static, frame){
    var ackReceipt, endIndex, maxPendingAcks, prefix, receipt, receiptID, subEntry, subKey, subscribeReceipt, subscription, subscriptionId, unsubscribeReceipt;
    receiptID = dynamicCast(!frame.headers?null:frame.headers.get_0('receipt-id'), Q$String);
    subscription = dynamicCast(!frame.headers?null:frame.headers.get_0('subscription'), Q$Integer);
    if (receiptID == null) {
        throw new BumpException_0('Missing receipt-id header');
    }
    prefix = receiptID.substr(0, 4 - 0);
    if ($equals_2('ACK:', prefix)) {
        endIndex = receiptID.indexOf(';', 4);
        if (endIndex < 0) {
            throw new BumpException_0('Acknowledgement receipt received with invalid format');
        }
        ackReceipt = new GenericAckReceipt_0;
        ackReceipt.receiptID = receiptID;
        $setSubscriptionID(ackReceipt, receiptID.substr(4, endIndex - 4));
        $setMessageID(ackReceipt, $substring(receiptID, endIndex + 1));
        maxPendingAcks = dynamicCast(!frame.headers?null:frame.headers.get_0('max-pending-acks'), Q$String);
        maxPendingAcks != null && (__parseAndValidateInt(maxPendingAcks, -2147483648, 2147483647) , undefined);
        return ackReceipt;
    }
    else if ($equals_2('SUB:', prefix)) {
        subKey = $substring(receiptID, 4);
        subEntry = dynamicCast(this$static.subscriptionKeyMap.get_0(subKey), Q$JmsHandlerImpl$SubscriptionEntry);
        if (!subEntry) {
            throw new IllegalStateException_3('Subscription entry not found for key: ' + subKey);
        }
        subEntry.subscriptionID = subscription;
        this$static.subscriptionIdMap.put_0(subscription, subEntry);
        subscribeReceipt = new GenericSubscribeReceipt_0;
        subscribeReceipt.receiptID = receiptID;
        subscribeReceipt.subscriptionID = subKey;
        !!subEntry.unsubscribePending && subEntry.unsubscribePending.locked.value_0 && $release(subEntry.unsubscribePending);
        return subscribeReceipt;
    }
    else if ($equals_2('UNS:', prefix)) {
        subscriptionId = valueOf_1(__parseAndValidateInt($substring(receiptID, 4), -2147483648, 2147483647));
        subEntry = dynamicCast(this$static.subscriptionIdMap.remove(subscriptionId), Q$JmsHandlerImpl$SubscriptionEntry);
        if (!subEntry) {
            throw new JMSException_0('Subscription not found to receipt ' + receiptID);
        }
        $deleteSnapshotFrames(this$static, subscriptionId.value_0);
        unsubscribeReceipt = new GenericUnsubscribeReceipt_0;
        unsubscribeReceipt.receiptID = receiptID;
        $setSubscriptionID(unsubscribeReceipt, subEntry.subscriptionKey);
        return unsubscribeReceipt;
    }
    else {
        receipt = new GenericReceiptImpl_0;
        receipt.receiptID = receiptID;
        return receipt;
    }
}

function $deleteSnapshotFrames(this$static, subscriptionId){
    var key, keyIter, keys, snapshot;
    keys = $keySet(this$static.messageSnapshotMap);
    keyIter = $iterator(keys);
    while (keyIter.val$outerIter.hasNext()) {
        key = dynamicCast($next_0(keyIter), Q$Integer);
        snapshot = dynamicCast(this$static.messageSnapshotMap.get_0(key), Q$BumpFrame);
        subscriptionId == dynamicCast(!snapshot.headers?null:snapshot.headers.get_0('subscription'), Q$Integer).value_0 && keyIter.val$outerIter.remove_1();
    }
}

function $destinationCreated_0(this$static, creation, receiptID){
    var destination, frame;
    if (!this$static.extensions.contains(($clinit_JmsExtension() , TEMPDEST))) {
        return;
    }
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , CREATE));
    destination = creation.destination.getName();
    $setHeader(frame, 'destination', destination);
    receiptID != null && $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $destinationDeleted_0(this$static, deletion, receiptID){
    var destination, frame;
    if (!this$static.extensions.contains(($clinit_JmsExtension() , TEMPDEST))) {
        return;
    }
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , DELETE));
    destination = deletion.destination.getName();
    $setHeader(frame, 'destination', destination);
    receiptID != null && $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $getDestinationName(subscriptionID){
    var escapedDestination, index, newPrefix, prefix;
    index = subscriptionID.indexOf('/');
    prefix = subscriptionID.substr(0, index + 1 - 0);
    if (subscriptionID.indexOf('dts/') == 0) {
        newPrefix = '/topic/';
    }
    else if (subscriptionID.indexOf('t/') == 0) {
        newPrefix = '/topic/';
    }
    else if (subscriptionID.indexOf('tt/') == 0) {
        newPrefix = '/temp-topic/';
    }
    else if (subscriptionID.indexOf('rt/') == 0) {
        newPrefix = '/remote-temp-topic/';
    }
    else if (subscriptionID.indexOf('q/') == 0) {
        newPrefix = '/queue/';
    }
    else if (subscriptionID.indexOf('tq/') == 0) {
        newPrefix = '/temp-queue/';
    }
    else if (subscriptionID.indexOf('rq/') == 0) {
        newPrefix = '/remote-temp-queue/';
    }
    else {
        throw new BumpException_0('Unknown subscription ID: ' + subscriptionID);
    }
    escapedDestination = $replace(subscriptionID, prefix, newPrefix);
    return escapedDestination;
}

function $messageAcknowledged_1(this$static, message){
    var entry, frame, receiptID, subKey, transactionID;
    subKey = message.getSubscriptionID();
    entry = dynamicCast(this$static.subscriptionKeyMap.get_0(subKey), Q$JmsHandlerImpl$SubscriptionEntry);
    !entry && $handleException_1(this$static.exceptionListener, new JMSException_0('Subscription ID missing on message ' + message.getJMSMessageID_0()));
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , ACK));
    $setHeader(frame, 'message-id', message.getJMSMessageID_0());
    neq(message.getServerIndex(), P0_longLit) && $setHeader(frame, 'index', valueOf_2(message.getServerIndex()));
    $setHeader(frame, 'subscription', entry.subscriptionID);
    receiptID = message.getReceiptID();
    receiptID != null && $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
    transactionID = message.getTransactionID();
    transactionID != null && $setHeader(frame, 'transaction', transactionID);
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $messageSent_1(this$static, message){
    var body, content_0, correlationID, deliveryMode, destination, e, expiration, frame, key, mapMessage, mapNames, priority, receiptID, replyToDestination, transactionID, type, value;
    try {
        if (instanceOf(message, Q$GenericTextMessage)) {
            frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , SEND_TEXT));
            $setBody(frame, wrap(message.getBodyAsBytes()));
        }
        else if (instanceOf(message, Q$GenericMapMessage)) {
            frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , SEND_MAP));
            mapMessage = dynamicCast(message, Q$GenericMapMessage);
            content_0 = new JmsPropertiesContent_0;
            mapNames = $getMapNames(mapMessage);
            while (mapNames.val$names.val$outerIter.hasNext()) {
                key = dynamicCast($next_0(mapNames.val$names), Q$String);
                value = $getObject(mapMessage, key);
                content_0.addProperty_0(key, value);
            }
            frame.namedItems = content_0;
        }
        else {
            frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , SEND_BINARY));
            body = message.getBodyAsBytes();
            body != null && $setBody(frame, /*$wnd.*/ByteBuffer.wrap(body));
        }
        destination = message.getJMSDestination_1();
        $setHeader(frame, 'destination', destination.getName());
        transactionID = message.getTransactionID();
        transactionID != null && $setHeader(frame, 'transaction', transactionID);
        receiptID = message.getReceiptID();
        receiptID != null && $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
        deliveryMode = message.getJMSDeliveryMode_0();
        priority = message.getJMSPriority_0();
        if (deliveryMode != 2 || priority != 4) {
            $setHeader(frame, 'persistent', deliveryMode == 2?($clinit_Boolean() , TRUE):($clinit_Boolean() , FALSE));
            $setHeader(frame, 'priority', new Byte_0(priority << 24 >> 24));
        }
        correlationID = message.getJMSCorrelationID_0();
        correlationID != null && $setHeader(frame, 'correlation-id', asUTF8EncodingBytes(correlationID));
        type = message.getJMSType_0();
        type != null && $setHeader(frame, 'type', type);
        replyToDestination = message.getJMSReplyTo_1();
        !!replyToDestination && $setHeader(frame, 'reply-to', replyToDestination.getName());
        expiration = message.getJMSExpiration_0();
        neq(expiration, P0_longLit) && $setHeader(frame, 'expires', valueOf_2(expiration));
        $setNamedProperties(frame, message.getPropertiesContent());
        $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
        }
        else
            throw $e0;
    }
}

function $processDeltaMessage(snaphshot, frame){
    var e;
    try {
        processDeltaFrame(snaphshot, frame);
        return snaphshot;
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$Exception)) {
            e = $e0;
            throw !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e);
        }
        else
            throw $e0;
    }
}

function $processFrame_0(this$static, frame){
    var connected, disconnected, e, exc, extension, extension$iterator, keepAlive, message, receipt, snapShot, snapshotId, snapshotId_0;
    switch (frame.framecode.ordinal) {
        case 12:
            connected = new GenericConnected_0;
            this$static.clientID = dynamicCast(!frame.headers?null:frame.headers.get_0('session'), Q$String);
            connected.clientID = this$static.clientID;
            this$static.initialConnection && (this$static.initialConnection = false);
            this$static.extensions = frame.extensions;
            connected.selectorsSupported = this$static.extensions.contains(($clinit_JmsExtension() , SELECTORS));
            if (this$static.extensions.contains(DURABLE)) {
                for (extension$iterator = this$static.extensions.iterator(); extension$iterator.hasNext();) {
                    extension = dynamicCast(extension$iterator.next_0(), Q$JmsExtension);
                    extension.kind == ($clinit_JmsExtension$Kind() , DURABLE_0) && (connected.durableNameFormat = !extension.parameters?null:dynamicCast(extension.parameters.get_0('format'), Q$String));
                }
            }

            if (this$static.interrupted) {
                connected.interrupted = this$static.interrupted;
                this$static.interrupted = false;
            }

            $processConnected_2(this$static.nextProcessor, connected);
            break;
        case 19:
            disconnected = new GenericDisconnected_0;
            keepAlive = dynamicCast(!frame.headers?null:frame.headers.get_0('keep-alive'), Q$Boolean);
            if (!!keepAlive && keepAlive.value_0) {
                this$static.interrupted = true;
                disconnected.interrupted = true;
            }

            $processDisconnected_1(this$static.nextProcessor, disconnected);
            break;
        case 8:
        case 9:
        case 10:
        case 16:
        case 17:
        case 18:
        case 32:
        case 33:
        case 34:
            try {
                (frame.framecode == ($clinit_BumpFrame$FrameCode() , MESSAGE_BINARY_SNAPSHOT) || frame.framecode == MESSAGE_MAP_SNAPSHOT || frame.framecode == MESSAGE_TEXT_SNAPSHOT) && (snapshotId = frame.snapshotId , this$static.messageSnapshotMap.put_0(valueOf_1(snapshotId), frame) , undefined);
                if (frame.framecode == MESSAGE_BINARY_DELTA || frame.framecode == MESSAGE_MAP_DELTA || frame.framecode == MESSAGE_TEXT_DELTA) {
                    snapShot = (snapshotId_0 = frame.snapshotId , dynamicCast(this$static.messageSnapshotMap.get_0(valueOf_1(snapshotId_0)), Q$BumpFrame));
                    if (!snapShot) {
                        throw new BumpException_0('error processing delta message: snapshot frame does not exist for subscription [' + (!frame.headers?null:frame.headers.get_0('subscription')) + ']');
                    }
                    frame = $processDeltaMessage(snapShot, frame);
                }
                message = $createMessage(this$static, frame);
                $processMessage_1(this$static.nextProcessor, message);
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (instanceOf($e0, Q$Exception)) {
                    e = $e0;
                    $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
                }
                else
                    throw $e0;
            }

            break;
        case 35:
            try {
                receipt = $createReceipt(this$static, frame);
                $processReceipt_1(this$static.nextProcessor, receipt);
            }
            catch ($e0) {
                $e0 = caught($e0);
                if (instanceOf($e0, Q$Exception)) {
                    e = $e0;
                    $handleException_1(this$static.exceptionListener, !e?new JMSException_0('Unknown exception'):instanceOf(e, Q$JMSException)?dynamicCast(e, Q$JMSException):new GenericException_0(e));
                }
                else
                    throw $e0;
            }

            break;
        case 23:
        {
            message = dynamicCast(!frame.headers?null:frame.headers.get_0('message'), Q$String);
            exc = new BumpException_1('Gateway Reported Error: ' + message, '' + (!frame.headers?null:frame.headers.get_0('code')));
            $fillInStackTrace(exc);
            $handleException_1(this$static.exceptionListener, exc);
        }

    }
}

function $processOpen_1(this$static, reconnecting){
    var frame, sendConnect;
    sendConnect = !reconnecting && this$static.connectOnOpen || reconnecting && !this$static.initialConnection;
    if (sendConnect) {
        this$static.interrupted = false;
        frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , CONNECT));
        this$static.clientID != null && $setHeader(frame, 'client-id', this$static.clientID);
        $setHeader(frame, 'login', this$static.login);
        $setHeader(frame, 'passcode', this$static.passcode);
        $add_5(frame.extensions, ($clinit_JmsExtension() , DURABLE));
        $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
    }
    $processOpen(this$static.nextProcessor.nextProcessor.nextMessageProcessor);
}

function $rollbackSent_0(this$static, txnID, receiptID){
    var frame;
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , ABORT));
    $setHeader(frame, 'transaction', txnID);
    $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $setMapMessage(message, property){
    var propName, type, value, valueByteArray;
    propName = asString(property.name_0);
    type = property.type_0;
    if (type == ($clinit_JmsDataType() , NULL)) {
        $setObject(message, propName, null);
    }
    else {
        valueByteArray = $getBytes(property.value_0);
        value = type.asObject(valueByteArray);
        $setObject(message, propName, value);
    }
}

function $setMapMessage_0(message, property, buffer){
    var propName, type, value, valueByteArray;
    if (!buffer) {
        return;
    }
    propName = asString(property.name_0);
    type = property.type_0;
    if (type == ($clinit_JmsDataType() , NULL) || !buffer.hasRemaining()) {
        $setObject(message, propName, null);
    }
    else {
        valueByteArray = $getBytes(buffer);
        value = type.asObject(valueByteArray);
        $setObject(message, propName, value);
    }
}

function $setMessageProperty(message, property){
    var propName, type, value, valueByteArray;
    propName = asString(property.name_0);
    type = property.type_0;
    if (type == ($clinit_JmsDataType() , NULL)) {
        $setObjectProperty(message, propName, null);
    }
    else {
        valueByteArray = $getBytes(property.value_0);
        value = type.asObject(valueByteArray);
        $setObjectProperty(message, propName, value);
    }
}

function $setMessageProperty_0(message, property, buffer){
    var propName, type, value, valueByteArray;
    if (!buffer) {
        return;
    }
    propName = asString(property.name_0);
    type = property.type_0;
    if (type == ($clinit_JmsDataType() , NULL) || !buffer.hasRemaining() && type != STRING_0) {
        $setObjectProperty(message, propName, null);
    }
    else {
        valueByteArray = $getBytes(buffer);
        value = type.asObject(valueByteArray);
        $setObjectProperty(message, propName, value);
    }
}

function $subscribed(this$static, subscription){
    var destination, durableSubscriberName, entry, frame, messageSelector, receiptID, subscriptionID;
    subscriptionID = subscription.subscriptionID;
    subscriptionID == null && (subscriptionID = $substring(subscription.subscriptionID != null?'SUB:' + subscription.subscriptionID:'SUB:' + $getUniqueID(subscription), 4));
    entry = dynamicCast(this$static.subscriptionKeyMap.get_0(subscriptionID), Q$JmsHandlerImpl$SubscriptionEntry);
    if (!entry) {
        entry = new JmsHandlerImpl$SubscriptionEntry_0(subscriptionID);
        this$static.subscriptionKeyMap.put_0(subscriptionID, entry);
    }
    else {
        if (entry.unsubscribePending) {
            entry.unsubscribePending = null;
            return;
        }
    }
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , SUBSCRIBE));
    destination = subscription.destination.getName();
    $setHeader(frame, 'destination', destination);
    durableSubscriberName = subscription.durableSubscriberName;
    durableSubscriberName != null && $setHeader(frame, 'durable-subscriber-name', durableSubscriberName);
    $setHeader(frame, 'ack', valueOf(subscription.acknowledgementMode << 24 >> 24));
    messageSelector = subscription.messageSelector;
    messageSelector != null && $setHeader(frame, 'selector', messageSelector);
    receiptID = subscription.subscriptionID != null?'SUB:' + subscription.subscriptionID:'SUB:' + $getUniqueID(subscription);
    receiptID != null && $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $subscriberDeleted_0(this$static, deletion, receiptID){
    var frame;
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , DELETE));
    $setHeader(frame, 'durable-subscriber-name', deletion.durableName);
    receiptID != null && $setHeader(frame, 'receipt', asUTF8EncodingBytes(receiptID));
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function $unsubscribed_0(this$static, subscription){
    var entry, subscriptionID, unsubscribePending;
    subscriptionID = subscription.subscriptionID;
    entry = dynamicCast(this$static.subscriptionKeyMap.get_0(subscriptionID), Q$JmsHandlerImpl$SubscriptionEntry);
    if (!entry) {
        throw new IllegalStateException_3('Subscription entry not found during unsubscribe');
    }
    unsubscribePending = new GenericSemaphoreImpl_0;
    entry.unsubscribePending = unsubscribePending;
    !entry.subscriptionID && $compareAndSet(unsubscribePending.locked);
    $acquire(unsubscribePending, new JmsHandlerImpl$2_0(this$static, entry, subscriptionID));
}

function $write_0(this$static, frame){
    $synchronize(this$static.writeSemaphore, new JmsHandlerImpl$3_0(this$static, frame));
}

function JmsHandlerImpl_0(username, password, clientID){
    $clinit_JmsHandlerImpl();
    this.writeSemaphore = new GenericSemaphoreImpl_0;
    this.messageSnapshotMap = new HashMap_0;
    this.destinationFactory = ($clinit_GenericDestinationFactory() , FACTORY);
    this.subscriptionIdMap = new HashMap_0;
    this.subscriptionKeyMap = new HashMap_0;
    this.extensions = ($clinit_Collections() , $clinit_Collections() , EMPTY_SET);
    this.login = username;
    this.passcode = password == null?null:asUTF8EncodingBytes(password);
    this.clientID = clientID;
    this.connectOnOpen = true;
}

defineSeed(205, 1, {}, JmsHandlerImpl_0);
_.messageAcknowledged = function messageAcknowledged_8(message){
    $messageAcknowledged_1(this, message);
}
;
_.subscribed = function subscribed_1(subscription){
    $subscribed(this, subscription);
}
;
_.unsubscribed = function unsubscribed_1(subscription, receiptID, stopped){
    $unsubscribed_0(this, subscription);
}
;
_.clientID = null;
_.connectOnOpen = false;
_.exceptionListener = null;
_.initialConnection = true;
_.interrupted = false;
_.listener = null;
_.login = null;
_.nextProcessor = null;
_.passcode = null;
var UTF8_1;
function JmsHandlerImpl$2_0(this$0, val$entry, val$subscriptionID){
    this.this$0 = this$0;
    this.val$entry = val$entry;
    this.val$subscriptionID = val$subscriptionID;
}

defineSeed(206, 1, makeCastMap([Q$GenericSemaphoreListener]), JmsHandlerImpl$2_0);
_.whenAcquired = function whenAcquired_6(semaphore){
    var frame;
    this.val$entry.unsubscribePending = null;
    this.this$0.subscriptionKeyMap.remove(this.val$subscriptionID);
    frame = new BumpFrame_0(($clinit_BumpFrame$FrameCode() , UNSUBSCRIBE));
    $setHeader(frame, 'id', this.val$entry.subscriptionID);
    $setHeader(frame, 'receipt', asUTF8EncodingBytes('UNS:' + this.val$entry.subscriptionID));
    $write_0(this.this$0, frame);
}
;
_.this$0 = null;
_.val$entry = null;
_.val$subscriptionID = null;
function JmsHandlerImpl$3_0(this$0, val$frame){
    this.this$0 = this$0;
    this.val$frame = val$frame;
}

defineSeed(207, 1, makeCastMap([Q$GenericSemaphoreListener]), JmsHandlerImpl$3_0);
_.whenAcquired = function whenAcquired_7(semaphore){
    $frameWritten(this.this$0.listener, this.val$frame);
}
;
_.this$0 = null;
_.val$frame = null;
function JmsHandlerImpl$SubscriptionEntry_0(subKey){
    this.subscriptionKey = subKey;
}

defineSeed(208, 1, makeCastMap([Q$JmsHandlerImpl$SubscriptionEntry]), JmsHandlerImpl$SubscriptionEntry_0);
_.subscriptionID = null;
_.subscriptionKey = null;
_.unsubscribePending = null;
function $compare(o1, o2){
    var n1, n2;
    n1 = asString(o1.name_0);
    n2 = asString(o2.name_0);
    return compareTo_9(n1, n2);
}

function JmsPropertiesContent$1_0(){
}

defineSeed(209, 1, {}, JmsPropertiesContent$1_0);
_.compare = function compare(o1, o2){
    return $compare(dynamicCast(o1, Q$JmsPropertiesContent$Property), dynamicCast(o2, Q$JmsPropertiesContent$Property));
}
;
function $equals_1(this$static, obj){
    var that;
    if (obj == null) {
        return false;
    }
    if (Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent$Property_2_classLit != getClass__devirtual$(obj)) {
        return false;
    }
    that = dynamicCast(obj, Q$JmsPropertiesContent$Property);
    return sameOrEquals(this$static.name_0, that.name_0) && this$static.type_0 == that.type_0 && sameOrEquals(this$static.value_0, that.value_0);
}

function $setValue(this$static, val){
    if (!val) {
        this$static.type_0 = ($clinit_JmsDataType() , NULL);
        this$static.value_0 = null;
    }
    else {
        this$static.value_0 = val;
    }
}

function $toString_2(this$static){
    var s;
    s = '{"' + asString(this$static.name_0) + '", "' + this$static.type_0 + '", "' + hexDump(this$static.value_0) + '"}';
    return s;
}

function JmsPropertiesContent$Property_0(name_0, type, value){
    if (!name_0) {
        throw new NullPointerException_1('Null property name');
    }
    if (!type) {
        throw new NullPointerException_1('Null property type');
    }
    this.name_0 = name_0;
    this.type_0 = type;
    this.value_0 = value;
}

defineSeed(210, 1, makeCastMap([Q$JmsPropertiesContent$Property]), JmsPropertiesContent$Property_0);
_.equals$ = function equals_6(obj){
    return $equals_1(this, obj);
}
;
_.toString$ = function toString_14(){
    return $toString_2(this);
}
;
_.name_0 = null;
_.type_0 = null;
_.value_0 = null;
function $close_3(this$static){
    this$static.byteSocket.peer_0.readyState != 3 && (this$static.byteSocket.peer_0.close() , undefined);
}

function $connect_1(this$static){
    this$static.factory?(this$static.byteSocket = new WebSocket_0(this$static.factory, this$static.location_0, this$static.protocols)):(this$static.byteSocket = new WebSocket_1(this$static.location_0, this$static.protocols));
    $addCloseHandler(this$static.byteSocket, this$static);
    $addMessageHandler(this$static.byteSocket, this$static);
    $addOpenHandler(this$static.byteSocket, this$static);
}

function $onClose_3(this$static, event_0){
    var ex;
    this$static.byteSocket.closeHandler = null;
    this$static.byteSocket.messageHandler = null;
    this$static.byteSocket.openHandler = null;
    if (event_0.event_0.wasClean.value_0) {
        $onClose_0(this$static.listener);
    }
    else {
        ex = new JMSException_1(event_0.event_0.reason, '' + event_0.event_0.code);
        $onClose_1(this$static.listener, ex);
    }
}

function $onMessage_1(this$static, event_0){
    $onMessage_0(this$static.listener, $getDataAsByteBuffer(event_0.event_0));
}

function $onOpen_0(this$static){
    $binaryType(this$static.byteSocket.peer_0, 'bytebuffer');
    $onOpen(this$static.listener);
}

function $send_2(this$static, buf){
    try {
        $send(this$static.byteSocket, buf);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$IllegalStateException)) {
            throw new IOException_0;
        }
        else
            throw $e0;
    }
}

function JmsWebSocketChannel_0(factory, location_0, protocols){
    this.factory = factory;
    this.location_0 = location_0;
    this.protocols = protocols;
}

defineSeed(211, 1, makeCastMap([Q$EventHandler]), JmsWebSocketChannel_0);
_.byteSocket = null;
_.factory = null;
_.listener = null;
_.location_0 = null;
_.protocols = null;
function ReconnectFailedException_0(){
    GenericException_1.call(this, 'Attempt to reconnect WebSocket failed');
}

defineSeed(212, 101, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), ReconnectFailedException_0);
function TransactionNotCommittedException_0(reason){
    GenericException_1.call(this, reason);
}

defineSeed(213, 101, makeCastMap([Q$JMSException, Q$Serializable, Q$Exception, Q$Throwable]), TransactionNotCommittedException_0);
function VoidFuture_0(callback){
    this.callback_0 = callback;
}

defineSeed(214, 105, {}, VoidFuture_0);
function log_0(msg){
    /*$wnd.*/console && /*$wnd.*/console.log && typeof /*$wnd.*/console.log !== 'undefined' && /*$wnd.*/console.log(msg);
}

function $compareAndSet(this$static){
    if (this$static.value_0) {
        return false;
    }
    else {
        this$static.value_0 = true;
        return true;
    }
}

function $getAndSet(this$static){
    var ret;
    ret = this$static.value_0;
    this$static.value_0 = true;
    return ret;
}

function AtomicBoolean_0(value){
    this.value_0 = value;
}

defineSeed(216, 1, {}, AtomicBoolean_0);
_.value_0 = false;
function $compareAndSet_0(this$static, curValue, newValue){
    if (this$static.value_0 == curValue) {
        this$static.value_0 = newValue;
        return true;
    }
    else {
        return false;
    }
}

function $getAndSet_0(this$static, newValue){
    var ret;
    ret = this$static.value_0;
    this$static.value_0 = newValue;
    return ret;
}

function $incrementAndGet(this$static){
    this$static.value_0 = this$static.value_0 + 1;
    return this$static.value_0;
}

function $set(this$static, value){
    this$static.value_0 = value;
}

function AtomicInteger_0(value){
    this.value_0 = value;
}

defineSeed(217, 1, {}, AtomicInteger_0);
_.toString$ = function toString_15(){
    return '' + this.value_0;
}
;
_.value_0 = 0;
function $clinit_ByteBufferUtils(){
    $clinit_ByteBufferUtils = nullMethod;
    UTF8_2 = getUTF8();
}

function asByteBuffer(s){
    $clinit_ByteBufferUtils();
    var buffer;
    if (s == null) {
        return null;
    }
    buffer = new /*$wnd.*/ByteBuffer;
    $putString(buffer, s, UTF8_2);
    buffer.flip();
    return buffer;
}

function asString(buf){
    $clinit_ByteBufferUtils();
    if (!buf) {
        return null;
    }
    return $getString(buf.duplicate(), UTF8_2);
}

function hexDump(buffer){
    $clinit_ByteBufferUtils();
    var b, out, tmp, v;
    if (!buffer) {
        return '';
    }
    if (buffer.remaining() == 0) {
        return '';
    }
    out = new StringBuilder_0;
    tmp = buffer.slice();
    while (tmp.hasRemaining()) {
        out.impl.string.length > 0 && (out.impl.string += ' ' , out);
        b = tmp.get();
        b < 0 && (b += 256);
        v = toPowerOfTwoString(b);
        v.length == 1 && (out.impl.string += '0' , out);
        $append(out.impl, v);
    }
    return out.impl.string;
}

function makeLong(b7, b6, b5, b4, b3, b2, b1, b0){
    $clinit_ByteBufferUtils();
    return or(or(or(or(or(or(or(shl(fromInt(b7), 56), shl(and(fromInt(b6), Pff_longLit), 48)), shl(and(fromInt(b5), Pff_longLit), 40)), shl(and(fromInt(b4), Pff_longLit), 32)), shl(and(fromInt(b3), Pff_longLit), 24)), shl(and(fromInt(b2), Pff_longLit), 16)), shl(and(fromInt(b1), Pff_longLit), 8)), and(fromInt(b0), Pff_longLit));
}

function putLong(buffer, val){
    $clinit_ByteBufferUtils();
    $put(buffer, toInt(shr(val, 56)) << 24 >> 24);
    $put(buffer, toInt(shr(val, 48)) << 24 >> 24);
    $put(buffer, toInt(shr(val, 40)) << 24 >> 24);
    $put(buffer, toInt(shr(val, 32)) << 24 >> 24);
    $put(buffer, toInt(shr(val, 24)) << 24 >> 24);
    $put(buffer, toInt(shr(val, 16)) << 24 >> 24);
    $put(buffer, toInt(shr(val, 8)) << 24 >> 24);
    $put(buffer, toInt(val) << 24 >> 24);
}

function sameOrEquals(this_, that){
    $clinit_ByteBufferUtils();
    var i, j;
    if (this_ == that) {
        return true;
    }
    if (!this_ || !that) {
        return false;
    }
    if (this_.remaining() != that.remaining()) {
        return false;
    }
    for (i = this_.limit - 1 , j = that.limit - 1; i >= this_.position; --i , --j) {
        if (this_.getAt(i) != that.getAt(j)) {
            return false;
        }
    }
    return true;
}

var UTF8_2;
function $add_1(this$static, e){
    return $add_4((this$static.arrayList = new ArrayList_2(this$static.arrayList) , this$static.arrayList), e);
}

function $get_1(this$static, index){
    return $get_2(this$static.arrayList, index);
}

function $indexOf(this$static, o){
    return $indexOf_2(this$static.arrayList, o, 0);
}

function $remove(this$static, o){
    return $remove_4((this$static.arrayList = new ArrayList_2(this$static.arrayList) , this$static.arrayList), o);
}

function CopyOnWriteArrayList_0(){
    this.arrayList = new ArrayList_0;
}

defineSeed(219, 1, makeCastMap([Q$List]), CopyOnWriteArrayList_0);
_.add = function add(e){
    return $add_1(this, e);
}
;
_.iterator = function iterator_0(){
    return new AbstractList$IteratorImpl_0(this.arrayList);
}
;
_.listIterator = function listIterator(){
    return new AbstractList$ListIteratorImpl_0(this.arrayList, 0);
}
;
_.listIterator_0 = function listIterator_0(index){
    return new AbstractList$ListIteratorImpl_0(this.arrayList, index);
}
;
_.size_0 = function size_2(){
    return this.arrayList.size;
}
;
_.toArray = function toArray(){
    return $toArray_0(this.arrayList);
}
;
defineSeed(220, 1, {});
function $addAll(this$static, c){
    var changed, iter;
    iter = c.iterator();
    changed = false;
    while (iter.hasNext()) {
        this$static.add(iter.next_0()) && (changed = true);
    }
    return changed;
}

function $advanceToFind(iter, o){
    var t;
    while (iter.hasNext()) {
        t = iter.next_0();
        if (o == null?t == null:equals__devirtual$(o, t)) {
            return iter;
        }
    }
    return null;
}

function $contains(this$static, o){
    var iter;
    iter = $advanceToFind(this$static.iterator(), o);
    return !!iter;
}

function $remove_0(this$static, o){
    var iter;
    iter = $advanceToFind($listIterator(this$static, 0), o);
    if (iter) {
        iter.remove_1();
        return true;
    }
    else {
        return false;
    }
}

function $toArray(this$static){
    return this$static.toArray_0(initDim(_3Ljava_lang_Object_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Object, this$static.size_0(), 0));
}

function $toString_3(this$static){
    var comma, iter, sb, value;
    sb = new StringBuffer_0;
    comma = null;
    sb.impl.string += '[';
    iter = this$static.iterator();
    while (iter.hasNext()) {
        comma != null?($append(sb.impl, comma) , sb):(comma = ', ');
        value = iter.next_0();
        $append(sb.impl, value === this$static?'(this Collection)':'' + value);
    }
    sb.impl.string += ']';
    return sb.impl.string;
}

defineSeed(225, 1, {});
_.add = function add_0(o){
    throw new UnsupportedOperationException_1('Add not supported on this collection');
}
;
_.addAll = function addAll(c){
    return $addAll(this, c);
}
;
_.contains = function contains(o){
    return $contains(this, o);
}
;
_.toArray = function toArray_0(){
    return $toArray(this);
}
;
_.toArray_0 = function toArray_1(a){
    var i, it, size;
    size = this.size_0();
    a.length < size && (a = createFrom(a, size));
    it = this.iterator();
    for (i = 0; i < size; ++i) {
        setCheck(a, i, it.next_0());
    }
    a.length > size && setCheck(a, size, null);
    return a;
}
;
_.toString$ = function toString_16(){
    return $toString_3(this);
}
;
function checkIndex(index, size){
    (index < 0 || index >= size) && indexOutOfBounds(index, size);
}

function indexOutOfBounds(index, size){
    throw new IndexOutOfBoundsException_1('Index: ' + index + ', Size: ' + size);
}

defineSeed(224, 225, makeCastMap([Q$List]));
_.add_0 = function add_1(index, element){
    throw new UnsupportedOperationException_1('Add not supported on this list');
}
;
_.add = function add_2(obj){
    this.add_0(this.size_0(), obj);
    return true;
}
;
_.equals$ = function equals_7(o){
    var elem, elemOther, iter, iterOther, other;
    if (o === this) {
        return true;
    }
    if (!instanceOf(o, Q$List)) {
        return false;
    }
    other = dynamicCast(o, Q$List);
    if (this.size_0() != other.size_0()) {
        return false;
    }
    iter = this.iterator();
    iterOther = other.iterator();
    while (iter.hasNext()) {
        elem = iter.next_0();
        elemOther = iterOther.next_0();
        if (!(elem == null?elemOther == null:equals__devirtual$(elem, elemOther))) {
            return false;
        }
    }
    return true;
}
;
_.hashCode$ = function hashCode_5(){
    var iter, k, obj;
    k = 1;
    iter = this.iterator();
    while (iter.hasNext()) {
        obj = iter.next_0();
        k = 31 * k + (obj == null?0:hashCode__devirtual$(obj));
        k = ~~k;
    }
    return k;
}
;
_.iterator = function iterator_1(){
    return new AbstractList$IteratorImpl_0(this);
}
;
_.listIterator = function listIterator_1(){
    return this.listIterator_0(0);
}
;
_.listIterator_0 = function listIterator_2(from){
    return new AbstractList$ListIteratorImpl_0(this, from);
}
;
_.remove_0 = function remove_0(index){
    throw new UnsupportedOperationException_1('Remove not supported on this list');
}
;
function $remove_1(this$static, index){
    var iter, old;
    iter = this$static.listIterator_0(index);
    try {
        old = $next_3(iter);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$NoSuchElementException)) {
            throw new IndexOutOfBoundsException_1("Can't remove element " + index);
        }
        else
            throw $e0;
    }
    $remove_8(iter);
    return old;
}

defineSeed(223, 224, makeCastMap([Q$List]));
_.add_0 = function add_3(index, element){
    var iter;
    iter = this.listIterator_0(index);
    $addBefore(iter.this$0, element, iter.currentNode);
    ++iter.currentIndex;
    iter.lastNode = null;
}
;
_.get_1 = function get_1(index){
    var iter;
    iter = this.listIterator_0(index);
    try {
        return $next_3(iter);
    }
    catch ($e0) {
        $e0 = caught($e0);
        if (instanceOf($e0, Q$NoSuchElementException)) {
            throw new IndexOutOfBoundsException_1("Can't get element " + index);
        }
        else
            throw $e0;
    }
}
;
_.iterator = function iterator_2(){
    return this.listIterator_0(0);
}
;
_.remove_0 = function remove_1(index){
    return $remove_1(this, index);
}
;
function $add_2(this$static, o){
    new LinkedList$Node_1(o, this$static.header);
    ++this$static.size;
    return true;
}

function $addBefore(this$static, o, target){
    new LinkedList$Node_1(o, target);
    ++this$static.size;
}

function $clear(this$static){
    this$static.header = new LinkedList$Node_0;
    this$static.size = 0;
}

function $listIterator(this$static, index){
    var i, node;
    (index < 0 || index > this$static.size) && indexOutOfBounds(index, this$static.size);
    if (index >= this$static.size >> 1) {
        node = this$static.header;
        for (i = this$static.size; i > index; --i) {
            node = node.prev;
        }
    }
    else {
        node = this$static.header.next;
        for (i = 0; i < index; ++i) {
            node = node.next;
        }
    }
    return new LinkedList$ListIteratorImpl_0(this$static, index, node);
}

function $poll(this$static){
    var node;
    return this$static.size == 0?null:($throwEmptyException(this$static) , --this$static.size , node = this$static.header.next , $remove_9(node) , node.value_0);
}

function $throwEmptyException(this$static){
    if (this$static.size == 0) {
        throw new NoSuchElementException_0;
    }
}

function LinkedList_0(){
    this.header = new LinkedList$Node_0;
    this.size = 0;
}

defineSeed(222, 223, makeCastMap([Q$Serializable, Q$List]), LinkedList_0);
_.add = function add_4(o){
    return $add_2(this, o);
}
;
_.listIterator_0 = function listIterator_3(index){
    return $listIterator(this, index);
}
;
_.size_0 = function size_3(){
    return this.size;
}
;
_.header = null;
_.size = 0;
function LinkedBlockingQueue_0(){
    LinkedList_0.call(this);
}

defineSeed(221, 222, makeCastMap([Q$Serializable, Q$List]), LinkedBlockingQueue_0);
function $elements(this$static){
    var values;
    values = $toArray($values(this$static.map));
    return new Properties$1_0(values);
}

function Properties_0(){
    this.map = new HashMap_0;
}

defineSeed(226, 220, {}, Properties_0);
function Properties$1_0(val$values){
    this.val$values = val$values;
}

defineSeed(227, 1, {}, Properties$1_0);
_.hasMoreElements_0 = function hasMoreElements_1(){
    return this.i < this.val$values.length;
}
;
_.nextElement_0 = function nextElement_1(){
    return this.val$values[this.i++];
}
;
_.i = 0;
_.val$values = null;
function $clinit_StringUtils(){
    $clinit_StringUtils = nullMethod;
    UTF_8 = getUTF8();
}

function asUTF8EncodingBytes(in_$){
    $clinit_StringUtils();
    var inBuffer, inBytes;
    if (in_$ == null) {
        return null;
    }
    inBuffer = new /*$wnd.*/ByteBuffer;
    $encode(UTF_8, in_$, inBuffer);
    inBuffer.flip();
    inBytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, inBuffer.remaining(), 1);
    $get(inBuffer, inBytes, 0, inBuffer.remaining());
    return inBytes;
}

var UTF_8;
function trace(msg){
    DEBUG && log_0(msg);
}

var DEBUG = false;
function encode(value){
    var bytes, s;
    if ((value & -128) == 0) {
        bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 1, 1);
        bytes[0] = value << 24 >> 24;
    }
    else if ((value & -2048) == 0) {
        bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 2, 1);
        bytes[0] = (192 | value >> 6) << 24 >> 24;
        bytes[1] = (128 | value & 63) << 24 >> 24;
    }
    else if ((value & -65536) == 0) {
        bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 3, 1);
        bytes[0] = (224 | value >> 12) << 24 >> 24;
        bytes[1] = (128 | value >> 6 & 63) << 24 >> 24;
        bytes[2] = (128 | value & 63) << 24 >> 24;
    }
    else if ((value & -14680064) == 0) {
        bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 4, 1);
        bytes[0] = (240 | value >> 18) << 24 >> 24;
        bytes[1] = (128 | value >> 12 & 63) << 24 >> 24;
        bytes[2] = (128 | value >> 6 & 63) << 24 >> 24;
        bytes[3] = (128 | value & 63) << 24 >> 24;
    }
    else if ((value & -201326592) == 0) {
        bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 5, 1);
        bytes[0] = (248 | value >> 24) << 24 >> 24;
        bytes[1] = (128 | value >> 18 & 63) << 24 >> 24;
        bytes[2] = (128 | value >> 12 & 63) << 24 >> 24;
        bytes[3] = (128 | value >> 6 & 63) << 24 >> 24;
        bytes[4] = (128 | value & 63) << 24 >> 24;
    }
    else if ((value & -2147483648) == 0) {
        bytes = initDim(_3B_classLit, makeCastMap([Q$byte_$1, Q$Serializable]), -1, 6, 1);
        bytes[0] = (252 | value >> 30) << 24 >> 24;
        bytes[1] = (128 | value >> 24 & 63) << 24 >> 24;
        bytes[2] = (128 | value >> 18 & 63) << 24 >> 24;
        bytes[3] = (128 | value >> 12 & 63) << 24 >> 24;
        bytes[4] = (128 | value >> 6 & 63) << 24 >> 24;
        bytes[5] = (128 | value & 63) << 24 >> 24;
    }
    else {
        s = 'Value cannot be encoded as UTF-8 sequence: ' + toPowerOfTwoString(value);
        throw new IllegalStateException_3(s);
    }
    return bytes;
}

function getNumberOfBytes(leadingByte){
    var i, s;
    if ((leadingByte & 128) == 0) {
        return 1;
    }
    for (i = 0; i < 7; ++i) {
        if (isBitSet(leadingByte, i)) {
            continue;
        }
        else {
            if (i <= 6) {
                return i;
            }
            s = 'Illegal leading byte: ' + toPowerOfTwoString(leadingByte);
            throw new IllegalStateException_3(s);
        }
    }
    s = 'Illegal leading byte: ' + toPowerOfTwoString(leadingByte);
    throw new IllegalStateException_3(s);
}

function getUtf8Integer(buffer){
    var byte1, byte2, byte3, byte4, byte5, byte6, dataLength, m_0, n, o, p, q, r, retval;
    byte1 = buffer.get();
    dataLength = getNumberOfBytes(byte1);
    retval = 0;
    switch (dataLength) {
        case 1:
        {
            retval = byte1;
            break;
        }

        case 2:
        {
            byte2 = buffer.get();
            n = byte1 & 31;
            m_0 = byte2 & 63;
            retval = n << 6 | m_0;
            break;
        }

        case 3:
        {
            byte2 = buffer.get();
            byte3 = buffer.get();
            o = byte1 & 15;
            n = byte2 & 63;
            m_0 = byte3 & 63;
            retval = o << 12 | n << 6 | m_0;
            break;
        }

        case 4:
        {
            byte2 = buffer.get();
            byte3 = buffer.get();
            byte4 = buffer.get();
            p = byte1 & 7;
            o = byte2 & 63;
            n = byte3 & 63;
            m_0 = byte4 & 63;
            retval = p << 18 | o << 12 | n << 6 | m_0;
            break;
        }

        case 5:
        {
            byte2 = buffer.get();
            byte3 = buffer.get();
            byte4 = buffer.get();
            byte5 = buffer.get();
            q = byte1 & 3;
            p = byte2 & 63;
            o = byte3 & 63;
            n = byte4 & 63;
            m_0 = byte5 & 63;
            retval = q << 24 | p << 18 | o << 12 | n << 6 | m_0;
            break;
        }

        case 6:
        {
            byte2 = buffer.get();
            byte3 = buffer.get();
            byte4 = buffer.get();
            byte5 = buffer.get();
            byte6 = buffer.get();
            r = byte1 & 1;
            q = byte2 & 63;
            p = byte3 & 63;
            o = byte4 & 63;
            n = byte5 & 63;
            m_0 = byte6 & 63;
            retval = r << 30 | q << 24 | p << 18 | o << 12 | n << 6 | m_0;
            break;
        }

    }
    return retval;
}

function isBitSet(value, bitIndex){
    var bitMask;
    if (bitIndex < 0 || bitIndex > 7) {
        throw new IllegalStateException_3('Invalid index: Out of range 0 - 7');
    }
    bitMask = 1 << 7 - bitIndex;
    return (value & bitMask) != 0;
}

function IOException_0(){
    Exception_0.call(this, 'Send failed: ByteSocket connection closed');
}

defineSeed(231, 7, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), IOException_0);
function ArithmeticException_0(){
    RuntimeException_0.call(this, 'divide by zero');
}

defineSeed(232, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), ArithmeticException_0);
function ArrayStoreException_0(){
    $fillInStackTrace(this);
}

defineSeed(233, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), ArrayStoreException_0);
function $clinit_Boolean(){
    $clinit_Boolean = nullMethod;
    FALSE = new Boolean_1(false);
    TRUE = new Boolean_1(true);
}

function $compareTo_0(this$static, other){
    return this$static.value_0 == other.value_0?0:this$static.value_0?1:-1;
}

function Boolean_1(value){
    $clinit_Boolean();
    this.value_0 = value;
}

defineSeed(234, 1, makeCastMap([Q$Serializable, Q$Boolean, Q$Comparable]), Boolean_1);
_.compareTo$ = function compareTo_0(other){
    return $compareTo_0(this, dynamicCast(other, Q$Boolean));
}
;
_.equals$ = function equals_8(o){
    return instanceOf(o, Q$Boolean) && dynamicCast(o, Q$Boolean).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_6(){
    return this.value_0?1231:1237;
}
;
_.toString$ = function toString_17(){
    return this.value_0?'true':'false';
}
;
_.value_0 = false;
var FALSE, TRUE;
function __parseAndValidateDouble(s){
    var floatRegex;
    if (!(floatRegex = floatRegex_0 , !floatRegex && (floatRegex = floatRegex_0 = /^\s*[+-]?(NaN|Infinity|((\d+\.?\d*)|(\.\d+))([eE][+-]?\d+)?[dDfF]?)\s*$/) , floatRegex.test(s))) {
        throw new NumberFormatException_0('For input string: "' + s + '"');
    }
    return parseFloat(s);
}

function __parseAndValidateInt(s, lowerBound, upperBound){
    var i, length_0, startIndex, toReturn;
    if (s == null) {
        throw new NumberFormatException_0('null');
    }
    length_0 = s.length;
    startIndex = length_0 > 0 && s.charCodeAt(0) == 45?1:0;
    for (i = startIndex; i < length_0; ++i) {
        if (digit(s.charCodeAt(i)) == -1) {
            throw new NumberFormatException_0('For input string: "' + s + '"');
        }
    }
    toReturn = parseInt(s, 10);
    if (isNaN(toReturn)) {
        throw new NumberFormatException_0('For input string: "' + s + '"');
    }
    else if (toReturn < lowerBound || toReturn > upperBound) {
        throw new NumberFormatException_0('For input string: "' + s + '"');
    }
    return toReturn;
}

function __parseAndValidateLong(s){
    var c, firstTime, head, i, length_0, maxDigits, minValue, negative, orig, radixPower, toReturn;
    if (s == null) {
        throw new NumberFormatException_0('null');
    }
    orig = s;
    length_0 = s.length;
    negative = length_0 > 0 && s.charCodeAt(0) == 45;
    if (negative) {
        s = $substring(s, 1);
        --length_0;
    }
    if (length_0 == 0) {
        throw new NumberFormatException_0('For input string: "' + orig + '"');
    }
    while (s.length > 0 && s.charCodeAt(0) == 48) {
        s = $substring(s, 1);
        --length_0;
    }
    if (length_0 > ($clinit_Number$__ParseLong() , maxLengthForRadix)[10]) {
        throw new NumberFormatException_0('For input string: "' + orig + '"');
    }
    for (i = 0; i < length_0; ++i) {
        c = s.charCodeAt(i);
        if (c >= 48 && c < 58) {
            continue;
        }
        if (c >= 97 && c < 97) {
            continue;
        }
        if (c >= 65 && c < 65) {
            continue;
        }
        throw new NumberFormatException_0('For input string: "' + orig + '"');
    }
    toReturn = P0_longLit;
    maxDigits = maxDigitsForRadix[10];
    radixPower = fromInt(maxDigitsRadixPower[10]);
    minValue = neg(maxValueForRadix[10]);
    firstTime = true;
    head = length_0 % maxDigits;
    if (head > 0) {
        toReturn = fromInt(-__parseInt(s.substr(0, head - 0), 10));
        s = $substring(s, head);
        length_0 -= head;
        firstTime = false;
    }
    while (length_0 >= maxDigits) {
        head = __parseInt(s.substr(0, maxDigits - 0), 10);
        s = $substring(s, maxDigits);
        length_0 -= maxDigits;
        if (firstTime) {
            firstTime = false;
        }
        else {
            if (!gte_0(toReturn, minValue)) {
                throw new NumberFormatException_0(s);
            }
            toReturn = mul(toReturn, radixPower);
        }
        toReturn = sub(toReturn, fromInt(head));
    }
    if (gt(toReturn, P0_longLit)) {
        throw new NumberFormatException_0('For input string: "' + orig + '"');
    }
    if (!negative) {
        toReturn = neg(toReturn);
        if (lt(toReturn, P0_longLit)) {
            throw new NumberFormatException_0('For input string: "' + orig + '"');
        }
    }
    return toReturn;
}

function __parseInt(s, radix){
    return parseInt(s, radix);
}

defineSeed(236, 1, makeCastMap([Q$Serializable, Q$Number]));
var floatRegex_0 = null;
function $compareTo_1(this$static, b){
    return this$static.value_0 < b.value_0?-1:this$static.value_0 > b.value_0?1:0;
}

function Byte_0(value){
    this.value_0 = value;
}

function valueOf(b){
    var rebase, result;
    rebase = b + 128;
    result = ($clinit_Byte$BoxedValues() , boxedValues_0)[rebase];
    !result && (result = boxedValues_0[rebase] = new Byte_0(b));
    return result;
}

defineSeed(235, 236, makeCastMap([Q$Serializable, Q$Byte, Q$Comparable, Q$Number]), Byte_0);
_.compareTo$ = function compareTo_1(b){
    return $compareTo_1(this, dynamicCast(b, Q$Byte));
}
;
_.equals$ = function equals_9(o){
    return instanceOf(o, Q$Byte) && dynamicCast(o, Q$Byte).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_7(){
    return this.value_0;
}
;
_.toString$ = function toString_18(){
    return '' + this.value_0;
}
;
_.value_0 = 0;
function $clinit_Byte$BoxedValues(){
    $clinit_Byte$BoxedValues = nullMethod;
    boxedValues_0 = initDim(_3Ljava_lang_Byte_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$Byte, 256, 0);
}

var boxedValues_0;
function $compareTo_2(this$static, c){
    return this$static.value_0 - c.value_0;
}

function Character_0(value){
    this.value_0 = value;
}

function digit(c){
    if (c >= 48 && c < 58) {
        return c - 48;
    }
    if (c >= 97 && c < 97) {
        return c - 97 + 10;
    }
    if (c >= 65 && c < 65) {
        return c - 65 + 10;
    }
    return -1;
}

function toChars(codePoint){
    if (codePoint < 0 || codePoint > 1114111) {
        throw new IllegalArgumentException_0;
    }
    return codePoint >= 65536?initValues(_3C_classLit, makeCastMap([Q$Serializable]), -1, [55296 + (codePoint - 65536 >> 10 & 1023) & 65535, 56320 + (codePoint - 65536 & 1023) & 65535]):initValues(_3C_classLit, makeCastMap([Q$Serializable]), -1, [codePoint & 65535]);
}

function valueOf_0(c){
    var result;
    if (c < 128) {
        result = ($clinit_Character$BoxedValues() , boxedValues_1)[c];
        !result && (result = boxedValues_1[c] = new Character_0(c));
        return result;
    }
    return new Character_0(c);
}

defineSeed(238, 1, makeCastMap([Q$Serializable, Q$Character, Q$Comparable]), Character_0);
_.compareTo$ = function compareTo_2(c){
    return $compareTo_2(this, dynamicCast(c, Q$Character));
}
;
_.equals$ = function equals_10(o){
    return instanceOf(o, Q$Character) && dynamicCast(o, Q$Character).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_8(){
    return this.value_0;
}
;
_.toString$ = function toString_19(){
    return valueOf_4(this.value_0);
}
;
_.value_0 = 0;
function $clinit_Character$BoxedValues(){
    $clinit_Character$BoxedValues = nullMethod;
    boxedValues_1 = initDim(_3Ljava_lang_Character_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$Character, 128, 0);
}

var boxedValues_1;
function Class_0(){
}

function createForArray(packageName, className, seedId, componentType){
    var clazz;
    clazz = new Class_0;
    clazz.typeName = packageName + className;
    isInstantiable(seedId != 0?-seedId:0) && setClassLiteral(seedId != 0?-seedId:0, clazz);
    clazz.modifiers = 4;
    clazz.componentType = componentType;
    return clazz;
}

function createForClass(packageName, className, seedId){
    var clazz;
    clazz = new Class_0;
    clazz.typeName = packageName + className;
    isInstantiable(seedId) && setClassLiteral(seedId, clazz);
    return clazz;
}

function createForEnum(packageName, className, seedId, enumConstantsFunc){
    var clazz;
    clazz = new Class_0;
    clazz.typeName = packageName + className;
    isInstantiable(seedId) && setClassLiteral(seedId, clazz);
    clazz.modifiers = enumConstantsFunc?8:0;
    return clazz;
}

function createForPrimitive(className, seedId){
    var clazz;
    clazz = new Class_0;
    clazz.typeName = '' + className;
    isInstantiable(seedId) && setClassLiteral(seedId, clazz);
    clazz.modifiers = 1;
    return clazz;
}

function getSeedFunction(clazz){
    var func = seedTable[clazz.seedId];
    clazz = null;
    return func;
}

function isInstantiable(seedId){
    return typeof seedId == 'number' && seedId > 0;
}

function setClassLiteral(seedId, clazz){
    var proto;
    clazz.seedId = seedId;
    if (seedId == 2) {
        proto = String.prototype;
    }
    else {
        if (seedId > 0) {
            var seed = getSeedFunction(clazz);
            if (seed) {
                proto = seed.prototype;
            }
            else {
                seed = seedTable[seedId] = function(){
                }
                ;
                seed.___clazz$ = clazz;
                return;
            }
        }
        else {
            return;
        }
    }
    proto.___clazz$ = clazz;
}

defineSeed(240, 1, {}, Class_0);
_.toString$ = function toString_20(){
    return ((this.modifiers & 2) != 0?'interface ':(this.modifiers & 1) != 0?'':'class ') + this.typeName;
}
;
_.componentType = null;
_.modifiers = 0;
_.seedId = 0;
_.typeName = null;
function ClassCastException_0(){
    $fillInStackTrace(this);
}

defineSeed(241, 6, makeCastMap([Q$Serializable, Q$ClassCastException, Q$Exception, Q$Throwable]), ClassCastException_0);
function $compareTo_3(this$static, b){
    return compare_0(this$static.value_0, b.value_0);
}

function Double_0(value){
    this.value_0 = value;
}

function compare_0(x, y){
    if (isNaN(x)) {
        return isNaN(y)?0:1;
    }
    else if (isNaN(y)) {
        return -1;
    }
    return x < y?-1:x > y?1:0;
}

defineSeed(242, 236, makeCastMap([Q$Serializable, Q$Comparable, Q$Double, Q$Number]), Double_0);
_.compareTo$ = function compareTo_3(b){
    return $compareTo_3(this, dynamicCast(b, Q$Double));
}
;
_.equals$ = function equals_11(o){
    return instanceOf(o, Q$Double) && dynamicCast(o, Q$Double).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_9(){
    return round_int(this.value_0);
}
;
_.toString$ = function toString_21(){
    return '' + this.value_0;
}
;
_.value_0 = 0;
function Error_1(message){
    Throwable_0.call(this, message);
}

defineSeed(243, 8, makeCastMap([Q$Serializable, Q$Throwable]), Error_1);
function $compareTo_4(this$static, b){
    return this$static.value_0 < b.value_0?-1:this$static.value_0 > b.value_0?1:0;
}

function Float_0(value){
    this.value_0 = value;
}

function parseFloat_0(s){
    var doubleValue;
    doubleValue = __parseAndValidateDouble(s);
    if (doubleValue > 3.4028234663852886E38) {
        return Infinity;
    }
    else if (doubleValue < -3.4028234663852886E38) {
        return -Infinity;
    }
    return doubleValue;
}

defineSeed(244, 236, makeCastMap([Q$Serializable, Q$Comparable, Q$Float, Q$Number]), Float_0);
_.compareTo$ = function compareTo_4(b){
    return $compareTo_4(this, dynamicCast(b, Q$Float));
}
;
_.equals$ = function equals_12(o){
    return instanceOf(o, Q$Float) && dynamicCast(o, Q$Float).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_10(){
    return round_int(this.value_0);
}
;
_.toString$ = function toString_22(){
    return '' + this.value_0;
}
;
_.value_0 = 0;
function IllegalArgumentException_0(){
    $fillInStackTrace(this);
}

function IllegalArgumentException_1(message){
    RuntimeException_0.call(this, message);
}

defineSeed(245, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), IllegalArgumentException_0, IllegalArgumentException_1);
function IllegalStateException_2(){
    $fillInStackTrace(this);
}

function IllegalStateException_3(s){
    RuntimeException_0.call(this, s);
}

defineSeed(246, 6, makeCastMap([Q$Serializable, Q$Exception, Q$IllegalStateException, Q$Throwable]), IllegalStateException_2, IllegalStateException_3);
function IndexOutOfBoundsException_0(){
    $fillInStackTrace(this);
}

function IndexOutOfBoundsException_1(message){
    RuntimeException_0.call(this, message);
}

defineSeed(247, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), IndexOutOfBoundsException_0, IndexOutOfBoundsException_1);
function $compareTo_5(this$static, b){
    return this$static.value_0 < b.value_0?-1:this$static.value_0 > b.value_0?1:0;
}

function Integer_0(value){
    this.value_0 = value;
}

function numberOfLeadingZeros_0(i){
    var m_0, n, y;
    if (i < 0) {
        return 0;
    }
    else if (i == 0) {
        return 32;
    }
    else {
        y = -(i >> 16);
        m_0 = y >> 16 & 16;
        n = 16 - m_0;
        i = i >> m_0;
        y = i - 256;
        m_0 = y >> 16 & 8;
        n += m_0;
        i <<= m_0;
        y = i - 4096;
        m_0 = y >> 16 & 4;
        n += m_0;
        i <<= m_0;
        y = i - 16384;
        m_0 = y >> 16 & 2;
        n += m_0;
        i <<= m_0;
        y = i >> 14;
        m_0 = y & ~(y >> 1);
        return n + 2 - m_0;
    }
}

function numberOfTrailingZeros(i){
    var r, rtn;
    if (i == 0) {
        return 32;
    }
    else {
        rtn = 0;
        for (r = 1; (r & i) == 0; r <<= 1) {
            ++rtn;
        }
        return rtn;
    }
}

function toPowerOfTwoString(value){
    var buf, digits, pos;
    buf = initDim(_3C_classLit, makeCastMap([Q$Serializable]), -1, 8, 1);
    digits = ($clinit_Number$__Digits() , digits_0);
    pos = 7;
    if (value >= 0) {
        while (value > 15) {
            buf[pos--] = digits[value & 15];
            value >>= 4;
        }
    }
    else {
        while (pos > 0) {
            buf[pos--] = digits[value & 15];
            value >>= 4;
        }
    }
    buf[pos] = digits[value & 15];
    return __valueOf(buf, pos, 8);
}

function valueOf_1(i){
    var rebase, result;
    if (i > -129 && i < 128) {
        rebase = i + 128;
        result = ($clinit_Integer$BoxedValues() , boxedValues_2)[rebase];
        !result && (result = boxedValues_2[rebase] = new Integer_0(i));
        return result;
    }
    return new Integer_0(i);
}

defineSeed(248, 236, makeCastMap([Q$Serializable, Q$Comparable, Q$Integer, Q$Number]), Integer_0);
_.compareTo$ = function compareTo_5(b){
    return $compareTo_5(this, dynamicCast(b, Q$Integer));
}
;
_.equals$ = function equals_13(o){
    return instanceOf(o, Q$Integer) && dynamicCast(o, Q$Integer).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_11(){
    return this.value_0;
}
;
_.toString$ = function toString_23(){
    return '' + this.value_0;
}
;
_.value_0 = 0;
function $clinit_Integer$BoxedValues(){
    $clinit_Integer$BoxedValues = nullMethod;
    boxedValues_2 = initDim(_3Ljava_lang_Integer_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$Integer, 256, 0);
}

var boxedValues_2;
function $compareTo_6(this$static, b){
    return lt(this$static.value_0, b.value_0)?-1:gt(this$static.value_0, b.value_0)?1:0;
}

function Long_0(value){
    this.value_0 = value;
}

function valueOf_2(i){
    var rebase, result;
    if (gt(i, N81_longLit) && lt(i, P80_longLit)) {
        rebase = toInt(i) + 128;
        result = ($clinit_Long$BoxedValues() , boxedValues_3)[rebase];
        !result && (result = boxedValues_3[rebase] = new Long_0(i));
        return result;
    }
    return new Long_0(i);
}

defineSeed(250, 236, makeCastMap([Q$Serializable, Q$Comparable, Q$Long, Q$Number]), Long_0);
_.compareTo$ = function compareTo_6(b){
    return $compareTo_6(this, dynamicCast(b, Q$Long));
}
;
_.equals$ = function equals_14(o){
    return instanceOf(o, Q$Long) && eq(dynamicCast(o, Q$Long).value_0, this.value_0);
}
;
_.hashCode$ = function hashCode_12(){
    return toInt(this.value_0);
}
;
_.toString$ = function toString_24(){
    return '' + toString_4(this.value_0);
}
;
_.value_0 = P0_longLit;
function $clinit_Long$BoxedValues(){
    $clinit_Long$BoxedValues = nullMethod;
    boxedValues_3 = initDim(_3Ljava_lang_Long_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$Long, 256, 0);
}

var boxedValues_3;
function pow(x, exp){
    return Math.pow(x, exp);
}

function NullPointerException_0(){
    $fillInStackTrace(this);
}

function NullPointerException_1(message){
    RuntimeException_0.call(this, message);
}

defineSeed(253, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), NullPointerException_0, NullPointerException_1);
function $clinit_Number$__Digits(){
    $clinit_Number$__Digits = nullMethod;
    digits_0 = initValues(_3C_classLit, makeCastMap([Q$Serializable]), -1, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]);
}

var digits_0;
function $clinit_Number$__ParseLong(){
    $clinit_Number$__ParseLong = nullMethod;
    var i;
    maxDigitsForRadix = initValues(_3I_classLit, makeCastMap([Q$Serializable]), -1, [-1, -1, 30, 19, 15, 13, 11, 11, 10, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5]);
    maxDigitsRadixPower = initDim(_3I_classLit, makeCastMap([Q$Serializable]), -1, 37, 1);
    maxLengthForRadix = initValues(_3I_classLit, makeCastMap([Q$Serializable]), -1, [-1, -1, 63, 40, 32, 28, 25, 23, 21, 20, 19, 19, 18, 18, 17, 17, 16, 16, 16, 15, 15, 15, 15, 14, 14, 14, 14, 14, 14, 13, 13, 13, 13, 13, 13, 13, 13]);
    maxValueForRadix = initDim(_3J_classLit, makeCastMap([Q$Serializable]), -1, 37, 3);
    for (i = 2; i <= 36; ++i) {
        maxDigitsRadixPower[i] = round_int(pow(i, maxDigitsForRadix[i]));
        maxValueForRadix[i] = div(P7fffffffffffffff_longLit, fromInt(maxDigitsRadixPower[i]));
    }
}

var maxDigitsForRadix, maxDigitsRadixPower, maxLengthForRadix, maxValueForRadix;
function NumberFormatException_0(message){
    IllegalArgumentException_1.call(this, message);
}

defineSeed(256, 245, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), NumberFormatException_0);
function $compareTo_7(this$static, b){
    return this$static.value_0 < b.value_0?-1:this$static.value_0 > b.value_0?1:0;
}

function Short_0(value){
    this.value_0 = value;
}

function valueOf_3(s){
    var rebase, result;
    if (s > -129 && s < 128) {
        rebase = s + 128;
        result = ($clinit_Short$BoxedValues() , boxedValues_4)[rebase];
        !result && (result = boxedValues_4[rebase] = new Short_0(s));
        return result;
    }
    return new Short_0(s);
}

defineSeed(257, 236, makeCastMap([Q$Serializable, Q$Comparable, Q$Number, Q$Short]), Short_0);
_.compareTo$ = function compareTo_7(b){
    return $compareTo_7(this, dynamicCast(b, Q$Short));
}
;
_.equals$ = function equals_15(o){
    return instanceOf(o, Q$Short) && dynamicCast(o, Q$Short).value_0 == this.value_0;
}
;
_.hashCode$ = function hashCode_13(){
    return this.value_0;
}
;
_.toString$ = function toString_25(){
    return '' + this.value_0;
}
;
_.value_0 = 0;
function $clinit_Short$BoxedValues(){
    $clinit_Short$BoxedValues = nullMethod;
    boxedValues_4 = initDim(_3Ljava_lang_Short_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$Comparable_$1, Q$Object_$1]), Q$Short, 256, 0);
}

var boxedValues_4;
function StackTraceElement_0(methodName){
    this.className = 'Unknown';
    this.methodName = methodName;
    this.lineNumber = -1;
}

defineSeed(259, 1, makeCastMap([Q$Serializable, Q$StackTraceElement]), StackTraceElement_0);
_.toString$ = function toString_26(){
    return this.className + '.' + this.methodName + '(Unknown Source' + (this.lineNumber >= 0?':' + this.lineNumber:'') + ')';
}
;
_.className = null;
_.lineNumber = 0;
_.methodName = null;
function $charAt(this$static, index){
    return this$static.charCodeAt(index);
}

function $equals_2(this$static, other){
    if (!instanceOf(other, Q$String)) {
        return false;
    }
    return String(this$static) == other;
}

function $equalsIgnoreCase(this$static, other){
    if (other == null)
        return false;
    return this$static == other || this$static.toLowerCase() == other.toLowerCase();
}

function $indexOf_0(this$static, str){
    return this$static.indexOf(str);
}

function $indexOf_1(this$static, str, startIndex){
    return this$static.indexOf(str, startIndex);
}

function $replace(this$static, from, to){
    var regex, replacement;
    regex = $replaceAll(from, '([/\\\\\\.\\*\\+\\?\\|\\(\\)\\[\\]\\{\\}$^])', '\\\\$1');
    replacement = $replaceAll($replaceAll(to, '\\\\', '\\\\\\\\'), '\\$', '\\\\$');
    return $replaceAll(this$static, regex, replacement);
}

function $replaceAll(this$static, regex, replace){
    replace = __translateReplaceString(replace);
    return this$static.replace(RegExp(regex, 'g'), replace);
}

function $split(this$static, regex, maxMatch){
    var compiled = new RegExp(regex, 'g');
    var out = [];
    var count = 0;
    var trail = this$static;
    var lastTrail = null;
    while (true) {
        var matchObj = compiled.exec(trail);
        if (matchObj == null || trail == '' || count == maxMatch - 1 && maxMatch > 0) {
            out[count] = trail;
            break;
        }
        else {
            out[count] = trail.substring(0, matchObj.index);
            trail = trail.substring(matchObj.index + matchObj[0].length, trail.length);
            compiled.lastIndex = 0;
            if (lastTrail == trail) {
                out[count] = trail.substring(0, 1);
                trail = trail.substring(1);
            }
            lastTrail = trail;
            count++;
        }
    }
    if (maxMatch == 0 && this$static.length > 0) {
        var lastNonEmpty = out.length;
        while (lastNonEmpty > 0 && out[lastNonEmpty - 1] == '') {
            --lastNonEmpty;
        }
        lastNonEmpty < out.length && out.splice(lastNonEmpty, out.length - lastNonEmpty);
    }
    var jr = __createArray(out.length);
    for (var i = 0; i < out.length; ++i) {
        jr[i] = out[i];
    }
    return jr;
}

function $substring(this$static, beginIndex){
    return this$static.substr(beginIndex, this$static.length - beginIndex);
}

function $substring_0(this$static, beginIndex, endIndex){
    return this$static.substr(beginIndex, endIndex - beginIndex);
}

function $trim(this$static){
    if (this$static.length == 0 || this$static[0] > ' ' && this$static[this$static.length - 1] > ' ') {
        return this$static;
    }
    var r1 = this$static.replace(/^(\s*)/, '');
    var r2 = r1.replace(/\s*$/, '');
    return r2;
}

function __createArray(numElements){
    return initDim(_3Ljava_lang_String_2_classLit, makeCastMap([Q$Serializable, Q$Serializable_$1, Q$CharSequence_$1, Q$Comparable_$1, Q$Object_$1, Q$String_$1]), Q$String, numElements, 0);
}

function __translateReplaceString(replaceStr){
    var pos;
    pos = 0;
    while (0 <= (pos = replaceStr.indexOf('\\', pos))) {
        replaceStr.charCodeAt(pos + 1) == 36?(replaceStr = replaceStr.substr(0, pos - 0) + '$' + $substring(replaceStr, ++pos)):(replaceStr = replaceStr.substr(0, pos - 0) + $substring(replaceStr, ++pos));
    }
    return replaceStr;
}

function __valueOf(x, start, end){
    x = x.slice(start, end);
    return String.fromCharCode.apply(null, x);
}

function compareTo_9(thisStr, otherStr){
    thisStr = String(thisStr);
    if (thisStr == otherStr) {
        return 0;
    }
    return thisStr < otherStr?-1:1;
}

function fromCodePoint(codePoint){
    var hiSurrogate, loSurrogate;
    if (codePoint >= 65536) {
        hiSurrogate = 55296 + (codePoint - 65536 >> 10 & 1023) & 65535;
        loSurrogate = 56320 + (codePoint - 65536 & 1023) & 65535;
        return String.fromCharCode(hiSurrogate) + String.fromCharCode(loSurrogate);
    }
    else {
        return String.fromCharCode(codePoint & 65535);
    }
}

function valueOf_4(x){
    return String.fromCharCode(x);
}

_ = String.prototype;
_.castableTypeMap$ = makeCastMap([Q$String, Q$Serializable, Q$CharSequence, Q$Comparable]);
_.compareTo$ = function compareTo_8(other){
    return compareTo_9(this, dynamicCast(other, Q$String));
}
;
_.equals$ = function equals_16(other){
    return $equals_2(this, other);
}
;
_.hashCode$ = function hashCode_14(){
    return getHashCode_1(this);
}
;
_.toString$ = _.toString;
function $clinit_String$HashCache(){
    $clinit_String$HashCache = nullMethod;
    back_0 = {};
    front = {};
}

function compute(str){
    var hashCode, i, n, nBatch;
    hashCode = 0;
    n = str.length;
    nBatch = n - 4;
    i = 0;
    while (i < nBatch) {
        hashCode = str.charCodeAt(i + 3) + 31 * (str.charCodeAt(i + 2) + 31 * (str.charCodeAt(i + 1) + 31 * (str.charCodeAt(i) + 31 * hashCode))) | 0;
        i += 4;
    }
    while (i < n) {
        hashCode = hashCode * 31 + $charAt(str, i++);
    }
    return hashCode | 0;
}

function getHashCode_1(str){
    $clinit_String$HashCache();
    var key = ':' + str;
    var result = front[key];
    if (result != null) {
        return result;
    }
    result = back_0[key];
    result == null && (result = compute(str));
    increment();
    return front[key] = result;
}

function increment(){
    if (count_0 == 256) {
        back_0 = front;
        front = {};
        count_0 = 0;
    }
    ++count_0;
}

var back_0, count_0 = 0, front;
function $$init(this$static){
    this$static.impl = new StringBufferImplAppend_0;
}

function $append_0(this$static, x){
    $append(this$static.impl, x);
    return this$static;
}

function StringBuffer_0(){
    $$init(this);
}

function StringBuffer_1(){
    $$init(this);
    this.impl.string += '[';
}

defineSeed(261, 1, makeCastMap([Q$CharSequence]), StringBuffer_0, StringBuffer_1);
_.toString$ = function toString_27(){
    return this.impl.string;
}
;
function $$init_0(this$static){
    this$static.impl = new StringBufferImplAppend_0;
}

function $append_1(this$static, x){
    $append(this$static.impl, x);
    return this$static;
}

function $substring_1(this$static, end){
    return $substring_0(this$static.impl.string, 0, end);
}

function StringBuilder_0(){
    $$init_0(this);
}

function StringBuilder_1(s){
    $$init_0(this);
    $append(this.impl, s);
}

defineSeed(262, 1, makeCastMap([Q$CharSequence]), StringBuilder_0, StringBuilder_1);
_.toString$ = function toString_28(){
    return this.impl.string;
}
;
function UnsupportedOperationException_0(){
    $fillInStackTrace(this);
}

function UnsupportedOperationException_1(message){
    RuntimeException_0.call(this, message);
}

defineSeed(264, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable]), UnsupportedOperationException_0, UnsupportedOperationException_1);
defineSeed(266, 225, makeCastMap([Q$Set]));
_.equals$ = function equals_17(o){
    var iter, other, otherItem;
    if (o === this) {
        return true;
    }
    if (!instanceOf(o, Q$Set)) {
        return false;
    }
    other = dynamicCast(o, Q$Set);
    if (other.size_0() != this.size_0()) {
        return false;
    }
    for (iter = other.iterator(); iter.hasNext();) {
        otherItem = iter.next_0();
        if (!this.contains(otherItem)) {
            return false;
        }
    }
    return true;
}
;
_.hashCode$ = function hashCode_15(){
    var hashCode, iter, next;
    hashCode = 0;
    for (iter = this.iterator(); iter.hasNext();) {
        next = iter.next_0();
        if (next != null) {
            hashCode += hashCode__devirtual$(next);
            hashCode = ~~hashCode;
        }
    }
    return hashCode;
}
;
function $contains_0(this$static, o){
    var entry, key, value;
    if (instanceOf(o, Q$Map$Entry)) {
        entry = dynamicCast(o, Q$Map$Entry);
        key = entry.getKey();
        if (this$static.this$0.containsKey(key)) {
            value = this$static.this$0.get_0(key);
            return this$static.this$0.equals(entry.getValue_0(), value);
        }
    }
    return false;
}

function AbstractHashMap$EntrySet_0(this$0){
    this.this$0 = this$0;
}

defineSeed(265, 266, makeCastMap([Q$Set]), AbstractHashMap$EntrySet_0);
_.contains = function contains_0(o){
    return $contains_0(this, o);
}
;
_.iterator = function iterator_3(){
    return new AbstractHashMap$EntrySetIterator_0(this.this$0);
}
;
_.size_0 = function size_4(){
    return this.this$0.size_0();
}
;
_.this$0 = null;
function AbstractHashMap$EntrySetIterator_0(this$0){
    var list;
    this.this$0 = this$0;
    list = new ArrayList_0;
    this$0.nullSlotLive && $add_4(list, new AbstractHashMap$MapEntryNull_0(this$0));
    $addAllStringEntries(this$0, list);
    $addAllHashEntries(this$0, list);
    this.iter = new AbstractList$IteratorImpl_0(list);
}

defineSeed(267, 1, {}, AbstractHashMap$EntrySetIterator_0);
_.hasNext = function hasNext(){
    return $hasNext(this.iter);
}
;
_.next_0 = function next_0(){
    return this.last = dynamicCast($next(this.iter), Q$Map$Entry);
}
;
_.remove_1 = function remove_2(){
    if (!this.last) {
        throw new IllegalStateException_3('Must call next() before remove().');
    }
    else {
        $remove_2(this.iter);
        this.this$0.remove(this.last.getKey());
        this.last = null;
    }
}
;
_.iter = null;
_.last = null;
_.this$0 = null;
defineSeed(269, 1, makeCastMap([Q$Map$Entry]));
_.equals$ = function equals_18(other){
    var entry;
    if (instanceOf(other, Q$Map$Entry)) {
        entry = dynamicCast(other, Q$Map$Entry);
        if (equalsWithNullCheck(this.getKey(), entry.getKey()) && equalsWithNullCheck(this.getValue_0(), entry.getValue_0())) {
            return true;
        }
    }
    return false;
}
;
_.hashCode$ = function hashCode_16(){
    var keyHash, valueHash;
    keyHash = 0;
    valueHash = 0;
    this.getKey() != null && (keyHash = hashCode__devirtual$(this.getKey()));
    this.getValue_0() != null && (valueHash = hashCode__devirtual$(this.getValue_0()));
    return keyHash ^ valueHash;
}
;
_.toString$ = function toString_29(){
    return this.getKey() + '=' + this.getValue_0();
}
;
function AbstractHashMap$MapEntryNull_0(this$0){
    this.this$0 = this$0;
}

defineSeed(268, 269, makeCastMap([Q$Map$Entry]), AbstractHashMap$MapEntryNull_0);
_.getKey = function getKey(){
    return null;
}
;
_.getValue_0 = function getValue(){
    return this.this$0.nullSlot;
}
;
_.setValue = function setValue(object){
    return $putNullSlot(this.this$0, object);
}
;
_.this$0 = null;
function AbstractHashMap$MapEntryString_0(this$0, key){
    this.this$0 = this$0;
    this.key = key;
}

defineSeed(270, 269, makeCastMap([Q$Map$Entry]), AbstractHashMap$MapEntryString_0);
_.getKey = function getKey_0(){
    return this.key;
}
;
_.getValue_0 = function getValue_0(){
    return $getStringValue(this.this$0, this.key);
}
;
_.setValue = function setValue_0(object){
    return $putStringValue(this.this$0, this.key, object);
}
;
_.key = null;
_.this$0 = null;
function $hasNext(this$static){
    return this$static.i < this$static.this$0_0.size_0();
}

function $next(this$static){
    if (this$static.i >= this$static.this$0_0.size_0()) {
        throw new NoSuchElementException_0;
    }
    return this$static.this$0_0.get_1(this$static.last = this$static.i++);
}

function $remove_2(this$static){
    if (this$static.last < 0) {
        throw new IllegalStateException_2;
    }
    this$static.this$0_0.remove_0(this$static.last);
    this$static.i = this$static.last;
    this$static.last = -1;
}

function AbstractList$IteratorImpl_0(this$0){
    this.this$0_0 = this$0;
}

defineSeed(271, 1, {}, AbstractList$IteratorImpl_0);
_.hasNext = function hasNext_0(){
    return $hasNext(this);
}
;
_.next_0 = function next_1(){
    return $next(this);
}
;
_.remove_1 = function remove_3(){
    $remove_2(this);
}
;
_.i = 0;
_.last = -1;
_.this$0_0 = null;
function AbstractList$ListIteratorImpl_0(this$0, start){
    var size;
    this.this$0 = this$0;
    this.this$0_0 = this$0;
    size = this$0.size_0();
    (start < 0 || start > size) && indexOutOfBounds(start, size);
    this.i = start;
}

defineSeed(272, 271, {}, AbstractList$ListIteratorImpl_0);
_.hasPrevious = function hasPrevious(){
    return this.i > 0;
}
;
_.previous = function previous_0(){
    if (this.i <= 0) {
        throw new NoSuchElementException_0;
    }
    return this.this$0.get_1(this.last = --this.i);
}
;
_.this$0 = null;
function $contains_1(this$static, key){
    return this$static.this$0.containsKey(key);
}

function $iterator(this$static){
    var outerIter;
    outerIter = this$static.val$entrySet.iterator();
    return new AbstractMap$1$1_0(outerIter);
}

function AbstractMap$1_0(this$0, val$entrySet){
    this.this$0 = this$0;
    this.val$entrySet = val$entrySet;
}

defineSeed(273, 266, makeCastMap([Q$Set]), AbstractMap$1_0);
_.contains = function contains_1(key){
    return this.this$0.containsKey(key);
}
;
_.iterator = function iterator_4(){
    return $iterator(this);
}
;
_.size_0 = function size_5(){
    return this.val$entrySet.size_0();
}
;
_.this$0 = null;
_.val$entrySet = null;
function $next_0(this$static){
    var entry;
    entry = dynamicCast(this$static.val$outerIter.next_0(), Q$Map$Entry);
    return entry.getKey();
}

function AbstractMap$1$1_0(val$outerIter){
    this.val$outerIter = val$outerIter;
}

defineSeed(274, 1, {}, AbstractMap$1$1_0);
_.hasNext = function hasNext_1(){
    return this.val$outerIter.hasNext();
}
;
_.next_0 = function next_2(){
    return $next_0(this);
}
;
_.remove_1 = function remove_4(){
    this.val$outerIter.remove_1();
}
;
_.val$outerIter = null;
function $iterator_0(this$static){
    var outerIter;
    outerIter = this$static.val$entrySet.iterator();
    return new AbstractMap$2$1_0(outerIter);
}

function AbstractMap$2_0(this$0, val$entrySet){
    this.this$0 = this$0;
    this.val$entrySet = val$entrySet;
}

defineSeed(275, 225, {}, AbstractMap$2_0);
_.contains = function contains_2(value){
    return this.this$0.containsValue(value);
}
;
_.iterator = function iterator_5(){
    return $iterator_0(this);
}
;
_.size_0 = function size_6(){
    return this.val$entrySet.size_0();
}
;
_.this$0 = null;
_.val$entrySet = null;
function $next_1(this$static){
    var value;
    value = dynamicCast(this$static.val$outerIter.next_0(), Q$Map$Entry).getValue_0();
    return value;
}

function AbstractMap$2$1_0(val$outerIter){
    this.val$outerIter = val$outerIter;
}

defineSeed(276, 1, {}, AbstractMap$2$1_0);
_.hasNext = function hasNext_2(){
    return this.val$outerIter.hasNext();
}
;
_.next_0 = function next_3(){
    return $next_1(this);
}
;
_.remove_1 = function remove_5(){
    this.val$outerIter.remove_1();
}
;
_.val$outerIter = null;
function $$init_1(this$static){
    this$static.array_0 = initDim(_3Ljava_lang_Object_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Object, 0, 0);
}

function $add_3(this$static, index, o){
    (index < 0 || index > this$static.size) && indexOutOfBounds(index, this$static.size);
    splice_1(this$static.array_0, index, 0, o);
    ++this$static.size;
}

function $add_4(this$static, o){
    setCheck(this$static.array_0, this$static.size++, o);
    return true;
}

function $addAll_0(this$static, c){
    var cArray, len;
    cArray = c.toArray();
    len = cArray.length;
    if (len == 0) {
        return false;
    }
    spliceArray(this$static.array_0, this$static.size, 0, cArray);
    this$static.size += len;
    return true;
}

function $clear_0(this$static){
    this$static.array_0 = initDim(_3Ljava_lang_Object_2_classLit, makeCastMap([Q$Serializable, Q$Object_$1]), Q$Object, 0, 0);
    this$static.size = 0;
}

function $get_2(this$static, index){
    checkIndex(index, this$static.size);
    return this$static.array_0[index];
}

function $indexOf_2(this$static, o, index){
    for (; index < this$static.size; ++index) {
        if (equalsWithNullCheck(o, this$static.array_0[index])) {
            return index;
        }
    }
    return -1;
}

function $remove_3(this$static, index){
    var previous;
    previous = (checkIndex(index, this$static.size) , this$static.array_0[index]);
    splice_0(this$static.array_0, index, 1);
    --this$static.size;
    return previous;
}

function $remove_4(this$static, o){
    var i;
    i = $indexOf_2(this$static, o, 0);
    if (i == -1) {
        return false;
    }
    $remove_3(this$static, i);
    return true;
}

function $toArray_0(this$static){
    return cloneSubrange(this$static.array_0, 0, this$static.size);
}

function $toArray_1(this$static, out){
    var i;
    out.length < this$static.size && (out = createFrom(out, this$static.size));
    for (i = 0; i < this$static.size; ++i) {
        setCheck(out, i, this$static.array_0[i]);
    }
    out.length > this$static.size && setCheck(out, this$static.size, null);
    return out;
}

function ArrayList_0(){
    $$init_1(this);
}

function ArrayList_1(){
    $$init_1(this);
    this.array_0.length = 0;
}

function ArrayList_2(c){
    $$init_1(this);
    spliceArray(this.array_0, 0, 0, c.toArray());
    this.size = this.array_0.length;
}

function splice_0(array, index, deleteCount){
    array.splice(index, deleteCount);
}

function splice_1(array, index, deleteCount, value){
    array.splice(index, deleteCount, value);
}

function spliceArray(array, index, deleteCount, values){
    Array.prototype.splice.apply(array, [index, deleteCount].concat(values));
}

defineSeed(277, 224, makeCastMap([Q$Serializable, Q$List]), ArrayList_0, ArrayList_1, ArrayList_2);
_.add_0 = function add_5(index, o){
    $add_3(this, index, o);
}
;
_.add = function add_6(o){
    return $add_4(this, o);
}
;
_.addAll = function addAll_0(c){
    return $addAll_0(this, c);
}
;
_.contains = function contains_3(o){
    return $indexOf_2(this, o, 0) != -1;
}
;
_.get_1 = function get_2(index){
    return $get_2(this, index);
}
;
_.remove_0 = function remove_6(index){
    return $remove_3(this, index);
}
;
_.size_0 = function size_7(){
    return this.size;
}
;
_.toArray = function toArray_2(){
    return $toArray_0(this);
}
;
_.toArray_0 = function toArray_3(out){
    return $toArray_1(this, out);
}
;
_.size = 0;
function equals_19(array1, array2){
    var i, val1, val2;
    if (maskUndefined(array1) === maskUndefined(array2)) {
        return true;
    }
    if (array1 == null || array2 == null) {
        return false;
    }
    if (array1.length != array2.length) {
        return false;
    }
    for (i = 0; i < array1.length; ++i) {
        val1 = array1[i];
        val2 = array2[i];
        if (!(val1 == val2 || !!val1 && $equals_1(val1, val2))) {
            return false;
        }
    }
    return true;
}

function insertionSort(array, low, high, comp){
    var i, j, t;
    for (i = low + 1; i < high; ++i) {
        for (j = i; j > low && comp.compare(array[j - 1], array[j]) > 0; --j) {
            t = array[j];
            setCheck(array, j, array[j - 1]);
            setCheck(array, j - 1, t);
        }
    }
}

function merge(src, srcLow, srcMid, srcHigh, dest, destLow, destHigh, comp){
    var topIdx;
    topIdx = srcMid;
    while (destLow < destHigh) {
        topIdx >= srcHigh || srcLow < srcMid && comp.compare(src[srcLow], src[topIdx]) <= 0?setCheck(dest, destLow++, src[srcLow++]):setCheck(dest, destLow++, src[topIdx++]);
    }
}

function mergeSort(x, fromIndex, toIndex, comp){
    var temp;
    temp = cloneSubrange(x, fromIndex, toIndex);
    mergeSort_0(temp, x, fromIndex, toIndex, -fromIndex, comp);
}

function mergeSort_0(temp, array, low, high, ofs, comp){
    var length_0, tempHigh, tempLow, tempMid;
    length_0 = high - low;
    if (length_0 < 7) {
        insertionSort(array, low, high, comp);
        return;
    }
    tempLow = low + ofs;
    tempHigh = high + ofs;
    tempMid = tempLow + (tempHigh - tempLow >> 1);
    mergeSort_0(array, temp, tempLow, tempMid, -ofs, comp);
    mergeSort_0(array, temp, tempMid, tempHigh, -ofs, comp);
    if (comp.compare(temp[tempMid - 1], temp[tempMid]) <= 0) {
        while (low < high) {
            setCheck(array, low++, temp[tempLow++]);
        }
        return;
    }
    merge(temp, tempLow, tempMid, tempHigh, array, low, high, comp);
}

function sort(x, c){
    mergeSort(x, 0, x.length, c?c:($clinit_Comparators() , $clinit_Comparators() , NATURAL));
}

function toString_30(a){
    var b, i;
    if (a == null) {
        return 'null';
    }
    b = new StringBuffer_1;
    for (i = 0; i < a.length; ++i) {
        i != 0 && (b.impl.string += ', ' , b);
        $append(b.impl, '' + a[i]);
    }
    b.impl.string += ']';
    return b.impl.string;
}

function $clinit_Collections(){
    $clinit_Collections = nullMethod;
    EMPTY_LIST = new Collections$EmptyList_0;
    EMPTY_SET = new Collections$EmptySet_0;
}

function enumeration(c){
    $clinit_Collections();
    var it;
    it = new AbstractList$IteratorImpl_0(c);
    return new Collections$2_0(it);
}

var EMPTY_LIST, EMPTY_SET;
function Collections$2_0(val$it){
    this.val$it = val$it;
}

defineSeed(280, 1, {}, Collections$2_0);
_.hasMoreElements_0 = function hasMoreElements_2(){
    return $hasNext(this.val$it);
}
;
_.nextElement_0 = function nextElement_2(){
    return $next(this.val$it);
}
;
_.val$it = null;
function Collections$EmptyList_0(){
}

defineSeed(281, 224, makeCastMap([Q$Serializable, Q$List]), Collections$EmptyList_0);
_.contains = function contains_4(object){
    return false;
}
;
_.get_1 = function get_3(location_0){
    throw new IndexOutOfBoundsException_0;
}
;
_.size_0 = function size_8(){
    return 0;
}
;
function Collections$EmptySet_0(){
}

defineSeed(282, 266, makeCastMap([Q$Serializable, Q$Set]), Collections$EmptySet_0);
_.contains = function contains_5(object){
    return false;
}
;
_.iterator = function iterator_6(){
    return new Collections$EmptySet$1_0;
}
;
_.size_0 = function size_9(){
    return 0;
}
;
function Collections$EmptySet$1_0(){
}

defineSeed(283, 1, {}, Collections$EmptySet$1_0);
_.hasNext = function hasNext_3(){
    return false;
}
;
_.next_0 = function next_4(){
    throw new NoSuchElementException_0;
}
;
_.remove_1 = function remove_7(){
    throw new UnsupportedOperationException_0;
}
;
function $clinit_Comparators(){
    $clinit_Comparators = nullMethod;
    NATURAL = new Comparators$1_0;
}

var NATURAL;
function Comparators$1_0(){
}

defineSeed(285, 1, {}, Comparators$1_0);
_.compare = function compare_1(o1, o2){
    return dynamicCast(o1, Q$Comparable).compareTo$(o2);
}
;
function $add_5(this$static, o){
    var old;
    old = this$static.map.put_0(o, this$static);
    return old == null;
}

function $contains_2(this$static, o){
    return this$static.map.containsKey(o);
}

function $remove_5(this$static, o){
    return this$static.map.remove(o) != null;
}

function HashSet_0(){
    this.map = new HashMap_0;
}

function HashSet_1(){
    this.map = new HashMap_1;
}

defineSeed(286, 266, makeCastMap([Q$Serializable, Q$Set]), HashSet_0, HashSet_1);
_.add = function add_7(o){
    return $add_5(this, o);
}
;
_.contains = function contains_6(o){
    return this.map.containsKey(o);
}
;
_.iterator = function iterator_7(){
    return $iterator($keySet(this.map));
}
;
_.size_0 = function size_10(){
    return this.map.size_0();
}
;
_.toString$ = function toString_31(){
    return $toString_3($keySet(this.map));
}
;
_.map = null;
function $containsKey(this$static, key){
    return this$static.map.containsKey(key);
}

function $get_3(this$static, key){
    var entry;
    entry = dynamicCast(this$static.map.get_0(key), Q$LinkedHashMap$ChainEntry);
    if (entry) {
        $recordAccess(this$static, entry);
        return entry.value_0;
    }
    return null;
}

function $put_1(this$static, key, value){
    var newEntry, old, oldValue;
    old = dynamicCast(this$static.map.get_0(key), Q$LinkedHashMap$ChainEntry);
    if (!old) {
        newEntry = new LinkedHashMap$ChainEntry_1(this$static, key, value);
        this$static.map.put_0(key, newEntry);
        $addToEnd(newEntry);
        return null;
    }
    else {
        oldValue = old.value_0;
        $setValue_0(old, value);
        $recordAccess(this$static, old);
        return oldValue;
    }
}

function $recordAccess(this$static, entry){
    if (this$static.accessOrder) {
        $remove_7(entry);
        $addToEnd(entry);
    }
}

function $remove_6(this$static, key){
    var entry;
    entry = dynamicCast(this$static.map.remove(key), Q$LinkedHashMap$ChainEntry);
    if (entry) {
        $remove_7(entry);
        return entry.value_0;
    }
    return null;
}

function LinkedHashMap_0(){
    $clearImpl(this);
    this.head = new LinkedHashMap$ChainEntry_0(this);
    this.map = new HashMap_0;
    this.head.prev = this.head;
    this.head.next = this.head;
}

defineSeed(287, 94, makeCastMap([Q$Serializable, Q$Map]), LinkedHashMap_0);
_.clear = function clear_0(){
    this.map.clear();
    this.head.prev = this.head;
    this.head.next = this.head;
}
;
_.containsKey = function containsKey_1(key){
    return this.map.containsKey(key);
}
;
_.containsValue = function containsValue_0(value){
    var node;
    node = this.head.next;
    while (node != this.head) {
        if (equalsWithNullCheck(node.value_0, value)) {
            return true;
        }
        node = node.next;
    }
    return false;
}
;
_.entrySet = function entrySet_1(){
    return new LinkedHashMap$EntrySet_0(this);
}
;
_.get_0 = function get_4(key){
    return $get_3(this, key);
}
;
_.put_0 = function put_1(key, value){
    return $put_1(this, key, value);
}
;
_.remove = function remove_8(key){
    return $remove_6(this, key);
}
;
_.size_0 = function size_11(){
    return this.map.size_0();
}
;
_.accessOrder = false;
function $setValue_0(this$static, value){
    var old;
    old = this$static.value_0;
    this$static.value_0 = value;
    return old;
}

function MapEntryImpl_0(key, value){
    this.key = key;
    this.value_0 = value;
}

defineSeed(289, 269, makeCastMap([Q$Map$Entry]), MapEntryImpl_0);
_.getKey = function getKey_1(){
    return this.key;
}
;
_.getValue_0 = function getValue_1(){
    return this.value_0;
}
;
_.setValue = function setValue_1(value){
    return $setValue_0(this, value);
}
;
_.key = null;
_.value_0 = null;
function $addToEnd(this$static){
    var tail;
    tail = this$static.this$0.head.prev;
    this$static.prev = tail;
    this$static.next = this$static.this$0.head;
    tail.next = this$static.this$0.head.prev = this$static;
}

function $remove_7(this$static){
    this$static.next.prev = this$static.prev;
    this$static.prev.next = this$static.next;
    this$static.next = this$static.prev = null;
}

function LinkedHashMap$ChainEntry_0(this$0){
    LinkedHashMap$ChainEntry_1.call(this, this$0, null, null);
}

function LinkedHashMap$ChainEntry_1(this$0, key, value){
    this.this$0 = this$0;
    MapEntryImpl_0.call(this, key, value);
    this.next = this.prev = null;
}

defineSeed(288, 289, makeCastMap([Q$LinkedHashMap$ChainEntry, Q$Map$Entry]), LinkedHashMap$ChainEntry_0, LinkedHashMap$ChainEntry_1);
_.next = null;
_.prev = null;
_.this$0 = null;
function LinkedHashMap$EntrySet_0(this$0){
    this.this$0 = this$0;
}

defineSeed(290, 266, makeCastMap([Q$Set]), LinkedHashMap$EntrySet_0);
_.contains = function contains_7(o){
    var entry, key, value;
    if (!instanceOf(o, Q$Map$Entry)) {
        return false;
    }
    entry = dynamicCast(o, Q$Map$Entry);
    key = entry.getKey();
    if ($containsKey(this.this$0, key)) {
        value = $get_3(this.this$0, key);
        return equalsWithNullCheck(entry.getValue_0(), value);
    }
    return false;
}
;
_.iterator = function iterator_8(){
    return new LinkedHashMap$EntrySet$EntryIterator_0(this);
}
;
_.size_0 = function size_12(){
    return this.this$0.map.size_0();
}
;
_.this$0 = null;
function $next_2(this$static){
    if (this$static.next == this$static.this$1.this$0.head) {
        throw new NoSuchElementException_0;
    }
    this$static.last = this$static.next;
    this$static.next = this$static.next.next;
    return this$static.last;
}

function LinkedHashMap$EntrySet$EntryIterator_0(this$1){
    this.this$1 = this$1;
    this.next = this$1.this$0.head.next;
}

defineSeed(291, 1, {}, LinkedHashMap$EntrySet$EntryIterator_0);
_.hasNext = function hasNext_4(){
    return this.next != this.this$1.this$0.head;
}
;
_.next_0 = function next_5(){
    return $next_2(this);
}
;
_.remove_1 = function remove_9(){
    if (!this.last) {
        throw new IllegalStateException_3('No current entry');
    }
    $remove_7(this.last);
    this.this$1.this$0.map.remove(this.last.key);
    this.last = null;
}
;
_.last = null;
_.next = null;
_.this$1 = null;
function $next_3(this$static){
    if (this$static.currentNode == this$static.this$0.header) {
        throw new NoSuchElementException_0;
    }
    this$static.lastNode = this$static.currentNode;
    this$static.currentNode = this$static.currentNode.next;
    ++this$static.currentIndex;
    return this$static.lastNode.value_0;
}

function $remove_8(this$static){
    $verifyCurrentElement(this$static);
    this$static.currentNode == this$static.lastNode?(this$static.currentNode = this$static.lastNode.next):--this$static.currentIndex;
    $remove_9(this$static.lastNode);
    this$static.lastNode = null;
    --this$static.this$0.size;
}

function $verifyCurrentElement(this$static){
    if (!this$static.lastNode) {
        throw new IllegalStateException_2;
    }
}

function LinkedList$ListIteratorImpl_0(this$0, index, startNode){
    this.this$0 = this$0;
    this.currentNode = startNode;
    this.currentIndex = index;
}

defineSeed(292, 1, {}, LinkedList$ListIteratorImpl_0);
_.hasNext = function hasNext_5(){
    return this.currentNode != this.this$0.header;
}
;
_.hasPrevious = function hasPrevious_0(){
    return this.currentNode.prev != this.this$0.header;
}
;
_.next_0 = function next_6(){
    return $next_3(this);
}
;
_.previous = function previous_1(){
    if (this.currentNode.prev == this.this$0.header) {
        throw new NoSuchElementException_0;
    }
    this.lastNode = this.currentNode = this.currentNode.prev;
    --this.currentIndex;
    return this.lastNode.value_0;
}
;
_.remove_1 = function remove_10(){
    $remove_8(this);
}
;
_.currentIndex = 0;
_.currentNode = null;
_.lastNode = null;
_.this$0 = null;
function $remove_9(this$static){
    this$static.next.prev = this$static.prev;
    this$static.prev.next = this$static.next;
    this$static.next = this$static.prev = this$static;
}

function LinkedList$Node_0(){
    this.next = this.prev = this;
}

function LinkedList$Node_1(value, nextNode){
    this.value_0 = value;
    this.next = nextNode;
    this.prev = nextNode.prev;
    nextNode.prev.next = this;
    nextNode.prev = this;
}

defineSeed(293, 1, {}, LinkedList$Node_0, LinkedList$Node_1);
_.next = null;
_.prev = null;
_.value_0 = null;
function NoSuchElementException_0(){
    $fillInStackTrace(this);
}

defineSeed(294, 6, makeCastMap([Q$Serializable, Q$Exception, Q$Throwable, Q$NoSuchElementException]), NoSuchElementException_0);
function equalsWithNullCheck(a, b){
    return maskUndefined(a) === maskUndefined(b) || a != null && equals__devirtual$(a, b);
}

function $add_6(this$static, o){
    return $add_4(this$static.arrayList, o);
}

function Vector_0(){
    this.arrayList = new ArrayList_0;
}

function Vector_1(c){
    this.arrayList = new ArrayList_0;
    $addAll_0(this.arrayList, c);
}

defineSeed(296, 224, makeCastMap([Q$Serializable, Q$List]), Vector_0, Vector_1);
_.add_0 = function add_8(index, o){
    $add_3(this.arrayList, index, o);
}
;
_.add = function add_9(o){
    return $add_4(this.arrayList, o);
}
;
_.addAll = function addAll_1(c){
    return $addAll_0(this.arrayList, c);
}
;
_.contains = function contains_8(elem){
    return $indexOf_2(this.arrayList, elem, 0) != -1;
}
;
_.get_1 = function get_5(index){
    return $get_2(this.arrayList, index);
}
;
_.iterator = function iterator_9(){
    return new AbstractList$IteratorImpl_0(this.arrayList);
}
;
_.remove_0 = function remove_11(index){
    return $remove_3(this.arrayList, index);
}
;
_.size_0 = function size_13(){
    return this.arrayList.size;
}
;
_.toArray = function toArray_4(){
    return $toArray_0(this.arrayList);
}
;
_.toArray_0 = function toArray_5(a){
    return $toArray_1(this.arrayList, a);
}
;
_.toString$ = function toString_32(){
    return $toString_3(this.arrayList);
}
;
_.arrayList = null;
var $entry = entry_0;
function gwtOnLoad(errFn, modName, modBase, softPermutationId){
    $moduleName = modName;
    $moduleBase = modBase;
    if (errFn)
        try {
            $entry(init)();
        }
        catch (e) {
            errFn(modName);
        }
    else {
        $entry(init)();
    }
}

var Ljava_lang_Object_2_classLit = createForClass('java.lang.', 'Object', 1), Lcom_google_gwt_core_client_JavaScriptObject_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptObject$', 9), I_classLit = createForPrimitive('int', ' I'), _3I_classLit = createForArray('', '[I', 303, I_classLit), _3Ljava_lang_Object_2_classLit = createForArray('[Ljava.lang.', 'Object;', 301, Ljava_lang_Object_2_classLit), Ljava_lang_Throwable_2_classLit = createForClass('java.lang.', 'Throwable', 8), Ljava_lang_Exception_2_classLit = createForClass('java.lang.', 'Exception', 7), Ljava_lang_RuntimeException_2_classLit = createForClass('java.lang.', 'RuntimeException', 6), Ljava_lang_StackTraceElement_2_classLit = createForClass('java.lang.', 'StackTraceElement', 259), _3Ljava_lang_StackTraceElement_2_classLit = createForArray('[Ljava.lang.', 'StackTraceElement;', 304, Ljava_lang_StackTraceElement_2_classLit), Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit = createForClass('com.google.gwt.lang.', 'LongLibBase$LongEmul', 47), _3Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit = createForArray('[Lcom.google.gwt.lang.', 'LongLibBase$LongEmul;', 305, Lcom_google_gwt_lang_LongLibBase$LongEmul_2_classLit), Lcom_google_gwt_lang_SeedUtil_2_classLit = createForClass('com.google.gwt.lang.', 'SeedUtil', 48), Ljava_lang_Enum_2_classLit = createForClass('java.lang.', 'Enum', 98), Ljava_lang_Error_2_classLit = createForClass('java.lang.', 'Error', 243), Ljava_lang_Boolean_2_classLit = createForClass('java.lang.', 'Boolean', 234), B_classLit = createForPrimitive('byte', ' B'), Ljava_lang_Number_2_classLit = createForClass('java.lang.', 'Number', 236), Ljava_lang_Byte_2_classLit = createForClass('java.lang.', 'Byte', 235), _3Ljava_lang_Byte_2_classLit = createForArray('[Ljava.lang.', 'Byte;', 306, Ljava_lang_Byte_2_classLit), C_classLit = createForPrimitive('char', ' C'), _3C_classLit = createForArray('', '[C', 307, C_classLit), J_classLit = createForPrimitive('long', ' J'), _3J_classLit = createForArray('', '[J', 308, J_classLit), Ljava_lang_Character_2_classLit = createForClass('java.lang.', 'Character', 238), _3Ljava_lang_Character_2_classLit = createForArray('[Ljava.lang.', 'Character;', 309, Ljava_lang_Character_2_classLit), Ljava_lang_Class_2_classLit = createForClass('java.lang.', 'Class', 240), Ljava_lang_Double_2_classLit = createForClass('java.lang.', 'Double', 242), Ljava_lang_Float_2_classLit = createForClass('java.lang.', 'Float', 244), Ljava_lang_Integer_2_classLit = createForClass('java.lang.', 'Integer', 248), _3Ljava_lang_Integer_2_classLit = createForArray('[Ljava.lang.', 'Integer;', 310, Ljava_lang_Integer_2_classLit), Ljava_lang_Long_2_classLit = createForClass('java.lang.', 'Long', 250), _3Ljava_lang_Long_2_classLit = createForArray('[Ljava.lang.', 'Long;', 311, Ljava_lang_Long_2_classLit), Ljava_lang_Short_2_classLit = createForClass('java.lang.', 'Short', 257), _3Ljava_lang_Short_2_classLit = createForArray('[Ljava.lang.', 'Short;', 312, Ljava_lang_Short_2_classLit), Ljava_lang_String_2_classLit = createForClass('java.lang.', 'String', 2), _3Ljava_lang_String_2_classLit = createForArray('[Ljava.lang.', 'String;', 302, Ljava_lang_String_2_classLit), _3B_classLit = createForArray('', '[B', 297, B_classLit), Ljava_lang_ClassCastException_2_classLit = createForClass('java.lang.', 'ClassCastException', 241), Ljava_lang_StringBuilder_2_classLit = createForClass('java.lang.', 'StringBuilder', 262), Ljava_lang_ArrayStoreException_2_classLit = createForClass('java.lang.', 'ArrayStoreException', 233), Lcom_google_gwt_core_client_JavaScriptException_2_classLit = createForClass('com.google.gwt.core.client.', 'JavaScriptException', 5), Ljava_lang_ArithmeticException_2_classLit = createForClass('java.lang.', 'ArithmeticException', 232), Lcom_google_gwt_core_client_impl_StringBufferImpl_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImpl', 21), Lcom_kaazing_gateway_jms_client_bindings_MessageListener_2_classLit = createForClass('com.kaazing.gateway.jms.client.bindings.', 'MessageListener', 87), Lcom_kaazing_gateway_client_URI_2_classLit = createForClass('com.kaazing.gateway.client.', 'URI', 67), Lcom_kaazing_gateway_jms_client_bump_JmsConnectionFactory_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnectionFactory', 186), Lcom_kaazing_gateway_jms_client_bump_JmsConnectionFactory$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnectionFactory$1', 187), Lcom_kaazing_gateway_jms_client_bump_JmsConnectionFactory$1$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnectionFactory$1$1', 188), Lcom_kaazing_gateway_jms_client_bump_JmsConnectionFactory$2_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnectionFactory$2', 189), Lcom_kaazing_gateway_jms_client_JMSException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'JMSException', 76), Lcom_kaazing_gateway_jms_client_bump_JmsConnectionProperties_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnectionProperties', 190), Lcom_kaazing_gateway_jms_client_bindings_ConnectionFutureCallback_2_classLit = createForClass('com.kaazing.gateway.jms.client.bindings.', 'ConnectionFutureCallback', 84), Lcom_kaazing_gateway_jms_client_bump_GenericFuture_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericFuture', 105), Lcom_kaazing_gateway_jms_client_bump_ConnectionFuture_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'ConnectionFuture', 104), Lcom_google_gwt_user_client_Timer_2_classLit = createForClass('com.google.gwt.user.client.', 'Timer', 52), Lcom_kaazing_gateway_jms_client_bump_GenericFuture$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericFuture$1', 128), Lcom_kaazing_gateway_jms_client_bump_GenericFuture$3_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericFuture$3', 129), Lcom_google_gwt_user_client_Timer$1_2_classLit = createForClass('com.google.gwt.user.client.', 'Timer$1', 53), Lcom_kaazing_gateway_jms_client_bindings_ExceptionListener_2_classLit = createForClass('com.kaazing.gateway.jms.client.bindings.', 'ExceptionListener', 85), Lcom_kaazing_gateway_jms_client_bindings_VoidFutureCallback_2_classLit = createForClass('com.kaazing.gateway.jms.client.bindings.', 'VoidFutureCallback', 88), Lcom_kaazing_gateway_jms_client_bump_VoidFuture_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'VoidFuture', 214), Lcom_kaazing_gateway_jms_client_bindings_VoidThrowsJMSExceptionFutureCallback_2_classLit = createForClass('com.kaazing.gateway.jms.client.bindings.', 'VoidThrowsJMSExceptionFutureCallback', 89), Lcom_google_gwt_core_client_impl_StringBufferImplAppend_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'StringBufferImplAppend', 22), Lcom_google_gwt_core_client_Scheduler_2_classLit = createForClass('com.google.gwt.core.client.', 'Scheduler', 14), Lcom_google_gwt_core_client_impl_SchedulerImpl_2_classLit = createForClass('com.google.gwt.core.client.impl.', 'SchedulerImpl', 16), Lcom_kaazing_gateway_jms_client_MessageEOFException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'MessageEOFException', 79), Ljava_io_IOException_2_classLit = createForClass('java.io.', 'IOException', 231), Ljava_lang_NullPointerException_2_classLit = createForClass('java.lang.', 'NullPointerException', 253), Ljava_lang_IllegalArgumentException_2_classLit = createForClass('java.lang.', 'IllegalArgumentException', 245), Lcom_kaazing_gateway_jms_client_bump_JmsConnection_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnection', 183), Lcom_kaazing_gateway_jms_client_bump_JmsConnection$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnection$1', 184), Lcom_kaazing_gateway_jms_client_bump_JmsConnection$2_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsConnection$2', 185), Lcom_kaazing_gateway_jms_client_bump_JmsHandlerImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsHandlerImpl', 205), Lcom_kaazing_gateway_jms_client_bump_JmsHandlerImpl$SubscriptionEntry_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsHandlerImpl$SubscriptionEntry', 208), Lcom_kaazing_gateway_jms_client_bump_JmsHandlerImpl$2_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsHandlerImpl$2', 206), Lcom_kaazing_gateway_jms_client_bump_JmsHandlerImpl$3_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsHandlerImpl$3', 207), Lcom_kaazing_gateway_jms_client_bump_GenericStartStopHandlerImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericStartStopHandlerImpl', 159), Lcom_kaazing_gateway_jms_client_bump_GenericStartStopHandlerImpl$GenericSubscriptionEntry_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericStartStopHandlerImpl$GenericSubscriptionEntry', 160), Lcom_kaazing_gateway_jms_client_bump_StateMachine_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'StateMachine', 140), Lcom_kaazing_gateway_jms_client_bump_GenericStartStopHandlerImpl$StartStopState_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericStartStopHandlerImpl$StartStopState', 161), Lcom_kaazing_gateway_jms_client_bump_GenericConcentratorImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericConcentratorImpl', 115), Lcom_kaazing_gateway_jms_client_bump_GenericConcentratorImpl$2_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericConcentratorImpl$2', 117), Lcom_kaazing_gateway_jms_client_bump_GenericConnectionMetaData_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericConnectionMetaData', 119), Lcom_kaazing_gateway_jms_client_IllegalStateException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'IllegalStateException', 75), Lcom_kaazing_gateway_jms_client_bump_GenericSessionImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSessionImpl', 151), Lcom_kaazing_gateway_jms_client_bump_GenericSessionImpl$SessionState_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSessionImpl$SessionState', 158), Lcom_kaazing_gateway_jms_client_bump_GenericSessionImpl$GenericConsumerMessage_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSessionImpl$GenericConsumerMessage', 157), Lcom_kaazing_gateway_jms_client_bump_GenericSessionImpl$2_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSessionImpl$2', 153), Lcom_kaazing_gateway_jms_client_bump_GenericSessionImpl$3_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSessionImpl$3', 154), Lcom_kaazing_gateway_jms_client_bump_GenericSessionImpl$4_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSessionImpl$4', 155), Lcom_kaazing_gateway_jms_client_bump_GenericSessionImpl$5_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSessionImpl$5', 156), Ljava_util_AbstractCollection_2_classLit = createForClass('java.util.', 'AbstractCollection', 225), Ljava_util_AbstractSet_2_classLit = createForClass('java.util.', 'AbstractSet', 266), Ljava_util_HashSet_2_classLit = createForClass('java.util.', 'HashSet', 286), Ljava_lang_UnsupportedOperationException_2_classLit = createForClass('java.lang.', 'UnsupportedOperationException', 264), Ljava_lang_IllegalStateException_2_classLit = createForClass('java.lang.', 'IllegalStateException', 246), Lcom_kaazing_gateway_jms_client_bump_GenericSemaphoreImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSemaphoreImpl', 149), Lcom_kaazing_gateway_jms_client_bump_GenericSemaphoreImpl$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSemaphoreImpl$1', 150), Ljava_util_AbstractMap_2_classLit = createForClass('java.util.', 'AbstractMap', 96), Ljava_util_AbstractHashMap_2_classLit = createForClass('java.util.', 'AbstractHashMap', 95), Ljava_util_HashMap_2_classLit = createForClass('java.util.', 'HashMap', 94), Ljava_util_AbstractHashMap$EntrySet_2_classLit = createForClass('java.util.', 'AbstractHashMap$EntrySet', 265), Ljava_util_AbstractHashMap$EntrySetIterator_2_classLit = createForClass('java.util.', 'AbstractHashMap$EntrySetIterator', 267), Ljava_util_AbstractMapEntry_2_classLit = createForClass('java.util.', 'AbstractMapEntry', 269), Ljava_util_AbstractHashMap$MapEntryNull_2_classLit = createForClass('java.util.', 'AbstractHashMap$MapEntryNull', 268), Ljava_util_AbstractHashMap$MapEntryString_2_classLit = createForClass('java.util.', 'AbstractHashMap$MapEntryString', 270), Ljava_util_AbstractMap$1_2_classLit = createForClass('java.util.', 'AbstractMap$1', 273), Ljava_util_AbstractMap$1$1_2_classLit = createForClass('java.util.', 'AbstractMap$1$1', 274), Ljava_util_AbstractMap$2_2_classLit = createForClass('java.util.', 'AbstractMap$2', 275), Ljava_util_AbstractMap$2$1_2_classLit = createForClass('java.util.', 'AbstractMap$2$1', 276), Lcom_kaazing_gateway_jms_client_bump_GenericDestinationFactory_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericDestinationFactory', 122), Ljava_util_AbstractList_2_classLit = createForClass('java.util.', 'AbstractList', 224), Ljava_util_Collections$EmptyList_2_classLit = createForClass('java.util.', 'Collections$EmptyList', 281), Ljava_util_Collections$EmptySet_2_classLit = createForClass('java.util.', 'Collections$EmptySet', 282), Ljava_util_Collections$EmptySet$1_2_classLit = createForClass('java.util.', 'Collections$EmptySet$1', 283), Ljava_util_Collections$2_2_classLit = createForClass('java.util.', 'Collections$2', 280), Ljava_util_AbstractList$IteratorImpl_2_classLit = createForClass('java.util.', 'AbstractList$IteratorImpl', 271), Ljava_util_AbstractList$ListIteratorImpl_2_classLit = createForClass('java.util.', 'AbstractList$ListIteratorImpl', 272), Ljava_util_LinkedHashMap_2_classLit = createForClass('java.util.', 'LinkedHashMap', 287), Ljava_util_MapEntryImpl_2_classLit = createForClass('java.util.', 'MapEntryImpl', 289), Ljava_util_LinkedHashMap$ChainEntry_2_classLit = createForClass('java.util.', 'LinkedHashMap$ChainEntry', 288), Ljava_util_LinkedHashMap$EntrySet_2_classLit = createForClass('java.util.', 'LinkedHashMap$EntrySet', 290), Ljava_util_LinkedHashMap$EntrySet$EntryIterator_2_classLit = createForClass('java.util.', 'LinkedHashMap$EntrySet$EntryIterator', 291), Ljava_util_AbstractSequentialList_2_classLit = createForClass('java.util.', 'AbstractSequentialList', 223), Ljava_util_LinkedList_2_classLit = createForClass('java.util.', 'LinkedList', 222), Ljava_util_LinkedList$ListIteratorImpl_2_classLit = createForClass('java.util.', 'LinkedList$ListIteratorImpl', 292), Ljava_util_LinkedList$Node_2_classLit = createForClass('java.util.', 'LinkedList$Node', 293), Lcom_kaazing_gateway_jms_client_bump_JmsChannelFilter_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelFilter', 175), Lcom_kaazing_gateway_jms_client_bump_JmsChannelFilter$JmsChannelFilterState_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelFilter$JmsChannelFilterState', 176), Lcom_kaazing_gateway_jms_client_bump_BumpCodecImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'BumpCodecImpl', 90), Lcom_kaazing_gateway_jms_client_bump_JmsDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType', 191), _3Lcom_kaazing_gateway_jms_client_bump_JmsDataType_2_classLit = createForArray('[Lcom.kaazing.gateway.jms.client.bump.', 'JmsDataType;', 313, Lcom_kaazing_gateway_jms_client_bump_JmsDataType_2_classLit), Lcom_kaazing_gateway_jms_client_bump_JmsChannelImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelImpl', 177), Lcom_kaazing_gateway_jms_client_bump_JmsChannelImpl$ChannelState_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelImpl$ChannelState', 182), Lcom_kaazing_gateway_jms_client_bump_JmsChannelImpl$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelImpl$1', 178), Lcom_kaazing_gateway_jms_client_bump_JmsChannelImpl$2_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelImpl$2', 179), Lcom_kaazing_gateway_jms_client_bump_JmsChannelImpl$3_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelImpl$3', 180), Lcom_kaazing_gateway_jms_client_bump_JmsChannelImpl$4_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsChannelImpl$4', 181), Lcom_kaazing_gateway_jms_client_util_AtomicInteger_2_classLit = createForClass('com.kaazing.gateway.jms.client.util.', 'AtomicInteger', 217), Lcom_kaazing_gateway_jms_client_util_Hashtable_2_classLit = createForClass('com.kaazing.gateway.jms.client.util.', 'Hashtable', 220), Lcom_kaazing_gateway_jms_client_util_Properties_2_classLit = createForClass('com.kaazing.gateway.jms.client.util.', 'Properties', 226), Lcom_kaazing_gateway_jms_client_util_Properties$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.util.', 'Properties$1', 227), Ljava_util_ArrayList_2_classLit = createForClass('java.util.', 'ArrayList', 277), Lcom_kaazing_gateway_jms_client_bump_GenericSubscriptionMessageProcessor_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSubscriptionMessageProcessor', 165), Ljava_lang_StringBuffer_2_classLit = createForClass('java.lang.', 'StringBuffer', 261), Lcom_kaazing_gateway_jms_client_bump_GenericException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericException', 101), Lcom_kaazing_gateway_jms_client_util_AtomicBoolean_2_classLit = createForClass('com.kaazing.gateway.jms.client.util.', 'AtomicBoolean', 216), Lcom_kaazing_gateway_jms_client_bump_GenericMessageProcessorAdapter_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageProcessorAdapter', 112), Lcom_kaazing_gateway_jms_client_bump_GenericBroadcastHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericBroadcastHandler', 111), Ljava_util_Vector_2_classLit = createForClass('java.util.', 'Vector', 296), Lcom_kaazing_gateway_jms_client_bump_ConnectionFailedException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'ConnectionFailedException', 103), Lcom_google_web_bindery_event_shared_Event_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'Event', 28), Lcom_google_gwt_event_shared_GwtEvent_2_classLit = createForClass('com.google.gwt.event.shared.', 'GwtEvent', 27), Lcom_google_gwt_user_client_Window$ClosingEvent_2_classLit = createForClass('com.google.gwt.user.client.', 'Window$ClosingEvent', 55), Lcom_google_gwt_event_shared_HandlerManager_2_classLit = createForClass('com.google.gwt.event.shared.', 'HandlerManager', 31), Lcom_google_gwt_user_client_Window$WindowHandlers_2_classLit = createForClass('com.google.gwt.user.client.', 'Window$WindowHandlers', 56), Lcom_google_web_bindery_event_shared_Event$Type_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'Event$Type', 30), Lcom_google_gwt_event_shared_GwtEvent$Type_2_classLit = createForClass('com.google.gwt.event.shared.', 'GwtEvent$Type', 29), Lcom_google_web_bindery_event_shared_EventBus_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'EventBus', 34), Lcom_google_web_bindery_event_shared_SimpleEventBus_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'SimpleEventBus', 33), Lcom_google_gwt_event_shared_HandlerManager$Bus_2_classLit = createForClass('com.google.gwt.event.shared.', 'HandlerManager$Bus', 32), Lcom_google_web_bindery_event_shared_SimpleEventBus$1_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'SimpleEventBus$1', 61), Lcom_google_web_bindery_event_shared_SimpleEventBus$2_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'SimpleEventBus$2', 62), Lcom_kaazing_gateway_jms_client_bump_JmsWebSocketChannel_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsWebSocketChannel', 211), Lcom_kaazing_gateway_client_WebSocket_2_classLit = createForClass('com.kaazing.gateway.client.', 'WebSocket', 68), Lcom_kaazing_gateway_client_WebSocket$MessageEvent_2_classLit = createForClass('com.kaazing.gateway.client.', 'WebSocket$MessageEvent', 70), Lcom_kaazing_gateway_client_WebSocket$CloseEvent_2_classLit = createForClass('com.kaazing.gateway.client.', 'WebSocket$CloseEvent', 69), _3_3Ljava_lang_String_2_classLit = createForArray('[[Ljava.lang.', 'String;', 314, _3Ljava_lang_String_2_classLit), Lcom_kaazing_gateway_jms_client_bump_BumpFrame_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'BumpFrame', 92), Lcom_kaazing_gateway_jms_client_bump_BumpFrame$FrameCode_2_classLit = createForEnum('com.kaazing.gateway.jms.client.bump.', 'BumpFrame$FrameCode', 97, values_0), _3Lcom_kaazing_gateway_jms_client_bump_BumpFrame$FrameCode_2_classLit = createForArray('[Lcom.kaazing.gateway.jms.client.bump.', 'BumpFrame$FrameCode;', 315, Lcom_kaazing_gateway_jms_client_bump_BumpFrame$FrameCode_2_classLit), Lcom_kaazing_gateway_jms_client_bump_BumpFrame$HeaderValueTypes_2_classLit = createForEnum('com.kaazing.gateway.jms.client.bump.', 'BumpFrame$HeaderValueTypes', 99, values_1), _3Lcom_kaazing_gateway_jms_client_bump_BumpFrame$HeaderValueTypes_2_classLit = createForArray('[Lcom.kaazing.gateway.jms.client.bump.', 'BumpFrame$HeaderValueTypes;', 316, Lcom_kaazing_gateway_jms_client_bump_BumpFrame$HeaderValueTypes_2_classLit), Lcom_kaazing_gateway_jms_client_bump_BumpFrame$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'BumpFrame$1', 93), Lcom_google_gwt_event_logical_shared_CloseEvent_2_classLit = createForClass('com.google.gwt.event.logical.shared.', 'CloseEvent', 26), Ljava_util_NoSuchElementException_2_classLit = createForClass('java.util.', 'NoSuchElementException', 294), Ljava_lang_IndexOutOfBoundsException_2_classLit = createForClass('java.lang.', 'IndexOutOfBoundsException', 247), Lcom_kaazing_gateway_jms_client_AlreadyFulfilledFutureException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'AlreadyFulfilledFutureException', 74), Lcom_kaazing_gateway_jms_client_util_CopyOnWriteArrayList_2_classLit = createForClass('com.kaazing.gateway.jms.client.util.', 'CopyOnWriteArrayList', 219), Lcom_kaazing_gateway_jms_client_bump_GenericTransaction_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTransaction', 171), Lcom_kaazing_gateway_jms_client_bump_GenericBaseMessageImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericBaseMessageImpl', 110), Lcom_kaazing_gateway_jms_client_bump_GenericMessageImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageImpl', 114), Lcom_kaazing_gateway_jms_client_bump_GenericMapMessageImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMapMessageImpl', 132), Lcom_kaazing_gateway_jms_client_bump_GenericMapMessageImpl$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMapMessageImpl$1', 133), Lcom_kaazing_gateway_jms_client_bump_GenericMessageImpl$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageImpl$1', 141), Lcom_kaazing_gateway_jms_client_TransactionRolledBackException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'TransactionRolledBackException', 83), Lcom_kaazing_gateway_jms_client_bump_GenericSubscription_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSubscription', 164), Lcom_kaazing_gateway_client_WebSocketException_2_classLit = createForClass('com.kaazing.gateway.client.', 'WebSocketException', 71), Lcom_kaazing_gateway_jms_client_bump_JmsExtension_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsExtension', 203), _3Lcom_kaazing_gateway_jms_client_bump_JmsExtension_2_classLit = createForArray('[Lcom.kaazing.gateway.jms.client.bump.', 'JmsExtension;', 317, Lcom_kaazing_gateway_jms_client_bump_JmsExtension_2_classLit), Lcom_kaazing_gateway_jms_client_bump_JmsExtension$Kind_2_classLit = createForEnum('com.kaazing.gateway.jms.client.bump.', 'JmsExtension$Kind', 204, values_2), _3Lcom_kaazing_gateway_jms_client_bump_JmsExtension$Kind_2_classLit = createForArray('[Lcom.kaazing.gateway.jms.client.bump.', 'JmsExtension$Kind;', 318, Lcom_kaazing_gateway_jms_client_bump_JmsExtension$Kind_2_classLit), Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsPropertiesContent', 174), Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent$Property_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsPropertiesContent$Property', 210), _3Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent$Property_2_classLit = createForArray('[Lcom.kaazing.gateway.jms.client.bump.', 'JmsPropertiesContent$Property;', 319, Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent$Property_2_classLit), Lcom_kaazing_gateway_jms_client_bump_JmsPropertiesContent$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsPropertiesContent$1', 209), Lcom_kaazing_gateway_jms_client_bump_GenericSubscriberDeletion_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSubscriberDeletion', 163), Lcom_kaazing_gateway_jms_client_bump_TransactionNotCommittedException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'TransactionNotCommittedException', 213), Lcom_kaazing_gateway_jms_client_bump_GenericBytesMessageImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericBytesMessageImpl', 113), Lcom_kaazing_gateway_jms_client_InvalidDestinationException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'InvalidDestinationException', 77), Lcom_kaazing_gateway_jms_client_bump_GenericMessageProducerImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageProducerImpl', 142), Lcom_kaazing_gateway_jms_client_bump_GenericMessageConsumerImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageConsumerImpl', 134), Lcom_kaazing_gateway_jms_client_bump_GenericTopicSubscriberImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTopicSubscriberImpl', 170), Lcom_kaazing_gateway_jms_client_bump_GenericMessageConsumerImpl$ConsumerState_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageConsumerImpl$ConsumerState', 139), Lcom_kaazing_gateway_jms_client_bump_GenericMessageConsumerImpl$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageConsumerImpl$1', 135), Lcom_kaazing_gateway_jms_client_bump_GenericMessageConsumerImpl$2_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageConsumerImpl$2', 136), Lcom_kaazing_gateway_jms_client_bump_GenericMessageConsumerImpl$2$1_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageConsumerImpl$2$1', 137), Lcom_kaazing_gateway_jms_client_bump_GenericMessageConsumerImpl$3_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageConsumerImpl$3', 138), Lcom_kaazing_gateway_jms_client_bump_GenericTextMessageImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTextMessageImpl', 168), Lcom_google_gwt_event_shared_LegacyHandlerWrapper_2_classLit = createForClass('com.google.gwt.event.shared.', 'LegacyHandlerWrapper', 35), Lcom_kaazing_gateway_jms_client_bump_GenericRedeliveryHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericRedeliveryHandler', 131), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsBooleanDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsBooleanDataType', 192), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsByteDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsByteDataType', 194), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsByteArrayDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsByteArrayDataType', 193), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsCharDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsCharDataType', 195), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsDoubleDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsDoubleDataType', 196), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsFloatDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsFloatDataType', 197), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsIntegerDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsIntegerDataType', 198), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsLongDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsLongDataType', 199), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsNullDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsNullDataType', 200), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsShortDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsShortDataType', 201), Lcom_kaazing_gateway_jms_client_bump_JmsDataType$JmsStringDataType_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'JmsDataType$JmsStringDataType', 202), Lcom_kaazing_gateway_jms_client_MessageFormatException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'MessageFormatException', 80), Ljava_lang_NumberFormatException_2_classLit = createForClass('java.lang.', 'NumberFormatException', 256), Lcom_kaazing_gateway_jms_client_MessageNotWriteableException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'MessageNotWriteableException', 82), Lcom_kaazing_gateway_jms_client_bump_GenericDestinationImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericDestinationImpl', 123), Lcom_kaazing_gateway_jms_client_bump_GenericQueueImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericQueueImpl', 144), Lcom_kaazing_gateway_jms_client_bump_GenericTemporaryQueueImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTemporaryQueueImpl', 166), Lcom_kaazing_gateway_jms_client_bump_GenericRemoteTemporaryQueueImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericRemoteTemporaryQueueImpl', 146), Lcom_kaazing_gateway_jms_client_bump_GenericTopicImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTopicImpl', 148), Lcom_kaazing_gateway_jms_client_bump_GenericTemporaryTopicImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTemporaryTopicImpl', 167), Lcom_kaazing_gateway_jms_client_bump_GenericRemoteTemporaryTopicImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericRemoteTemporaryTopicImpl', 147), Lcom_kaazing_gateway_jms_client_bump_GenericMessageQueueImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericMessageQueueImpl', 143), Ljava_util_Comparators$1_2_classLit = createForClass('java.util.', 'Comparators$1', 285), Lcom_kaazing_gateway_jms_client_bump_GenericSubscriptionHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSubscriptionHandler', 127), Lcom_kaazing_gateway_jms_client_MessageNotReadableException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'MessageNotReadableException', 81), Lcom_kaazing_gateway_jms_client_bump_GenericCreation_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericCreation', 120), Lcom_google_web_bindery_event_shared_UmbrellaException_2_classLit = createForClass('com.google.web.bindery.event.shared.', 'UmbrellaException', 37), Lcom_google_gwt_event_shared_UmbrellaException_2_classLit = createForClass('com.google.gwt.event.shared.', 'UmbrellaException', 36), Lcom_kaazing_gateway_jms_client_bump_GenericDeletion_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericDeletion', 121), Lcom_kaazing_gateway_jms_client_bump_GenericQueueSubscriptionHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericQueueSubscriptionHandler', 145), Lcom_kaazing_gateway_jms_client_bump_GenericGuaranteedRedeliveryHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericGuaranteedRedeliveryHandler', 130), Lcom_kaazing_gateway_jms_client_bump_GenericTopicSubscriptionHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTopicSubscriptionHandler', 126), Lcom_kaazing_gateway_jms_client_bump_GenericDurableSubscriptionHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericDurableSubscriptionHandler', 125), Lcom_kaazing_gateway_jms_client_bump_GenericTopicRedeliveryHandler_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericTopicRedeliveryHandler', 169), Lcom_kaazing_gateway_jms_client_util_LinkedBlockingQueue_2_classLit = createForClass('com.kaazing.gateway.jms.client.util.', 'LinkedBlockingQueue', 221), Lcom_kaazing_gateway_jms_client_bump_ConnectionDisconnectedException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'ConnectionDisconnectedException', 100), Lcom_kaazing_gateway_jms_client_bump_ConnectionDroppedException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'ConnectionDroppedException', 102), Lcom_kaazing_gateway_jms_client_bump_ReconnectFailedException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'ReconnectFailedException', 212), Lcom_kaazing_gateway_jms_client_bump_IndexedPropertiesContent_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'IndexedPropertiesContent', 173), Lcom_kaazing_gateway_jms_client_bump_BumpException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'BumpException', 91), Lcom_kaazing_gateway_jms_client_bump_GenericConnected_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericConnected', 118), Lcom_kaazing_gateway_jms_client_bump_GenericDisconnected_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericDisconnected', 124), Lcom_kaazing_gateway_jms_client_bump_ConnectionRestoredException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'ConnectionRestoredException', 107), Lcom_kaazing_gateway_jms_client_bump_ConnectionInterruptedException_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'ConnectionInterruptedException', 106), Lcom_kaazing_gateway_jms_client_JMSSecurityException_2_classLit = createForClass('com.kaazing.gateway.jms.client.', 'JMSSecurityException', 78), Lcom_kaazing_gateway_jms_client_bump_GenericReceiptImpl_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericReceiptImpl', 109), Lcom_kaazing_gateway_jms_client_bump_GenericAckReceipt_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericAckReceipt', 108), Lcom_kaazing_gateway_jms_client_bump_GenericSubscribeReceipt_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericSubscribeReceipt', 162), Lcom_kaazing_gateway_jms_client_bump_GenericUnsubscribeReceipt_2_classLit = createForClass('com.kaazing.gateway.jms.client.bump.', 'GenericUnsubscribeReceipt', 172);
// $stats && $stats({moduleName:'JmsClient',sessionId:$sessionId,subSystem:'startup',evtGroup:'moduleStartup',millis:(new Date()).getTime(),type:'moduleEvalEnd'});
// if (JmsClient && JmsClient.onScriptLoad)JmsClient.onScriptLoad(gwtOnLoad);
// init_0();
