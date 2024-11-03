import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/**
 * A custom validation decorator that checks if either a username or an email is provided.
 * This is useful for scenarios where one of the two fields is required for user login or registration.
 *
 * @function hasUsernameOrEmail
 * @param {ValidationOptions} [validationOptions] - Optional validation options to customize the error message and behavior.
 * @returns {Function} A decorator function that applies the validation logic to the specified property.
 */
export function hasUsernameOrEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "hasUsernameOrEmail",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        /**
         * Validates the object to ensure that either username or email is present.
         *
         * @method validate
         * @param {unknown} value - The value of the property being validated (not used in this validation).
         * @param {ValidationArguments} args - Contains the object being validated and the property name.
         * @returns {boolean} Returns true if either username or email is provided; otherwise false.
         */
        validate(value: unknown, args: ValidationArguments): boolean {
          const obj = args.object as { username?: string; email?: string };
          return !!(obj.username || obj.email);
        },
        /**
         * Provides the default error message when validation fails.
         *
         * @method defaultMessage
         * @returns {string} The default error message.
         */
        defaultMessage(): string {
          return "Either username or email must be provided.";
        },
      },
    });
  };
}
