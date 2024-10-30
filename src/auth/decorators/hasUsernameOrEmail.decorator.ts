import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function hasUsernameOrEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "hasUsernameOrEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const obj = args.object as unknown;
          return !!(obj["username"] || obj["email"]);
        },
        defaultMessage() {
          return "Either username or email must be provided";
        },
      },
    });
  };
}
