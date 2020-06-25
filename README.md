# Assemble
An enterprise grade, minimal javascript framework

# Getting Started
- Clone the repo
- Run `yarn install`
- Run `yarn start`

# Creating a new Component

Typescript file:
```typescript
@Component({
  selector: 'hello',
  template: 'Hello, {{ name }}'
})
class Hello {
  name = 'World'
}
```

Html file:

```html
<hello></hello>
```