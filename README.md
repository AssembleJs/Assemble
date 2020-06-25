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
<div id='root'>
  <hello></hello>
</div
```

# Design rules
1. Template (view) shall be render only. Minimal to no business logic should be found there.
2. The component should be testable