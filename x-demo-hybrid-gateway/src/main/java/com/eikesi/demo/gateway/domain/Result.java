package com.eikesi.demo.gateway.domain;

//import com.mpush.tools.Jsons;

/**
 *
 * @author hedongyang
 */
public class Result<T> {
    private int code;
    private T data;
    private String msg;
    private boolean success;

    public Result(T data) {
        this.data = data;
        this.code = 200;
        this.success = true;
    }

    public Result(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public Result setCode(int code) {
        this.code = code;
        return this;
    }

    public T getData() {
        return data;
    }

    public Result setData(T data) {
        this.data = data;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public Result setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public boolean isSuccess() {
        return success;
    }

    public Result setSuccess(boolean success) {
        this.success = success;
        return this;
    }

    @Override
    public String toString() {

        return "";
//            Jsons.toJson(this);
    }
}
