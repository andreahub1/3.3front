import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearch {

  busqueda = new FormControl('');
  categoria = new FormControl('Todas');

  precioMin = new FormControl(0);
  precioMax = new FormControl(20000);

  productos = [
    // Tecnología
    { nombre: 'Audífonos Bluetooth', categoria: 'Tecnología', precio: 850, descripcion: 'Sonido de alta calidad.', imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { nombre: 'Laptop Lenovo', categoria: 'Tecnología', precio: 12500, descripcion: 'Laptop para trabajo y estudio.', imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500' },
    { nombre: 'Smartphone Samsung', categoria: 'Tecnología', precio: 9500, descripcion: 'Teléfono inteligente.', imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500' },
    { nombre: 'Teclado Mecánico', categoria: 'Tecnología', precio: 1200, descripcion: 'Teclado para computadora.', imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
    { nombre: 'Mouse Gamer', categoria: 'Tecnología', precio: 650, descripcion: 'Mouse de alta precisión.', imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500' },
    { nombre: 'Monitor HD', categoria: 'Tecnología', precio: 4200, descripcion: 'Monitor de alta resolución.', imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
    { nombre: 'Bocina Bluetooth', categoria: 'Tecnología', precio: 1100, descripcion: 'Bocina portátil.', imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500' },
    { nombre: 'Smartwatch', categoria: 'Tecnología', precio: 1800, descripcion: 'Reloj inteligente.', imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },

    // Ropa
    { nombre: 'Playera Casual', categoria: 'Ropa', precio: 250, descripcion: 'Playera cómoda para diario.', imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
    { nombre: 'Sudadera', categoria: 'Ropa', precio: 650, descripcion: 'Sudadera de algodón.', imagen: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
    { nombre: 'Tenis Deportivos', categoria: 'Ropa', precio: 1400, descripcion: 'Calzado cómodo.', imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { nombre: 'Gorra', categoria: 'Ropa', precio: 300, descripcion: 'Gorra ajustable.', imagen: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500' },
    { nombre: 'Mochila', categoria: 'Ropa', precio: 750, descripcion: 'Mochila para uso diario.', imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },

    // Hogar
    { nombre: 'Lámpara de Mesa', categoria: 'Hogar', precio: 500, descripcion: 'Iluminación para tu habitación.', imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500' },
    { nombre: 'Silla Moderna', categoria: 'Hogar', precio: 2200, descripcion: 'Silla para oficina o estudio.', imagen: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500' },
    { nombre: 'Cafetera', categoria: 'Hogar', precio: 900, descripcion: 'Prepara café fácilmente.', imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500' },
    { nombre: 'Reloj de Pared', categoria: 'Hogar', precio: 400, descripcion: 'Diseño moderno.', imagen: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500' },

    // Deportes
    { nombre: 'Balón de Fútbol', categoria: 'Deportes', precio: 450, descripcion: 'Balón para entrenamiento.', imagen: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500' },
    { nombre: 'Mancuernas', categoria: 'Deportes', precio: 800, descripcion: 'Equipo para ejercicio.', imagen: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500' },
    { nombre: 'Bicicleta', categoria: 'Deportes', precio: 6500, descripcion: 'Bicicleta para exteriores.', imagen: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500' }
  ];

  productosFiltrados$ = combineLatest([
    this.busqueda.valueChanges.pipe(
      startWith(this.busqueda.value),
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.categoria.valueChanges.pipe(
      startWith(this.categoria.value)
    ),
    this.precioMin.valueChanges.pipe(
      startWith(this.precioMin.value)
    ),
    this.precioMax.valueChanges.pipe(
      startWith(this.precioMax.value)
    )
  ]).pipe(
    map(([busqueda, categoria, precioMin, precioMax]) => {
      return this.productos.filter(producto => {

        const coincideNombre = producto.nombre
          .toLowerCase()
          .includes((busqueda || '').toLowerCase());

        const coincideCategoria =
          categoria === 'Todas' || producto.categoria === categoria;

        const coincidePrecio =
          producto.precio >= (precioMin ?? 0) &&
          producto.precio <= (precioMax ?? 20000);

        return coincideNombre && coincideCategoria && coincidePrecio;
      });
    })
  );

  cambiarPrecioMin(event: Event) {
    const valor = Number((event.target as HTMLInputElement).value);

    if (valor <= this.precioMax.value!) {
      this.precioMin.setValue(valor);
    }
  }

  cambiarPrecioMax(event: Event) {
    const valor = Number((event.target as HTMLInputElement).value);

    if (valor >= this.precioMin.value!) {
      this.precioMax.setValue(valor);
    }
  }

  categorias = [
    { nombre: 'Todas', cantidad: 20 },
    { nombre: 'Tecnología', cantidad: 8 },
    { nombre: 'Ropa', cantidad: 5 },
    { nombre: 'Hogar', cantidad: 4 },
    { nombre: 'Deportes', cantidad: 3 }
  ];
}