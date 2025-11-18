export function validate<T extends (...args: any[]) => any>(
  target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {

  const originalMethod = descriptor.value!;

  descriptor.value = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    for (const arg of args) {
      if (
        arg === undefined ||
        arg === null ||
        (typeof arg === "string" && arg.trim() === "")
      ) {
        console.error(`❌ Erreur: argument invalide dans ${String(propertyKey)}()`);
        return;
      }
    }

    return originalMethod.apply(this, args);
  } as T;

  return descriptor;
}

export function timestamp(target: unknown, key: string, descriptor: PropertyDescriptor) {
 const originalMethod = descriptor.value;

 descriptor.value = function (...args: unknown[]) {
 const now = new Date().toLocaleTimeString('fr-FR');
 console.log(`[TIMESTAMP] ${now} - Appel de ${key}`);
 return originalMethod.apply(this, args);
 };

 return descriptor;
}
