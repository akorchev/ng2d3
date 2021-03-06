import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ReflectiveInjector,
  ViewContainerRef,
  ResolvedReflectiveProvider,
  Type
} from '@angular/core';

@Injectable()
export class InjectionService {

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  getRootViewContainerRef(): ViewContainerRef {
    // The only way for now (by @mhevery)
    // https://github.com/angular/angular/issues/6446
    // https://github.com/angular/angular/issues/9293
    // see: https://github.com/valor-software/ng2-bootstrap/components/utils/components-helper.service.ts
    const comps = this.applicationRef.components;

    if(!comps.length) {
      throw new Error(`ApplicationRef instance not found`);
    }

    return this.applicationRef['_rootComponents'][0]['_hostElement'].vcRef;
  }

  appendNextToLocation<T>(
    componentClass: Type<T>,
    location: ViewContainerRef,
    providers?: ResolvedReflectiveProvider[]): ComponentRef<T> {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let parentInjector = location.parentInjector;
    let childInjector = parentInjector;

    if (providers && providers.length) {
      childInjector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
    }

    return location.createComponent(componentFactory, location.length, childInjector);
  }

  appendNextToRoot<T>(
    componentClass: Type<T>,
    componentOptionsClass?: any,
    options?: any): ComponentRef<T> {

    let providers;
    let location = this.getRootViewContainerRef();

    if(componentOptionsClass && options) {
      providers = ReflectiveInjector.resolve([
       { provide: componentOptionsClass, useValue: options }
     ]);
    }

    return this.appendNextToLocation(componentClass, location, providers);
  }
}
