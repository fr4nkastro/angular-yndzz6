# angular-yndzz6

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-yndzz6)

# Creación de componentes
`ng generate component product-alerts`

# Directivas Angular 
## If
```
*ngIf="product && product.price > 700"
```
[product-alerts.component.html](angular-yndzz6\src\app\product-alerts\product-alerts.component.html)

## For

```
*ngFor= "let item of items"
```

# Creación de Componentes
```
ng generate component component_name
```

# Eventos entre componentes
## Recibir datos de componente padre
El componente hijo debe importar para recibir datos lo siguiente:[product-alerts.component.ts](src\app\product-alerts\product-alerts.component.ts)

```
import { Component, OnInit, Input} from '@angular/core';
```
y definir el parámetro de entrada: 
```
 @Input() parametro!: tipoParametro;
```
desde el componente padre debe inicializarse el componente: [product-list.component.html](src\app\product-list\product-list.component.html)
```
    <app-product-alerts
        [product]="product">  
  </app-product-alerts>
```
## Enviar un evento hacia un componente padre
En el componente hijo se debe importar:
```
import { Component, Output, EventEmitter } from '@angular/core';
```
y definir el parámetro de salida tipo EventEmitter
```
  @Output() notify = new EventEmitter();
```
disparar el evento en el componente hijo: [product-alerts.component.html](src\app\product-alerts\product-alerts.component.html)
```
<button type="button" (click)="notify.emit()">
        Notify Me</button>
```
asociar el evento a un método desde el componente padre: [product-list.component.html](src/app/product-list/product-list.component.html)
```
    <app-product-alerts
        (notify)="onNotify()">
  </app-product-alerts>
```
# Extracción de parámetros segun URI
Para llamar al componente desde la URL usar routerLink: [product-list.component.html](src/app/product-list/product-list.component.html)
```
 <a  ...
        [routerLink]="['/products', product.id]">
        ...
</a>
```
Para poder extraer los parámetros de la URL hay que exportar:
[product-details.component.ts](src/app/product-details/product-details.component.ts)
```
import { ActivatedRoute } from '@angular/router';
```
Inyectar la clase al constructor para usarla:
```
constructor(private route: ActivatedRoute) { }
```
Obtener el parámetro:
```
  const routeParams = this.route.snapshot.paramMap;
  const productIdFromRoute = Number(routeParams.get('productId'));
```

# Creación de Un Servicio
`ng generate service name`  
Una vez creado se puede importar: [product-details.component.ts](src/app/product-details/product-details.component.ts)
```
import { CartService } from '../cart.service';
```
y para ser usado se inyecta al constructor:
```
constructor(... private cartService: CartService ...) { }
```

# Cliente HTTP Get Json
Importar el módulo HTTP en la aplicación: [app.module.ts](src/app/app.module.ts)
```
import { HttpClientModule } from '@angular/common/http';
```
Hacer accesible globalmente:
```
..
@NgModule({
  imports: [
    ...
    HttpClientModule,
    ...
  ]
}
```

Uso del módulo HTTP en el servicio: [cart.service.ts](src/app/cart.service.ts)
```
import { HttpClient } from '@angular/common/http';
```
Inyectar la clase en el constructor:
```
constructor(private http: HttpClient) { }
```
Hacer petición del recurso através de HTTP:
```
return this.http.get<{type: string, price: number}[]>('/assets/shipping.json')
```
Implementar el servicio en un componente...

# Creación de Formularios
Importar la clase abstracta para formularios: [cart.component.ts](src/app/cart/cart.component.ts)
```
import { FormBuilder } from '@angular/forms';
```

Inyectar el servicio en el constructor:
```
constructor(... private formBuilder: FormBuilder) { }
```
Crear el parámetro FormGroup de los campos del formulario:
```
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''});
```
Método del evento onSubmit:
```
onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
```
Crear la interfaz del formulario: [cart.component.html](src/app/cart/cart.component.html)
```
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" formControlName="name">
  </div>

  <div>
    <label for="address">Address</label>
    <input type="text" id="address" formControlName="address">
  </div>
  <button class="button" type="submit"> Purchase</button>

</form>
```