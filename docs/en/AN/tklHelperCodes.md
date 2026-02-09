```javascript
import {Buffer} from "buffer";
export const version="1.01.023"
export  class BufferTKL {
    static DUBM_PERIOD=86400*3650
    static INVALID_NUM=-1000000000
    static INVALID_STR="INVALID"
    static PERIOD_DEFAULT=900;
    static PERIOD_DUMB=86400*3650;
    static PERIOD_TRIGGER="TRIGGER";
    static PERIOD_MAX =86400*365
    constructor(buffer) {
        if (buffer==undefined) {this.buffer=Buffer.alloc(0);
        }else if (!Buffer.isBuffer(buffer)) {this.buffer=Buffer.alloc(0);
        }else{  this.buffer = buffer;   }
        this.size=this.buffer.length;
    }
    static getTypeInfo(type) {
        const normalizedType = String(type).trim().toLowerCase();
        let dataLen = 0;
        let baseType = normalizedType;
        let bitStart,bitEnd;
        if (normalizedType.length > 3) {
            if (normalizedType.startsWith("hex")) {

                const endian=normalizedType.substring(3,5)
                baseType = "hexbe";
                if (endian==="le"){ baseType = "hexle"}
                if  (normalizedType.includes('e')) { dataLen = parseInt(normalizedType.substring(5), 10);
                }else { dataLen = parseInt(normalizedType.substring(3), 10);    }
            } else if (normalizedType.startsWith("bcd")) {
                const endian=normalizedType.substring(3,5)
                baseType = "bcdbe";
                if (endian==="le"){ baseType = "bcdle"; }
                if  (normalizedType.includes('e')) { dataLen = parseInt(normalizedType.substring(5), 10);
                }else { dataLen = parseInt(normalizedType.substring(3), 10);}
            }else if (normalizedType.startsWith("bit")) {
                baseType = "bitbe";
                const endian=normalizedType.substring(3,5)
                if (endian==="le"){ baseType = "bitle"}
                let valueList=[]
                if  (normalizedType.includes('e')) { valueList=normalizedType.substring(5).split("-");
                }else { valueList=normalizedType.substring(3).split("-");   }
                bitStart=Number(valueList[0])
                bitEnd=Number(valueList[1])
                dataLen = ((bitEnd/8)|0) +1;
            }else if (normalizedType.startsWith("bool")) {
                baseType = "bool";
                dataLen=parseInt(normalizedType.substring(4), 10);
            }else if (normalizedType.startsWith("boolean")) {
                baseType = "boolean";
                dataLen=parseInt(normalizedType.substring(7), 10);
            }else if (normalizedType.startsWith("string")) {
                baseType = "string";
                dataLen = parseInt(normalizedType.substring(6), 10);
            }
        }
        switch (baseType) {
            case "int8":      return { type: "Int8",      dataLen: 1};
            case "uint8":     return { type: "UInt8",     dataLen: 1 };
            case "int16":
            case "int16be":   return { type: "Int16BE",   dataLen: 2};
            case "uint16":
            case "uint16be":  return { type: "UInt16BE",  dataLen: 2};
            case "int16le":   return { type: "Int16LE",   dataLen: 2};
            case "uint16le":  return { type: "UInt16LE",  dataLen: 2};

            case "int24":
            case "int24be":   return { type: "IntBE",     dataLen: 3}; // Buffer 没有 readInt24，通常用 readIntBE(offset, 3)
            case "uint24":
            case "uint24be":  return { type: "UIntBE",    dataLen: 3};
            case "int24le":   return { type: "IntLE",     dataLen: 3};
            case "uint24le":  return { type: "UIntLE",    dataLen: 3};

            case "int32":
            case "int32be":   return { type: "Int32BE",   dataLen: 4};
            case "uint32":
            case "uint32be":  return { type: "UInt32BE",  dataLen: 4};
            case "int32le":   return { type: "Int32LE",   dataLen: 4};
            case "uint32le":  return { type: "UInt32LE",  dataLen: 4};

            case "int40":
            case "int40be":   return { type: "IntBE",     dataLen: 5};
            case "uint40":
            case "uint40be":  return { type: "UIntBE",    dataLen: 5};
            case "int40le":   return { type: "IntLE",     dataLen: 5};
            case "uint40le":  return { type: "UIntLE",    dataLen: 5};

            case "int48":
            case "int48be":   return { type: "IntBE",     dataLen: 6};
            case "uint48":
            case "uint48be":  return { type: "UIntBE",    dataLen: 6};
            case "int48le":   return { type: "IntLE",     dataLen: 6};
            case "uint48le":  return { type: "UIntLE",    dataLen: 6};

            case "int56":
            case "int56be":   return { type: "IntBE",     dataLen: 7};
            case "uint56":
            case "uint56be":  return { type: "UIntBE",    dataLen: 7};
            case "int56le":   return { type: "IntLE",     dataLen: 7};
            case "uint56le":  return { type: "UIntLE",    dataLen: 7};

            case "int64":
            case "int64be":   return { type: "BigInt64BE",  dataLen: 8};
            case "uint64":
            case "uint64be":  return { type: "BigUInt64BE", dataLen: 8};
            case "int64le":   return { type: "BigInt64LE",  dataLen: 8};
            case "uint64le":  return { type: "BigUInt64LE", dataLen: 8};

            case "floatbe":   return { type: "FloatBE",   dataLen: 4};
            case "floatle":   return { type: "FloatLE",   dataLen: 4};

            case "floatcdab": return { type: "FloatCDAB",     dataLen: 4};
            case "intcdab":   return { type: "IntCDAB",       dataLen: 4};
            case "hexbe":       return { type: "HexBE",           dataLen: dataLen};
            case "hexle":       return { type: "HexLE",           dataLen: dataLen};
            case "bcdbe":       return { type: "BCDBE",           dataLen: dataLen};
            case "bcdle":       return { type: "BCDLE",           dataLen: dataLen};
            case "bitle":       return { type: "BitLE",     dataLen: dataLen,bitStart:bitStart,bitEnd:bitEnd};
            case "bitbe":       return { type: "BitBE",     dataLen: dataLen,bitStart:bitStart,bitEnd:bitEnd};
            case "bool" :       return { type: "Bool" ,     dataLen: dataLen};
            case "boolean" :       return { type: "Boolean" ,     dataLen: dataLen};
            case "string":      return { type: "String",    dataLen: dataLen};
            default:
                return { type: "invalid", dataLen: 0 };
        }
    }
    _preRead (offset,typeInfo) {
        if (!this._ensure(offset,typeInfo.dataLen)) { return false}
        let retBuffer=Buffer.alloc(typeInfo.dataLen);
        this.buffer.copy(retBuffer,0,offset,offset+typeInfo.dataLen);
        return retBuffer;
    }
    read(offset,type) {
        const typeInfo=BufferTKL.getTypeInfo(type);
        if (typeInfo.type==="invalid") {return false}
        let value=0
        let valBuffer=this._preRead(offset,typeInfo)
        if (valBuffer===false) { return false }
        switch (typeInfo.type) {
            case "UIntBE":
            case "IntBE":
            case "UIntLE":
            case "IntLE":  value= valBuffer["read"+typeInfo.type](0, typeInfo.dataLen); break;
            case "FloatCDAB": value=  BufferTKL.readFloatCDAB(valBuffer,0); break;
            case "IntCDAB" : value=  BufferTKL.readIntCDAB(valBuffer,0);break;
            case "HexBE": value=  BufferTKL.readHexBE(valBuffer,0,typeInfo.dataLen); break;
            case "BCDBE": value=  BufferTKL.readBCDBE(valBuffer,0,typeInfo.dataLen);break;
            case "HexLE": value=  BufferTKL.readHexLE(valBuffer,0,typeInfo.dataLen); break;
            case "BCDLE": value=  BufferTKL.readBCDLE(valBuffer,0,typeInfo.dataLen);break;
            case "BitLE": value= BufferTKL.readBitLE(valBuffer,0,typeInfo.dataLen,typeInfo.bitStart,typeInfo.bitEnd);break;
            case "BitBE":value= BufferTKL.readBitBE(valBuffer,0,typeInfo.dataLen,typeInfo.bitStart,typeInfo.bitEnd);break;
            case "Bool":value= BufferTKL.readBool(valBuffer,0,typeInfo.dataLen);break;
            case "Boolean":value= BufferTKL.readBoolean(valBuffer,0,typeInfo.dataLen);break;
            case "String":value= BufferTKL.readString(valBuffer,0,typeInfo.dataLen);break;
            case "BigInt64BE" :
            case "BigUInt64BE":
            case "BigInt64LE" :
            case "BigUInt64LE":
                value= Number( valBuffer["read"+typeInfo.type](0));
                break;
            default:
                value=  valBuffer["read"+typeInfo.type](0);
                break  ;
        }
        return value;
    }
    static write(value,type) {
        const typeInfo=BufferTKL.getTypeInfo(type);
        if (typeInfo.type==="invalid") {return Buffer.alloc(0);}
        let valBuffer=Buffer.alloc(typeInfo.dataLen);
        switch (typeInfo.type) {
            case "UIntBE":
            case "IntBE":
            case "UIntLE":
            case "IntLE":       valBuffer["write"+typeInfo.type](value,0, typeInfo.dataLen); break;
            case "FloatCDAB":   BufferTKL.writeFloatCDAB(valBuffer,value,0); break;
            case "IntCDAB" :    BufferTKL.writeIntCDAB(valBuffer,value,0);break;
            case "HexBE":       BufferTKL.writeHexBE(valBuffer,value,0,typeInfo.dataLen); break;
            case "BCDBE":       BufferTKL.writeBCDBE(valBuffer,value,0,typeInfo.dataLen);break;
            case "HexLE":       BufferTKL.writeHexLE(valBuffer,value,0,typeInfo.dataLen); break;
            case "BCDLE":       BufferTKL.writeBCDLE(valBuffer,value,0,typeInfo.dataLen);break;
            case "BitLE":       BufferTKL.writeBitLE(valBuffer,value,0,typeInfo.dataLen,typeInfo.bitStart,typeInfo.bitEnd);break;
            case "BitBE":       BufferTKL.writeBitBE(valBuffer,value,0,typeInfo.dataLen,typeInfo.bitStart,typeInfo.bitEnd);break;
            case "Bool":       BufferTKL.writeBool(valBuffer,value,0,typeInfo.dataLen);break;
            case "Boolean":       BufferTKL.writeBoolean(valBuffer,value,0,typeInfo.dataLen);break;
            case "String":       BufferTKL.writeString(valBuffer,value,0,typeInfo.dataLen);break;

            default:
                valBuffer["write"+typeInfo.type](value,0); break  ;
        }
        return valBuffer;
    }
    _ensure(offset,bytes) {
        if (offset + bytes > this.size) {return false}
        return true;
    }
    static readHexBE(buffer,offset,dataLen) {
        const data = buffer.slice(offset, offset + dataLen);
        return data.toString('hex').toLowerCase();
    }
    static readHexLE(buffer,offset,dataLen) {
        let data=Buffer.alloc(dataLen);
        for (let i=0;i<dataLen;i++) {   data[i]=buffer[offset+dataLen-i-1];}
        return data.toString('hex').toLowerCase();
    }
    static readBCDBE(buffer,offset,dataLen) {
        let value = 0;
        for (let i = 0; i < dataLen; i++) {
            const byte = buffer[offset + i];
            const high = (byte >> 4) & 0x0f;
            const low = byte & 0x0f;
            if (high > 9 || low > 9) {  throw Error("wrong input or type")}
            value = value * 100 + high * 10 + low;
        }
        return value;
    }
    static readBCDLE(buffer,offset,dataLen) {
        let value = 0;
        for (let i = 0; i < dataLen; i++) {
            const byte = buffer[offset + dataLen-i-1];
            const high = (byte >> 4) & 0x0f;
            const low = byte & 0x0f;
            if (high > 9 || low > 9) {  throw Error("bcdle : wrong input or type")}
            value = value * 100 + high * 10 + low;
        }
        return value;
    }
    static readFloatCDAB(buffer,offset,dataLen) {
        const buf = buffer.slice(offset, offset + 4);
        const swapped = Buffer.from([buf[2], buf[3], buf[0], buf[1]]);
        return swapped.readFloatLE(0);
    }
    static readIntCDAB(buffer,offset) {
        const buf = buffer.slice(offset, offset + 4);
        const swapped = Buffer.from([buf[2], buf[3], buf[0], buf[1]]);
        return swapped.readInt32LE(0);
    }
    static readBool(buffer,offset,dataLen) {
        const data = buffer.readUIntBE(offset, dataLen);
        if (data===0) { return 0}
        return 1
    }
    static readBoolean(buffer,offset,dataLen) {
        const data = buffer.readUIntBE(offset, dataLen);
        if (data===0) { return false}
        return true
    }
    static readString(buffer,offset,dataLen) {
        const data = buffer.slice(offset, offset + dataLen);
        return data.toString('ascii');
    }
    static readBitLE(buffer, offset, dataLen, bitStart, bitEnd) {
        if (bitStart < 0 || bitEnd >= dataLen * 8 || bitStart > bitEnd) {
            throw new RangeError(`Invalid bit range: [${bitStart}, ${bitEnd}] for ${dataLen} bytes`);
        }
        const width = bitEnd - bitStart + 1;
        let val = 0n;
        for (let i = 0; i < dataLen; i++) {
            val |= BigInt(buffer[offset + i]) << (8n * BigInt(i));
        }
        const shifted = val >> BigInt(bitStart);
        const mask = (1n << BigInt(width)) - 1n;
        return Number(shifted & mask);
    }

    static readBitBE(buffer, offset, dataLen, bitStart, bitEnd) {
        if (bitStart < 0 || bitEnd >= dataLen * 8 || bitStart > bitEnd) {
            throw new RangeError(`Invalid bit range: [${bitStart}, ${bitEnd}] for ${dataLen} bytes`);
        }
        const width = bitEnd - bitStart + 1;
        let val = 0n;
        for (let i = 0; i < dataLen; i++) {
            val = (val << 8n) | BigInt(buffer[offset + i]);
        }
        const shifted = val >> BigInt(bitStart);
        const mask = (1n << BigInt(width)) - 1n;
        return Number(shifted & mask);
    }
    static writeHexBE(buffer,value,offset, dataLen) {
        let inputstr=value.toLowerCase().replaceAll("0x","").replaceAll(" ","");
        const hex = inputstr.padStart(dataLen * 2, '0');
        const tempBuf = Buffer.from(hex, 'hex');
        tempBuf.copy(buffer, offset, 0, dataLen);
        return buffer;
    }
    static writeHexLE(buffer,value, offset, dataLen) {
        let inputstr=value.toLowerCase().replaceAll("0x","").replaceAll(" ","");
        const hex = inputstr.padStart(dataLen * 2, '0');
        const tempBuf = Buffer.from(hex, 'hex');
        for (let i = 0; i < dataLen; i++) {
            buffer[offset + dataLen - i - 1] = tempBuf[i];
        }
        return buffer;
    }
    static writeBCDBE(buffer,value,offset, dataLen) {
        let tempValue = value;
        for (let i = dataLen - 1; i >= 0; i--) {
            const low = tempValue % 10;
            tempValue = Math.floor(tempValue / 10);
            const high = tempValue % 10;
            tempValue = Math.floor(tempValue / 10);
            buffer[offset + i] = (high << 4) | low;
        }
        return buffer;
    }
    static writeBCDLE(buffer, value, offset, dataLen) {
        let tempValue = value;
        for (let i = 0; i < dataLen; i++) {
            const low = tempValue % 10;
            tempValue = Math.floor(tempValue / 10);
            const high = tempValue % 10;
            tempValue = Math.floor(tempValue / 10);
            buffer[offset + dataLen - i - 1] = (high << 4) | low;
        }
        return buffer;
    }
    static writeFloatCDAB(buffer, value, offset) {
        const tempBuf = Buffer.alloc(4);
        tempBuf.writeFloatLE(value, 0);
        // 从 [0,1,2,3] 变换为 [2,3,0,1]
        buffer[offset] = tempBuf[2];
        buffer[offset + 1] = tempBuf[3];
        buffer[offset + 2] = tempBuf[0];
        buffer[offset + 3] = tempBuf[1];
        return buffer;
    }
    static writeIntCDAB(buffer, value, offset) {
        const tempBuf = Buffer.alloc(4);
        tempBuf.writeInt32LE(value, 0);
        // 从 [0,1,2,3] 变换为 [2,3,0,1]
        buffer[offset] = tempBuf[2];
        buffer[offset + 1] = tempBuf[3];
        buffer[offset + 2] = tempBuf[0];
        buffer[offset + 3] = tempBuf[1];
        return buffer;
    }
    static writeBool(buffer,value,offset, dataLen) {
        const tempBuf = Buffer.alloc(dataLen);
        tempBuf.writeUIntBE(value,offset,dataLen);
        return tempBuf;
    }
    static writeBoolean(buffer,value,offset, dataLen) {
        const wval = value?1:0;
        const tempBuf = Buffer.alloc(dataLen);
        tempBuf.writeUIntBE(wval,offset,dataLen);
        return tempBuf;
    }
    static writeString(buffer, value, offset, dataLen) {
        const tempBuf = Buffer.from(value, 'ascii');
        tempBuf.copy(buffer, offset, 0, dataLen);
        return buffer;
    }
    static writeBitLE(buffer, value, offset, dataLen, bitStart, bitEnd) {
        const width = bitEnd - bitStart + 1;
        const mask = width >= 32 ? 0xFFFFFFFF : (1 << width) - 1;
        const cleanValue = (value & mask);
        if (dataLen > 4) {
            let low = buffer.readUInt32LE(offset);
            let high = buffer.readUIntLE(offset + 4, dataLen - 4);
            if (bitStart >= 32) {
                const highMask = ~(mask << (bitStart - 32));
                high = (high & highMask) | (cleanValue << (bitStart - 32));
            } else if (bitEnd < 32) {
                const lowMask = ~(mask << bitStart);
                low = (low & lowMask) | (cleanValue << bitStart);
            } else {
                const lowWidth = 32 - bitStart;
                low = (low & ~(mask << bitStart)) | (cleanValue << bitStart);
                high = (high & ~(mask >>> lowWidth)) | (cleanValue >>> lowWidth);
            }
            buffer.writeUInt32LE(low >>> 0, offset);
            buffer.writeUIntLE(high >>> 0, offset + 4, dataLen - 4);
        } else {
            let val = buffer.readUIntLE(offset, dataLen);
            val = (val & ~(mask << bitStart)) | (cleanValue << bitStart);
            buffer.writeUIntLE(val >>> 0, offset, dataLen);
        }
        return buffer;
    }
    static writeBitBE(buffer, value, offset, dataLen, bitStart, bitEnd) {
        const width = bitEnd - bitStart + 1;
        const mask = width >= 32 ? 0xFFFFFFFF : (1 << width) - 1;
        const cleanValue = (value & mask);
        const totalBits = dataLen * 8;
        const reverseStart = totalBits - 1 - bitEnd;
        if (dataLen > 4) {
            let high = buffer.readUIntLE(offset, dataLen - 4);
            let low = buffer.readUInt32BE(offset + dataLen - 4);
            if (reverseStart >= 32) {
                high = (high & ~(mask << (reverseStart - 32))) | (cleanValue << (reverseStart - 32));
            } else if (totalBits - 1 - bitStart < 32) {
                low = (low & ~(mask << reverseStart)) | (cleanValue << reverseStart);
            } else {
                const lowWidth = 32 - reverseStart;
                low = (low & ~(mask << reverseStart)) | (cleanValue << reverseStart);
                high = (high & ~(mask >>> lowWidth)) | (cleanValue >>> lowWidth);
            }
            buffer.writeUIntLE(high >>> 0, offset, dataLen - 4);
            buffer.writeUInt32BE(low >>> 0, offset + dataLen - 4);
        } else {
            let val = buffer.readUIntBE(offset, dataLen);
            const shift = totalBits - 1 - bitEnd;
            val = (val & ~(mask << shift)) | (cleanValue << shift);
            buffer.writeUIntBE(val >>> 0, offset, dataLen);
        }
        return buffer;
    }
}
export class PayloadParser {
    constructor( {
                     bufferType,
                     device,
                     msg,
                     frameInfo,
                     appInfo,
                     paraInfo,
                     extraData
                 }) {
        if (bufferType==undefined){ this.bufferType=BufferTKL
        }else { this.bufferType=bufferType }
        this.device = device
        this.msg=msg;
        this.frameInfo=frameInfo??{}
        this.port=frameInfo?.port ?? -1;
        this.dataLen=frameInfo?.dataLen ?? -1;
        this.status=frameInfo?.status ?? -1;
        this.battery=frameInfo?.battery ?? -1;
        this.rssi=frameInfo?.rssi ?? false;
        this.tagList=frameInfo?.tagList ?? [];
        if(frameInfo?.subDevice==undefined||frameInfo?.subDevice?.index==undefined) {
            this.frameInfo.subDevice={}
            this.frameInfo.subDevice.index=-1
            this.frameInfo.subDevice.type="uint8"
        }
        this.appInfo=appInfo
        this.paraInfo=paraInfo
        this.extraData=extraData
        this.payload = Buffer.from(msg?.userdata?.payload, "base64");
        this.port = msg?.userdata?.port || -1;
        this.tdata={};
        this.pdata={};
    }
    _preParseTelemetry(){}
    _preParseParas(){}
    _postParseTelemetry() {}
    _postParseParas() {}
    telemetry() {
        let payBuffer = new this.bufferType(this.payload);
        let valid=true
        if (this.frameInfo.port>0&&this.port!==this.frameInfo.port){ return null }
        if(this.frameInfo.dataLen>0&&this.frameInfo.dataLen!==payBuffer.size){ return null }
        this.frameInfo.tagList.forEach(range => {if(this.payload[range.index]!==range.tag){ valid=false}})
        if(valid===false){ return null}
        if (this.frameInfo?.status>=0) { this.tdata.status=payBuffer.read(this.frameInfo.status,"uint8");   }
        if (this.frameInfo?.battery>=0) {
            let vbat=payBuffer.read(this.frameInfo.battery,"uint8");
            this.tdata.battery=Number(((vbat*1.6)/254 +2.0).toFixed(2))
        }
        if (this.frameInfo.rssi&&this.msg?.gwrx?.[0] ) {
            this.tdata.rssi = this.msg.gwrx[0].rssi;
            this.tdata.snr = this.msg.gwrx[0].lsnr;
        }
        this._preParseTelemetry()
        if (this.frameInfo?.subDevice?.index>=0){
            this.tdata.addr=payBuffer.read(this.frameInfo?.subDevice?.index,this.frameInfo?.subDevice?.type);
            if (this.tdata.addr===0){return null}
        }
        const counts=this.appInfo.length;
        for (let i=0; i<counts; i++){
            let val=payBuffer.read(this.appInfo[i].index,this.appInfo[i].type);
            if (val===false){ continue}
            let lastVal
            if (this.appInfo[i]?.illegal!=undefined ) {
                let method=this.appInfo[i]?.illegal.substring(0,1)
                 let checkBuffer= new BufferTKL( Buffer.from(this.appInfo[i]?.illegal.substring(1),"hex"));
                 let checkVal= checkBuffer.read(0,this.appInfo[i].type)
                if (method==='>'&& val>checkVal){ continue}
                if (method==='<'&& val<checkVal){ continue}
                if (method==='='&& val===checkVal){ continue}
            }
            let decimal=this.appInfo[i]?.decimal==undefined?0:this.appInfo[i]?.decimal;
            if (typeof val==="number"){
                if (this.appInfo[i]?.coefficient==undefined){   lastVal=Number(val.toFixed(decimal));
                }else if (typeof this.appInfo[i]?.coefficient!=="number"){   lastVal=Number(val.toFixed(decimal));
                }else { lastVal=Number((val*this.appInfo[i].coefficient).toFixed(decimal));  }
            }else { lastVal=val }
            if (this.appInfo[i].postProcess!=undefined){
                let postFucn=this.appInfo[i].postProcess;
                if(!postFucn.includes("return") ){
                    postFucn= postFucn.concat(" ; return value;");
                }
                const postProcessor = new Function('value',postFucn);
                lastVal = postProcessor(lastVal);
            }
            if (Object.keys(this.appInfo[i].options??{}).length > 0) {
                let rval=lastVal.toString()
               // lastVal=this.appInfo[i].options[Object.keys(this.appInfo[i].options)[0]]
                if (rval in this.appInfo[i].options) {  lastVal= this.appInfo[i].options[rval] }
            }
            this.tdata[this.appInfo[i].field_name]=lastVal
        }
        for (let i=0; i<counts; i++){
            if (this.appInfo[i]?.coefficient==undefined) {continue}
            if (typeof this.appInfo[i].coefficient==="number"){ continue}
            let val=this.tdata[this.appInfo[i].field_name]
            if (val==undefined){ continue}
            let valcof=this.tdata[this.appInfo[i].coefficient];
            if (valcof==undefined){ continue}
            let decimal=this.appInfo[i]?.decimal==undefined?0:this.appInfo[i]?.decimal;
            this.tdata[this.appInfo[i].field_name]=Number((val*valcof).toFixed(decimal));
        }
        this._postParseTelemetry()
        return Object.keys(this.tdata).length ? this.tdata : null;
    }
    paras() {
        if (this.port !== 214) {  return null }
       // this.pdata.content = this.payload.toString('hex');
        let size=this.payload.length;
        let regAddress=0
        let startAddress=0
        this._preParseParas()
        for (let i = 0; i < size; i++) {
            //if (payload[i]!==0x2F){ return null }
            let paraName="app"
            if ((this.payload[i]&0x3F)===0x2F) { paraName="app"
            }else if((this.payload[i]&0x3F)===0x21) { paraName="fw"
            }else if((this.payload[i]&0x3F)===0x29) { paraName="cf"
            }else if((this.payload[i]&0x3F)===0x22) { paraName="radio"
            }else if((this.payload[i]&0x3F)===0x24) { paraName="ds"
            }else if((this.payload[i]&0x3F)===0x23) { paraName="status"
            }else { return null}
            if (size<(i+1+this.payload[i+1]) ){ return null }
            const regcounts=this.payload[i+1]-2
            if (size<(i+4+regcounts) ){ return null }
            startAddress=this.payload[i+2]
            let reader=new this.bufferType(this.payload.slice(i+4,i+4+regcounts));
            for (let j = 0; j < regcounts; j++) {
                regAddress=startAddress + j
                let para={}
                para=this.paraInfo[paraName+"_"+regAddress.toString(10)]
                for (let k=0;k<16;k++) {
                    if (k>0) {  para=this.paraInfo[paraName+"_"+regAddress.toString(10)+"_"+k.toString(10)]}
                    if (para==undefined){    continue    }
                    let val=reader.read(j,para.type);
                    if (val===false){ continue}
                    let lastVal
                    if (para.illegal!=undefined ) {
                        let method=para.illegal.substring(0,1)
                        let checkBuffer= new BufferTKL( Buffer.from(para.illegal.substring(1),"hex"));
                        let checkVal= checkBuffer.read(0,para.type)
                        if (method==='>'&& val>checkVal){ continue}
                        if (method==='<'&& val<checkVal){ continue}
                        if (method==='='&& val===checkVal){ continue}
                    }
                    let decimal=para?.decimal==undefined?0:para?.decimal;
                    if (typeof val==="number"){
                        if (para?.coefficient==undefined){   lastVal=Number(val.toFixed(decimal));
                        }else if (typeof para?.coefficient!=="number"){   lastVal=Number(val.toFixed(decimal));
                        }else { lastVal=Number((val*para.coefficient).toFixed(decimal));  }
                    }else { lastVal=val }
                    if (para.postProcess!=undefined){
                        let postFunc=para.postProcess;
                        if(!postFunc.includes("return") ){postFunc= postFunc.concat(" ; return value;");}
                        const postProcessor = new Function('value',postFunc);
                        lastVal = postProcessor(lastVal);
                    }
                    if (Object.keys(para.options??{}).length > 0) {
                        let rval=lastVal.toString()
                        if (rval in para.options) {    lastVal= para.options[rval] }
                    }
                    this.pdata[para.field_name]=lastVal
                }
            }
            i+=regcounts+3;
        }
        this._postParseParas()
        if (Object.keys(this.pdata).length < 1) {
            return null;
        }
        return this.pdata;
    }
}
export class MSparser extends PayloadParser {
    constructor({device, msg, frameInfo, extraData}){
        super({
            device:device, msg:msg, frameInfo:frameInfo, extraData:extraData
        })
        let payload=Buffer.from(msg?.userdata?.payload, "base64")
        let  payBuffer=new BufferTKL(payload);
        this.appInfo=[];
        let index=0
        let newPayload=Buffer.alloc(255);
        for(let i=0; i < payload.length;) {
            let idVal=payBuffer.read(i,frameInfo.idType)
            i+=2;
            for (let j = 0; j < 4; j++) {
                let key="user_0x"+idVal+"_"+j.toString(10)
                let para=this.extraData[key]
                if (para==undefined) { continue}
                let ptypeInfo=BufferTKL.getTypeInfo(para.type)
                if ((i+ptypeInfo.dataLen)>payload.length) {continue}
                para["index"]=index
                payload.copy(newPayload,index,i,i+ptypeInfo.dataLen)
                index+=ptypeInfo.dataLen
                this.appInfo.push(para)
                i+=ptypeInfo.dataLen;
            }
        }
        this.payload=Buffer.alloc(index);
        newPayload.copy(this.payload,0,0,index);
    }
}
export class Utils{
    static paraName = Object.freeze({
        app: 'app',
        cf: 'cf',
        fw: 'fw',
        radio: 'radio',
        user:"user"
    });
    static msgType=Object.freeze({
        paras:"para",
        transParent:"transParent",
        swDown:"swDown",
        user:"user",
    })
    static ACTION = Object.freeze({  no:"no",new: 'new',clear: 'clear'});
    static LEVEL=Object.freeze({low:'low',mid:'mid',high:'high',urgent:'urgent'});
    static parseToBuffer(inputStr){
        if (inputStr==undefined){  return Buffer.alloc(0)}
        let xstr=inputStr.toLowerCase().replaceAll("0x","").replaceAll(" ","")
        return Buffer.from(xstr.length%2===0?xstr:('0'+xstr),"hex")
    }
    static parseVal(valstr){
        if (typeof valstr==="number"){ return valstr; }
        let val=valstr.toLowerCase();
        if (val.includes("0x")){
            val=val.replaceAll("0x","").replaceAll(" ","");
            let cleanedHex =val.length % 2 === 0 ? val : '0' + val;
            return parseInt(cleanedHex, 16);
        }
        return parseInt(val,10)
    }
    static  crcSum( buf, len, poly=0)
    {
        let crc = poly;
        for(let i=0;i<len;i++) {
            crc += buf[i];
            crc&=0xFFFF
        }
        return crc&0xFFFF;
    }
    static crc16CCIT (data, len,poly=0x1021)
    {
        let remainder = 0;
        let polynomial = poly;
        for( let i = 0; i < len; i++ )
        {
            remainder ^=(data[i] << 8);
            for( let bit = 8; bit > 0; bit--)
            {
                if( (remainder & 0x8000) )	 remainder = (remainder << 1) ^ polynomial;
                else 					     remainder <<= 1;
                remainder &= 0xFFFF; // Keep within 16 bits
            }
        }
        return remainder&0xFFFF;
    }
    static crc16Modbus(buf,  len, poly=0xa001)
    {
        let i,j;
        let crc;
        for(i=0,crc=0xffff;i< len;i++)
        {
            crc ^= buf[i];
            for(j=0;j<8;j++)
            {
                if(crc & 0x01)  crc = (crc >> 1) ^ poly;
                else            crc >>= 1;
                crc&=0xFFFF
            }
        }
        return crc&0xFFFF;
    }
    static timingPerformanceCalc(sf, bw, swPeriod) {
        let minSf = 5;
        let maxSf = 12;
        let bwList = [500, 250, 125];
        let baseSymbolTime = 0.064;
        if (sf < minSf) sf = 5;
        if (sf > maxSf) sf = 12;
        if (!bwList.includes(bw)) bw = 500;
        let powerOf2 =  ((sf - minSf) + (bwList.indexOf(bw)))
        let symbolTime = baseSymbolTime * (2 ** powerOf2);
        return Math.ceil((swPeriod + 300) / symbolTime)
    }
}
export class TriggerHelper{
    constructor({
                    device, thingModelId,alarmEvent,title,desc,level,action
                }) {
        this.device = device;
        this.thingModelId = thingModelId;
        this.alarmEvent = alarmEvent??device?.name;
        this.title="["+device?.name+"] : " +(title??"")
        this.action = action??Utils.ACTION.new;
        this.desc = desc??"";
        this.level = level??Utils.LEVEL.low;
        this.group=device?.server_attrs?.group?.notify??[];
        this.tdata=device?.telemetry_data?.[thingModelId]
    }
     _alarmProcess(info){}
     alarm(info){
         let rslt=this._alarmProcess(info);
         if (rslt === false) { return null}
         if (!Object.values(Utils.ACTION).includes(this?.action)) return null;
         if (this?.action===Utils.ACTION.no) return null
        return {
            delayms: 0,
            abort_previous_timer: true,
            actions: [{
                method: "alarm",
                params: {
                    _eui:this.device.eui,
                    action:this.action,
                    name:this.alarmEvent,
                    title:this.title,
                    level:this.level,
                    desc:this.desc,
                    group:this.group
                }
            }]
        }
    }
}
export class RPCHelper {
    constructor(){}
    static reset() {    return Buffer.from("CF03090101", "hex") }
    static redo()  {    return Buffer.from("CF03090102", "hex") }
    static join()  {    return Buffer.from("CF03090104", "hex") }
    static makeAlarm(
        {
            alarms,
            eui,
            name,
            action,
            group,
            title,
            desc,
            level
        }
    ){
        const ACTION = {  no:"no","new": 'new',clear: 'clear'};
        switch (action){
            case ACTION.clear: break;
            case ACTION.new:
                let alarmInfo=alarms[name]
                if (alarmInfo==undefined){break}
                if (alarmInfo.title!==title){break}
                if(alarmInfo.desc!==desc) {break}
                if (alarmInfo.level!==level) {break}
                action = ACTION.no
                break
            default: return null
        }
        if(action===ACTION.no){ return null}
        return [
            {
                sleepTimeMs: 0,
                target: eui,
                type:"alarm",
                dnMsg: {
                    action:action,
                    data:{
                        alarm_name: name,
                        notice_groups: group,
                        title: title,
                        desc:  desc,
                        level: level,
                    }
                }
            }
        ]
    }
    static paraWrite(name,type,addr,value) {
        let typeInfo=BufferTKL.getTypeInfo(type)
        let writeBuffer=Buffer.alloc(typeInfo.dataLen+4);
        writeBuffer[0]=RPCHelper.getFuncWriteCode(name)
        writeBuffer[1]=2+typeInfo.dataLen;
        writeBuffer[2]=Utils.parseVal(addr)
        writeBuffer[3]=typeInfo.dataLen;
        let valBuffer=BufferTKL.write(value,type);
        valBuffer.copy(writeBuffer,4);
        return writeBuffer;
    }
    static paraRead(name,type,addr) {
        let readBuffer=Buffer.alloc(4);
        let typeInfo=BufferTKL.getTypeInfo(type)
        readBuffer[0]=RPCHelper.getFuncReadCode(name)
        readBuffer[1]=2;
        readBuffer[2]=Utils.parseVal(addr);
        readBuffer[3]=typeInfo.dataLen;
        return readBuffer;
    }
    static getFuncWriteCode(name){
        switch(name){
            case "app": return 0xCF;
            case "cf" : return 0xC9;
            case "fw" : return 0xC1;
            case "radio": return 0xC2;
            case "ds": return 0xC4;
            case "status":return 0xc3;

            default: return 0xCF;
        }
    }
    static getFuncReadCode(name){
        switch(name){
            case "app": return 0x8F;
            case "cf" : return 0x89;
            case "fw" : return 0x81;
            case "radio": return 0x82;
            case "ds":return 0x84;
            case "status": return 0x83;
            default: return 0x8F;
        }
    }
    static arrangePara(paraInfo) {
        const paraList = {
            app: [],
            fw: [],
            cf: [],
            radio: [],
            ds:[]
        };
        Object.keys(paraInfo).forEach(key => {
            const match=key.split("_")
            let prefix=match[0]
            let regAddr=parseInt(match[1],10)
            paraList[prefix].push({
                regAddr:regAddr,
                ...paraInfo[key]
            })
        })
        Object.keys(paraList).forEach(type => {
            paraList[type].sort((a, b) => a.regAddr - b.regAddr);
        });
        return paraList;
    }
    static _preDealParams (
        {
            serverParaDef,
            paraDef,
            params
        }) {
        return {
            serverParaDef:serverParaDef,
            paraDef:paraDef,
            params:params
        }
    }
    static _postBuild (
        {
            paraDef,
            writeBuffer,
            readBuffer,
            serverPara,
            log
        }) {
        return {
            writeBuffer:writeBuffer,
            readBuffer:readBuffer,
            serverPara:serverPara,
            log:log
        }
    }
    static _freshPara({
                          funcName,
                          writeBuffer,
                          readBuffer,
                          startIndex,
                          writeIndex,
                          readIndex,
                          regBytes,
                          nextReg
                      }){
        writeBuffer[startIndex+1]=regBytes+2;
        writeBuffer[startIndex+3]=regBytes;
        readBuffer[readIndex]=RPCHelper.getFuncReadCode(funcName);
        readBuffer[readIndex+1]=2;
        readBuffer[readIndex+2]=writeBuffer[startIndex+2];
        readBuffer[readIndex+3]=regBytes;
        readIndex+=4
        startIndex=writeIndex
        writeBuffer[startIndex]=RPCHelper.getFuncWriteCode(funcName);
        writeBuffer[startIndex+2]=nextReg;
        writeIndex+=4
        return {
            startIndex:startIndex,
            writeIndex:writeIndex,
            readIndex:readIndex,
        }
    }
    static buildmodbusFrameRead(addr,code,regStart,count){
        let cmdBuffer=Buffer.from([0x01,0x06,0x03,0x04,0x05,0x06,0x07,0x08]);
        cmdBuffer[0]=Utils.parseVal(addr);
        cmdBuffer[1]=Utils.parseVal(code);
        regStart=Utils.parseVal(regStart);
        cmdBuffer.writeUInt16BE(regStart,2)
        count=Utils.parseVal(count)
        cmdBuffer.writeUInt16BE(count,4)
        let crcSum=Utils.crc16Modbus(cmdBuffer,6)
        cmdBuffer.writeUInt16LE(Number(crcSum),cmdBuffer.length-2)
        return cmdBuffer
    }
    static buildmodbusFrame10({
                                  serverParaDef,
                                  paraDef,
                                  params
                              }){
        const apara=this._preDealParams({
            serverParaDef:serverParaDef,
            paraDef:paraDef,
            params:params});
        serverParaDef=apara.serverParaDef;
        paraDef=apara.paraDef;
        params=apara.params
        let valList=[]
        let log=[]
        let serverPara={}
        if (serverParaDef==undefined) {serverParaDef=[]}
        if (paraDef==undefined) { paraDef={}}
        if (params==undefined) {params={}}
        serverParaDef.forEach(item=>{
            const para=params[item.field_name]
            if (para==undefined) { return }
            serverPara[item.field_name]=para;
        })
        let regAddr=Utils.parseVal(paraDef.paraList[0].index)
        let totalLength=0
        paraDef.paraList.forEach(item=>{
            let logItem={}
            let val=params[item.field_name]
            if (val==undefined) {
                if (item.default==undefined) { return}
                val=item.default
            }
            val=Utils.parseVal(val)
            serverPara[item.field_name]=val
            logItem.valName=item.name
            logItem.field_name=item.field_name;
            logItem.value=val
            if (item.coefficient!=undefined){
                if (typeof item.coefficient ==="number") {  val=(val/item.coefficient)|0}
            }
            log.push(logItem)
            let valBuffer=BufferTKL.write(val,item.type)
            item.valBuffer=valBuffer
            totalLength+=valBuffer.length
        })
        let writeBuffer=Buffer.alloc(totalLength+9)
        writeBuffer[0]=Utils.parseVal(paraDef.addr)
        writeBuffer[1]=0x10
        writeBuffer.writeUInt16BE(regAddr,2)
        writeBuffer.writeUInt16BE(totalLength/2,4)
        writeBuffer.writeUInt8(totalLength,6)
        let index=7
        paraDef.paraList.forEach(item=>{
            if (item.valBuffer==undefined) { return}
            item.valBuffer.copy(writeBuffer,index)
            index+=item.valBuffer.length
        })
        let crcSum=Utils.crc16Modbus(writeBuffer,writeBuffer.length-2)
        writeBuffer.writeUInt16LE(Number(crcSum),writeBuffer.length-2)
        return RPCHelper._postBuild({
            writeBuffer:writeBuffer,
            readBuffer:Buffer.alloc(0),
            serverPara:serverPara,
            log:log
        })
    }
    static buildmodbusFrame06({
                                  serverParaDef,
                                  paraDef,
                                  params
                              }){
        const apara=RPCHelper._preDealParams({
            serverParaDef:serverParaDef,
            paraDef:paraDef,
            params:params});
        serverParaDef=apara.serverParaDef;
        paraDef=apara.paraDef;
        params=apara.params
        let valList=[]
        let log=[]
        let serverPara={}
        if (serverParaDef==undefined) {serverParaDef=[]}
        if (paraDef==undefined) { paraDef={}}
        if (params==undefined) {params={}}
        serverParaDef.forEach(item=>{
            const para=params[item.field_name]
            if (para==undefined) { return }
            serverPara[item.field_name]=para;
        })
        let writeBuffer=Buffer.from([0x01,0x06,0x03,0x04,0x05,0x06,0x07,0x08]);
        writeBuffer[0]=Utils.parseVal(paraDef.addr);
        let para=paraDef.paraList[0]
        let regAddr=Utils.parseVal(para.index)
        writeBuffer.writeUInt16BE(regAddr,2)
        let logItem={}
        let val=params[para.field_name]
        if (val==undefined) {
            if (para.default==undefined) { return}
            val=para.default
        }
        val=Utils.parseVal(val)
        serverPara[para.field_name]=val
        logItem.valName=para.name
        logItem.field_name=para.field_name;
        logItem.value=val
        if (para.coefficient!=undefined){
            if (typeof para.coefficient ==="number") {  val=(val/para.coefficient)|0}
        }
        log.push(logItem)
        let valBuffer=BufferTKL.write(val,para.type)
        valBuffer.copy(writeBuffer,4)
        let crcSum=Utils.crc16Modbus(writeBuffer,6)
        writeBuffer.writeUInt16LE(Number(crcSum),writeBuffer.length-2)
        return RPCHelper._postBuild({
            writeBuffer:writeBuffer,
            readBuffer:Buffer.alloc(0),
            serverPara:serverPara,
            log:log
        })
    }
    static buildSensorFrame({
                                serverParaDef,
                                paraDef,
                                params
                            }){
        const apara=RPCHelper._preDealParams({
            serverParaDef:serverParaDef,
            paraDef:paraDef,
            params:params});
            serverParaDef=apara.serverParaDef;
            paraDef=apara.paraDef;
            params=apara.params
            if (serverParaDef==undefined) {serverParaDef=[]}
            if (paraDef==undefined) { paraDef={}}
            if (params==undefined) {params={}}
            if (paraDef.cmd_header==undefined) { return null}
            paraDef.headerBuffer=Buffer.from(paraDef.cmd_header.replaceAll(" ",""),"hex")
            let valList=[]
            let log=[]
            let serverPara={}
            serverParaDef.forEach(item=>{
                const para=params[item.field_name]
                if (para==undefined) { return }
                serverPara[item.field_name]=para;
            })
            let totalLen=0
            paraDef.paraList.forEach(para => {
                let logItem={}
                let typeInfo=BufferTKL.getTypeInfo(para.type)
                let writeBuffer=Buffer.alloc(typeInfo.dataLen);
                let val=params[para.field_name]
                if (val==undefined) {
                    if (para.default==undefined) { return}
                    val=para.default
                }
                serverPara[para.field_name]=val
                logItem.valName=para.name
                logItem.field_name=para.field_name;
                logItem.value=val
                if (para.coefficient!=undefined){
                    if (typeof para.coefficient ==="number") {  val=(val/para.coefficient)|0}
                }
                let valBuffer=BufferTKL.write(val,para.type)
                para.valBuffer=valBuffer
                totalLen+=para.valBuffer.length;
                valList.push(para)
                log.push(logItem)
            })
            let writeBuffer=Buffer.alloc(totalLen);
            let dataIndex=0
            valList.forEach(para => {   para.valBuffer.copy(writeBuffer,dataIndex);dataIndex+=para.valBuffer.length})
            return RPCHelper._postBuild({
                writeBuffer:writeBuffer,
                readBuffer:Buffer.alloc(0),
                serverPara:serverPara,
                log:log
            })
    }
    static buildFrame({
                          serverParaDef,
                          paraDef,
                          params
                      }){
        const apara=RPCHelper._preDealParams({
            serverParaDef:serverParaDef,
            paraDef:paraDef,
            params:params});
        serverParaDef=apara.serverParaDef;
        paraDef=apara.paraDef;
        params=apara.params
        let readOnly=false
        const paraList=RPCHelper.arrangePara(paraDef)
        if(serverParaDef==undefined){ serverParaDef=[]}
        if(paraDef==undefined){ paraDef={}}
        if(params==undefined){params={}}
        let serverPara={}
        if (Object.keys(params).length===0 ) {readOnly=true}
        serverParaDef.forEach(item=>{
            const para=params[item.field_name]
            if (para==undefined && !readOnly) { return }
            serverPara[item.field_name]=para;
        })
        const maxWriteBytes=180
        const maxReadBytes=50
        let writeBuffer=Buffer.alloc(maxWriteBytes);
        let readBuffer=Buffer.alloc(maxReadBytes);
        let writeIndex=4;
        let readIndex=0;
        let regBytes=0
        let nextReg=-1
        let startIndex=0;
        let totalWriteBytes=0;
        let totalReadBytes=0;
        let log=[]
        Object.entries(paraList).forEach(([funcName,list])=>{
            if (list.length===0) {return}
            list.forEach(para=>{
                let logItem={}
                let val=undefined
                let typeInfo
                if((writeIndex+8)>maxWriteBytes) return
                if((readIndex+4)>maxReadBytes)   return
                if (para?.field_name==undefined) return
                if(!readOnly){
                    if (params==undefined)           return
                    if (params[para.field_name]==undefined)  return
                    val=params[para.field_name];
                    if(val==="nc"||val===BufferTKL.INVALID_STR||val===BufferTKL.INVALID_NUM)  return
                }
                typeInfo=BufferTKL.getTypeInfo(para.type)
                if(typeInfo.type==="invalid") return
                logItem.valName=para.name
                logItem.field_name=para.field_name;
                logItem.value=val
                log.push(logItem)
                if (nextReg===-1) {
                    writeBuffer[startIndex]=RPCHelper.getFuncWriteCode(funcName)
                    nextReg=para.regAddr;
                    writeBuffer[startIndex+2]=nextReg;
                }
                if (nextReg!==para.regAddr){
                    totalWriteBytes+=4+regBytes
                    totalReadBytes+=4
                    const retVal=RPCHelper._freshPara({
                        funcName:funcName,
                        writeBuffer:writeBuffer,
                        readBuffer:readBuffer,
                        startIndex:startIndex,
                        writeIndex:writeIndex,
                        readIndex:readIndex,
                        regBytes:regBytes,
                        nextReg:para.regAddr
                    });
                    nextReg=para.regAddr;
                    startIndex=retVal.startIndex;
                    writeIndex=retVal.writeIndex;
                    readIndex=retVal.readIndex;
                    regBytes=0
                }
                //let payHandler=new BufferTKL(Buffer.alloc(0));
                let valBuffer
                if(val!=undefined){
                    if (para?.coefficient!=undefined && (typeof para?.coefficient)==="number" ){
                        val=val/para.coefficient
                    }
                    valBuffer=BufferTKL.write(val,para.type);
                    valBuffer.copy(writeBuffer,writeIndex);
                }
                writeIndex+=typeInfo.dataLen;
                nextReg+=typeInfo.dataLen;
                regBytes+=typeInfo.dataLen;
            })
            totalWriteBytes+=4+regBytes
            totalReadBytes+=4
            const retv=RPCHelper._freshPara({
                funcName:funcName,
                writeBuffer:writeBuffer,
                readBuffer:readBuffer,
                startIndex:startIndex,
                writeIndex:writeIndex,
                readIndex:readIndex,regBytes:regBytes,
                nextReg:0
            });
            nextReg=-1;
            startIndex=retv.startIndex;
            writeIndex=retv.writeIndex;
            readIndex=retv.readIndex;
            regBytes=0
        })
        if (totalWriteBytes===4) {totalWriteBytes=0;totalReadBytes=0}
        let retWBuffer=Buffer.alloc(totalWriteBytes);
        let retRBuffer=Buffer.alloc(totalReadBytes);
        writeBuffer.copy(retWBuffer,0,0,totalWriteBytes);
        readBuffer.copy(retRBuffer,0,0,totalReadBytes);
        return RPCHelper._postBuild({
            writeBuffer:retWBuffer,
            readBuffer:retRBuffer,
            serverPara:serverPara,
            log:log
        })
    }
    static cj188reader(addr,model) {
        let buffer =Buffer.from("FE FE FE FE FE 68 20 AA AA AA AA AA AA AA 03 03 81 0A 01 C0 16".replaceAll(" ",""),"hex")
        let addrBuffer=Utils.parseToBuffer(addr)
        if (addrBuffer.length!==7) { return Buffer.alloc(0)   }
        for (let i = 0; i < 7; i++) {   buffer[7+i] = addrBuffer[6-i];  }
        let modelBuffer=Utils.parseToBuffer(model);
        if(modelBuffer.length!==5) { return Buffer.alloc(0)}
        modelBuffer.copy(buffer,14,0,5);
        let crc=Utils.crcSum(buffer.slice(5,buffer.length-2),buffer.length-7)
        buffer[buffer.length-2]=crc&0x00FF
        return buffer
    }
    static modbusAction(addr,code,regAddr,regVal,valBuffer=undefined) {
        let baseBuffer=Buffer.from([0x01,0x03,0x01,0x03,0x03,0x04,0x05,0x06])
        let buffer=baseBuffer;
        if (valBuffer!=undefined) {
            buffer=Buffer.alloc(baseBuffer.length+valBuffer.length);
            baseBuffer.copy(buffer);
        }
        buffer[0]= Utils.parseVal(addr)
        buffer[1]=Utils.parseVal(code)
        const regStart=Utils.parseVal(regAddr);
        const regValue=Utils.parseVal(regVal);
        buffer.writeUInt16BE(regStart,2);
        buffer.writeUInt16BE(regValue,4);
        let crcSum=Utils.crc16Modbus(buffer,6)
        buffer.writeUInt16LE(Number(crcSum),buffer.length-2)
        return buffer
    }
    static makeMSG(
        {
            msgType,
            device,
            dnBuffer,
            type,
            port,
            confirmed,
            sleepTime,
            dnWaitms,
        }){
        if(msgType==undefined){msgType=Utils.msgType.user}
        if (msgType===Utils.msgType.swDown) {
            let cmdBuf = Buffer.alloc(5+dnBuffer.length)
            cmdBuf[0]=0xFF;cmdBuf[1]=0xAA
            dnBuffer.copy(cmdBuf,2)
            let crc=Utils.crc16Modbus(cmdBuf,dnBuffer.length+2)
            cmdBuf.writeUInt16LE(crc,dnBuffer.length+2)
            cmdBuf[cmdBuf.length-1]=0x40
            let payBuffer =Buffer.alloc(9+cmdBuf.length);
            payBuffer[0]=0xdc
            let devEuiBuffer=Buffer.from(device.eui,'hex')
            devEuiBuffer.copy(payBuffer,1)
            cmdBuf.copy(payBuffer,9);
            let sf=device?.shared_attrs?.swSF
            if (sf==undefined){ return null}
            let bw=device?.shared_attrs?.swBW.replaceAll("kHz","")
            return {
                sleepTimeMs: sleepTime==undefined?0:sleepTime,
                dnMsg:{
                version: "3.1",
                type: "data",
                if: "loraSW",
                moteeui: device.eui,
                token: new Date().getTime(),
                userdata: {
                    payload: payBuffer.toString("base64"),
                    dnWaitms: 0,
                    specify: {
                        txpk: {
                            "imme": true,
                            "tmst": 0,
                            "tmms": 0,
                            "time": "",
                            "freq": device?.shared_attrs?.swFreq / 1000000,  // shared_attrs中获取
                            "rfch": 0,
                            "powe": 22,
                            "modu": "LORA",
                            "datr": `SF${sf}BW${bw}`,   // shared_attrs中获取
                            "codr": "4/5",
                            "fdev": 0,
                            "ipol": false,
                            "prea": Utils.timingPerformanceCalc(sf, bw, device?.shared_attrs?.swPeriod),
                            "ncrc": false
                        }
                    }
                }
                }
            }
        }else if (msgType===Utils.msgType.transParent||msgType===Utils.msgType.paras||msgType===Utils.msgType.user) {
            if (msgType===Utils.msgType.transParent) { port=51
            }else if (msgType===Utils.msgType.paras) { port=214}
            return {
                    sleepTimeMs: sleepTime==undefined?0:sleepTime,
                    dnMsg: {
                        "version": "3.0",
                        "type": type==undefined?"data":type,
                        "if": "loraWAN",
                        "moteeui": device.eui,
                        "token": new Date().getTime(),
                        "userdata": {
                            "confirmed": confirmed==undefined?false:confirmed,
                            "fpend": false,
                            "port": port,
                            "TxUTCtime": "",
                            "payload": dnBuffer.toString("base64"),
                            "dnWaitms": dnWaitms==undefined?3000:dnWaitms,
                            "type":  "data",
                            "intervalms": 0
                        }
                    }
            }
        }
    }
}

```

