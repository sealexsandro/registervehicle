package com.wipro.registervehicle.model.enums;

public enum UserType {

	ADMIN(0), CUSTOMER(1);

	private Integer code;

	private UserType(int value) {
		this.code = value;
	}

	public Integer getCode() {
		return this.code;
	}

	public static UserType valueOf(int value) {
		for (UserType code : UserType.values()) {
			if (code.getCode() == value) {
				return code;
			}
		}
		throw new IllegalArgumentException("Codigo invalido");
	}
}
