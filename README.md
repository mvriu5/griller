# Griller

A fully customizable React Toast Component

## Installation

Install the package using npm:

```bash
npm install griller
```

## Usage

### Wrap your app with the Toaster component

First, you need to wrap your application with the `Toaster` component. This component will manage the state and positioning of your toasts.

```jsx
import Toaster from "griller";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster>
          {children}
        </Toaster>
      </body>
    </html>
  );
}
```

### Creating toasts

To create a toast, use the `useToast` hook in your component:

```jsx
import {useToast} from "griller";

const { addToast } = useToast();

<button onClick={() => 
  addToast({title: 'Toast Notification'})
}>
  Show Toast
</button>
```

## Features

- ✨ Fully customizable appearance
- 🌐 Multiple positioning options
- ⏱️ Configurable duration
- 🌓 Light and dark themes
- 🔘 Close and action buttons
- 📚 Stacking and expanding layouts

## API

### Toaster Props

| Prop | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `children` | `ReactNode` | - | The content to be wrapped by the Toaster |
| `layout` | `"stack" \| "expand"` | `"stack"` | How toasts are displayed |
| `scaleDecrease` | `number` | `0.03` | Scale decrease for each toast in stack layout |

### Toast Props

| Prop | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `title` | `string` | - | Toast title (required) |
| `subtitle` | `string` | - | Toast subtitle |
| `icon` | `ReactNode` | - | Icon to display |
| `position` | `"tr" \| "tl" \| "tc" \| "br" \| "bl" \| "bc"` | `"br"` | Toast position |
| `theme` | `"light" \| "dark"` | `"light"` | Toast theme |
| `closeButton` | `boolean` | `false` | Show close button |
| `actionButton` | `boolean` | `false` | Show action button |
| `onAction` | `() => void` | - | Action button callback |
| `actionButtonText` | `string` | `"Undo"` | Action button text |
| `duration` | `number` | `3000` | Toast duration in ms |

## Customization

Griller allows for extensive customization through custom classnames:

- `titleClassname`
- `subtitleClassname`
- `iconClassname`
- `closeClassname`
- `closeDivClassname`
- `motionClassname`
- `actionButtonClassname`

## Examples

### Basic Toast

```jsx
addToast({
  title: 'Hello World',
  subtitle: 'This is a basic toast',
  position: 'tr',
  duration: 5000
});
```

### Toast with Action

```jsx
addToast({
  title: 'File Deleted',
  subtitle: 'Your file has been permanently deleted',
  actionButton: true,
  actionButtonText: 'Undo',
  onAction: () => {
    console.log('Undo delete');
  }
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you have any questions or need help integrating Griller into your project, please open an issue on the GitHub repository.

---

Made with ❤️ by [mvriu5](https://x.com/mvriu5)