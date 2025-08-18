# [Classicy](https://classicy.ing)

##### Previously Platinum

A UI framework using native CSS/JS replications of the Mac OS 8 interface components.

[Just curious? Visit our website to learn more.](https://classicy.ing)

## Demo

### [See a demo here!](https://robbiebyrd.github.io/classicy/)

## Running Locally

The Classicy components are created in React. For demo purposes, we provide a very basic Next.js app for testing.

You will need Node.js v20.11 or higher. You will also need the `yarn` package manager.

1. Clone this repo to your local computer and change into the folder
    ```bash
    git clone https://github.com/robbiebyrd/classicy
    cd classicy
    ```

2. Install the necessary dependencies.
    ```bash
    yarn
    ```

3. Modify the .env file to the below and make sure it is loaded.
   '''
   NEXT_PUBLIC_BASE_PATH=""
   '''

4. Start the Classicy Destkop server in development mode.
    ```bash
    yarn dev
    ```

4. Open your web browser to [http://localhost:3000](http://localhost:3000) .

## Acknowledgements

- New Dawn by [`Nathanael Gentry`](https://github.com/npjg)
- Scrollbars of the Classic Mac OS by [`Jessica Stokes (@ticky)`](https://github.com/ticky)
- `after-dark-css`, for the basic System 7.1.1 interface
- [`flyer`](https://www.masswerk.at/flyer/), for further inspiration
- Robin Casady, for releasing ChicagoFLF into the public domain
- Apple, who maintains the copyright on the background patterns, icons and interface components

## Features

*Legend*

|          |                     |                     |
|:--------:|:-------------------:|:-------------------:|
|    ✅     |         ℹ️          |         ⚠️          |
| Complete | Partially complete. |    Experimental     |
|          |                     | *Subject to change* |

- Desktop
    - ℹ️ The ubiquitous Finder
    - Menubar
        - ✅ System Menu
        - ✅ App Switcher
        - ✅ Widgets
            - ✅ Date/Time
            - ✅ Sound
    - Icons
        - ✅ App Shortcuts
        - ✅ Cleanup
        - Arrange By…
- Sounds
    - ✅ Sound Provider
    - ✅ Load sound theme from JSON
    - ✅ Audio Sprites support
    - ℹ️ Sound Manager Control Panel
        - ℹ️ Sound Event Handler
            - ✅ Event dispatcher/player
            - ℹ️ Automatic event intercept and play for known events (map audio sprites to events)
- Appearance Manager Control Panel (Theme Manager)
    - ✅ Appearance Manager Control Panel
    - ✅ System
        - ✅ Load theme from JSON
        - ✅ System events for modifying theme
    - UI
        - ✅ Typography settings
        - ✅ Measurement settings
        - ✅ Desktop settings
        - ✅ System colors
        - ✅ Configurable color variables
    - ✅ Color Theme-able components
- App Template
    - ⚠️ App Context/Event Handler
    - App Switcher
- Window
    - Controls
        - ✅ Zoom
        - ✅ Resize
        - ✅ Collapse
        - ✅ Close
        - Placard
        - ✅ Header
    - Dialog
        - Modal
            - Dialog
                - ✅ Movable
                - ✅ Non-movable
            - Alert
                - ✅ Movable
                - Non-movable
        - ✅ Modeless
    - ✅ Standard
- System
    - ✅ File System
        - ✅ Integrated into Finder.app
- UI Components
    - ✅ Text Input
    - ✅ Text Area
    - ✅ Button
    - ✅ Tabs
    - ✅ Radio Button
    - ✅ Drop-down menu
    - Multi-select menu
    - ✅ Checkbox
    - ✅ Bevel Button
    - Slider
    - Spinner
    - ✅ Date Picker
    - ✅ Time Picker
    - ✅ Expandable (Disclosure)
    - ✅ Fieldset
    - ✅ Separator
    - ✅ Progress
    - Menu
        - Contextual Menu
        - Submenu
    - Gallery Picker (Slider)
    - Color Picker

## Component Organization

* `<ClassicyDesktopProvider>`
    * `<ClassicyDesktop>`
        * `<ClassicyDesktopMenuBar>`
        * `<ClassicyDesktopIcon?>`
        * `<YourClassicyApp>`
            * `<ClassicyAppContext>`
                * `<ClassicyApp>`
                    * `<ClassicyWindow?>`
                        * `<ClassicyUIControls?>`
                        * `<OtherReactNodes?>`

## Events

* `ClassicyDesktop`
    * `ClassicyDesktopClick`
    * `ClassicyDesktopDrag`

* `ClassicySoundPlay`
    * `ClassicyAlertSosumi`
    * `ClassicyAlertWildEep`
    * `ClassicyAlertndigo`
    * `ClassicyBeep`
    * `ClassicyBoot`
    * `ClassicyButtonClickDown`
    * `ClassicyButtonClickUp`
    * `ClassicyInputRadioClickDown`
    * `ClassicyInputRadioClickUp`
    * `ClassicyMenuClose`
    * `ClassicyMenuItemClick`
    * `ClassicyMenuItemHover`
    * `ClassicyMenuOpen`
    * `ClassicyWindowClose`
    * `ClassicyWindowCollapse`
    * `ClassicyWindowControlClickDown`
    * `ClassicyWindowControlClickUp`
    * `ClassicyWindowExpand`
    * `ClassicyWindowFocus`
    * `ClassicyWindowMoveIdle`
    * `ClassicyWindowMoveMoving`
    * `ClassicyWindowMoveStop`
    * `ClassicyWindowOpen`
    * `ClassicyWindowResizeIdle`
    * `ClassicyWindowResizeResizing`
    * `ClassicyWindowResizeStop`
    * `ClassicyWindowZoomMaximize`
    * `ClassicyWindowZoomMinimize`

* `ClassicyDesktopIcon`
    * `ClassicyDesktopClick`
    * `ClassicyDesktopAltClick`
    * `ClassicyDesktopDoubleClick`
    * `ClassicyDesktopDrag`

* `ClassicyApp`
    * `ClassicyAppOpen`
    * `ClassicyAppClose`
    * `ClassicyAppHide`
    * `ClassicyAppFocus`

* `ClassicyWindow`
    * `ClassicyWindowOpen`
    * `ClassicyWindowClose`
    * `ClassicyWindowZoom`
    * `ClassicyWindowCollapse`
    * `ClassicyWindowResize`
    * `ClassicyWindowDrag`
    * `ClassicyWindowFocus`
    * `ClassicyWindowContentScroll`
    * `ClassicyWindowContentClick`

* `ClassicyMenu`
    * `ClassicyMenuHover`
    * `ClassicyMenuClick`
    * `ClassicyMenuChange`



### Creating the React components

It had all the components that I thought I would need. I made a list, checked against the HIG to see if I'd missed
anything, and came up with the following:

- Desktop
    - Desktop Menu Bar
        - Images
    - Context Menu
        - Window
            - Regular Window
            - Modal Window
            - Title Bar
            - Control Boxes
                - Close
                - Zoom
                - Collapse
                - Resize
            - Scoll Bars
            - UI Components
                - Button
                - Dropdown Menu
                    - Long variant, with values
                    - Short variant, with no values
                - Checkbox
                - Radio button
                - Fieldset (control group)
                - Progress
                - Text Input


I sketched out the component structure as follows:

- `<ClassicyDesktop>`
    - `<ClassicyDesktopContext>`
        - `<AClassicyApp>`: A Custom app
            - `<AppContextProvider>`
                - `<ClassicyDesktopIcon>`
                - `<ClassicyWindow>`
                    - `<ClassicyUIComponents?>`
                    - `<AnyOtherReactComponent>`

I deliberated a lot over the nesting of components, and in the end hoped that this order would allow ClassicyApps to be
more easily packaged. I also hoped that putting a Window in charge of its own contents would not turn out to be a
mistake.

> A React Context is a data structure that allows sharing state between components.

I also decided ultimately to wire up any ClassicyUIComponent that accepted some kind of input directly to the
AppContext. This way, the app itself could keep an eye on the values of each component within each window, allowing one
window to change the contents of another.

Finally, I decided to insert a ClassicyDesktopContext to hold all the system settings; specifically, I needed a place
to store the theme settings. While I eventually decided to use CSS variables to set theme colors throughout the entire
app, I still needed a place to stash Sound file resources, desktop background settings and font selections for the
theme. This allows me to change the theme from inside an App, and have that change copied over to all over Classicy
Apps, Windows and UI Components. In fact, the app Appearance Manager that is included in the Classicy React project is
simply a regular app that reports an Event when the theme is selected from a dropdown. I'll talk more about events
later.

```json
  {
  "id": "bondi",
  "name": "Bondi",
  "color": {
    "outline": "#393939",
    "select": "#DDD",
    "highlight": "#AAA",
    "window": {
      "border": "#000",
      "borderOutset": "#FFF",
      "borderInset": "#CCC",
      "frame": "#CCC",
      "title": "#000",
      "document": "#FFF"
    },
    "black": "#000",
    "white": "#FFF",
    "alert": "#ffFF00",
    "error": "#ff0000",
    "system": [
      "#EEE",
      "#DDD",
      "#CCC",
      "#AAA",
      "#808080",
      "#393939",
      "#202020"
    ],
    "theme": [
      "#C8F8E9",
      "#67DACD",
      "#5AB9AD",
      "#308F91",
      "#0D716A",
      "#00454B",
      "#003333"
    ]
  },
  "sound": {
    "file": "/sounds/platinum/platinum.json",
    "disabled": []
  },
  "typography": {
    "ui": "\"Charcoal\", \"ChicagoFLF\", \"Geneva\", sans-serif",
    "uiSize": "14px",
    "header": "\"AppleGaramond\", serif",
    "headerSize": "22px",
    "body": "\"Geneva\", serif",
    "bodySize": "14px"
  },
  "measurements": {
    "window": {
      "borderSize": "1px",
      "controlSize": "12px",
      "paddingSize": "6px",
      "scrollbarSize": "20px"
    }
  },
  "desktop": {
    "iconSize": "48px",
    "iconFontSize": "12px",
    "backgroundImage": "url(/img/wallpapers/waves_bondi.png)",
    "backgroundColor": "#00454B",
    "repeat": "repeat",
    "position": "center",
    "size": "auto"
  }
}

```

*The JSON contents of the `Bondi` theme.*


| Name             | Type  | Required | Description                                                                                                                                                 |
|------------------|-------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id               | str   | Yes      | The ID of the window                                                                                                                                        |
| appId            | str   | Yes      | The ID of the ClassicyApp that the window belongs to. All windows must belong to an App (though, not all Apps must have Windows).                           |
| title            | str   | No       | The Title Text to display in the windows's Title bar.                                                                                                       |
| icon             | str   | No       | The Icon to show in the Title bar.                                                                                                                          |
| hidden           | bool  | No       | Whether the window is hidden or not.                                                                                                                        |
| closable         | bool  | No       | Whether the window can be closed by clicking the Close button. When false, the Close box is hidden.                                                         |
| zoomable         | bool  | No       | Whether the window can be zoomed by clicking the Zoom button. When false, the Zoom box is hidden.                                                           |
| collapsable      | bool  | No       | Whether the window can be collapsed and expanded by clicking the Collapse button. When false, the Collapse box is hidden.                                   |
| resizable        | bool  | No       | Whether the window can be resized by clicking and dragging the Window resizer in the bottom-right of the window.                                            |
| scrollable       | bool  | No       | Whether the window's inner contents can be scrolled, or whether any overflow should be hidden.                                                              |
| modalWindow      | bool  | No       | Whether the window is Modal or not. Modal windows have a different inner content style.                                                                     |
| initialSize      | [w,h] | No       | The initial size of the window.                                                                                                                             |
| initialPosition  | [x,y] | No       | The initial screen position of the window.                                                                                                                  |
| appMenu          | []    | No       | When a window takes focus, it can change the contents of the Desktop Menu. This holds any custom menu items that should be visible when the window is open. |
| contextMenuItems | []    | No       | When a user right-clicks within a window, a Context Menu is shown. This holds the contents of that context menu.                                            |
| children         | any   | No       | Any contents for the inside of the window.                                                                                                                  |

I implemented a simple state for the ClassicyWindow component, and added it in. I then connected all the props in and
then realized while what I had was functional, it was really ugly. It was time to get to the difficult work of CSS
theming.

### Applying the Theme

As I started zooming into the PDF version of the Apple HIG, I noticed patterns start to emerge: all the window borders,
both out and inset, were consistent throughout. The width of borders were consistent, as were the padding between
elements. It was also easy to see that, where there were variations, they were slight--and they were also repeated. Well
done, Apple.

I was able to make a list of common sizes, and a hierarchy of element boders using the CSS properties `border`
and `box-shadow`.

![windowoutline.png](https://res.craft.do/user/full/f6bf69d9-c199-b5e2-2561-223aac7866f6/doc/21B84071-5847-4B88-BE10-7257963581FF/355653FD-3A9C-4D2C-8743-38D063FBA5FB_2/GDaK93gDDcvcqcH9Ut5xjAl5VcFxH11uLrjjYUgec6Az/windowoutline.png)

An overview of the outlines that make up a ClassicyWindow.

I notcied that there were some pretty hard-and-fast measurements: borders were 1px, and the padding between the outer
window chrome and the inner window contents was 4px. This same 4px spacing also showed up in the title bar: the spacing
between the top of the window and the components of the Window's title bar are 4px.

I picked a few sensible defaults for things like Desktop Icon sizes and UI font sizes, and created a bunch of CSS
Variables to hold all the values. Then, once I was happy with the default look-and-feel, I took the colors I had
extracted from the Appearance theme file earlier, and was able to easily switch between color themes by updating the CSS
variables. It was so easy I thought maybe I had done something wrong at first, but it actually worked. I was even able
to change fonts for the UI with just a property update.

The measurements were harder. In some places I had used `em` values; in others, I had used `px`. This mish-mash of
measurements really made weird visual errors hard to track down. Finally, I decided on a set of arithmetic standards
based on the window border, window padding size and window control size. Using these three measurements and the
CSS `calc()` function, I was able to get a tighter grip on the visual style. It also made things so much easier as I
continued to add components, as I had already established a good measurement system and ratios that were consistent
throughout.

I created a shared SASS module that created CSS classes for all the themes, so that updating the ClassicyDesktop
component's class name would update all the child components. I created a SASS array of color values for each color
theme; adding additional color or system themes is as easy as creating a new class and changing a few input variables to
the `appearanceManagerTheme` mixin function. Then, any Component needs only use CSS variables in their styling to take
advantage of theme changes. A few helper functions for things like borders and bevels are also provided.

A few of the UI elements were tougher; the Platinum Windows's Control boxes, like the close and zoom button, have a
pixelated style I wanted to replicate. I could not find a way to do this with only CSS, so instead I created an SVG and
use it as an overlay to create the same effect.

![Image.tiff.png](https://res.craft.do/user/full/f6bf69d9-c199-b5e2-2561-223aac7866f6/AED3D897-5BB9-4526-BEF3-25354973B35C_2/K64dTSwsMEzNvfWTDCdWSIgBvgal0L6byIoRtIDuflkz/Image.tiff.png)

The Platinum theme Windows control buttons, like the close button, have a unique, pixel-gradient overlay.

A few other elements, like the collapse and zoom buttons, also required an extra SVG overlay. Thankfully, using the CSS
psuedo-selectors `::before` and `::after` , I was able to overlay both the pixelated gradient and the inner control SVG.

Quite possibly, the component I am most proud of is the HTML Progress element. Using the entire specture of seven colors
in each color theme, I was able to nearly replicate one of the few beautiful parts of the Mac OS 8 Platinum experience.
Compared to the progress indicators in System 7, this splash of color was a generational leap. It feels silly to type
today, but it was true at the time.

### Wiring it together

Now that I was able to make individual windows and components, I needed a way for the entire system to interact. A
multi-window environment is not very user-friendly if the Windows are fighting for control and focus. In fact, it took
me quite a while to wrap my head around all the things that were involved in basic window management.

I needed to provide some basic system settings to all components: specifically, the color and sound themes. I also
needed to provide a place to store which ClassicyApp was active, which Window was active, and a place to store all the
items in the Desktop Menu Bar, which will be shared by all Apps and Windows.

I chose to let the ClassicyDesktop component control which Window was currently active, and ClassicyApps and Windows
could request a window become active by firing an event. At first, I fell unwittingly into a hole known as "prop
drilling" by others, by passing large data structures as props through components. Most of the time, I was only passing
them so they would be available to child components. At first, this kind of made sense, because as a backend developer,
the idea of dependency injection is a real, but often ignored, pain. After too long of this, it became clear that I had
this all wrong. I took a week away from the project, and started doing every tutorial I could find dealing with complex
state and event reducers in React.

After my break and fresh insight, I rewrote the ClassicyDesktop component to use a shared context and an event reducer.
I then did the same thing to the ClassicyWindow component. I typed up a list of events I would need to react to.

| EventName                     | Description                                                                                                                                                                                                                                          |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ClassicyWindowOpen`          | Fired when a window opens.                                                                                                                                                                                                                           |
| `ClassicyWindowClose`         | Fired when a window closes.                                                                                                                                                                                                                          |
| `ClassicyWindowResize`        | Fired when a user clicks the resizer (RSZR) element in the bottom-right corner. No resizing actually begins until the `ClassicyWindowMove` method is fired.                                                                                          |
| `ClassicyWindowDrag`          | Fired when a user clicks on the Window Title. No dragging of the window actually occurs until the `ClassicyWindowMove` method is fired.                                                                                                              |
| `ClassicyWindowMove`          | Fired when the mouse is moving within the window. If the `ClassicyWindowDrag` or `ClassicyWindowResize` events have been fired, then moving the window will either drag or resize the move in response to the mouse's movement.                      |
| `ClassicyWindowStop`          | Fired when either a `ClassicyWindowResize` or `ClassicyWindowDrag` has finished.                                                                                                                                                                     |
| `ClassicyWindowFocus`         | Fired when the user clicks within the area of the window. Clicking the title bar, contents or outside frame of a window will cause it to become the highlighted window, and all other windows will lose focus.                                       |
| `ClassicyWindowContentScroll` | Fired when a user scrolls the window contents container.                                                                                                                                                                                             |
| `ClassicyWindowContentClick`  | Fired when a user clicks within the window contents area.                                                                                                                                                                                            |
| `ClassicyWindowContextMenu`   | Fired when a user right-clicks within a window. Each window controls the contents of its own context menu.                                                                                                                                           |
| `ClassicyWindowExpand`        | Fired when a user clicks the CLPSE button and the window is currently collapsed. Collapsing makes the height of the window only as tall as the Title bar, and hides the contents of the window. It is the MacOS 8 equivalent of "minizing" a window. |
| `ClassicyWindowCollapse`      | Fired when a user clicks the CLPSE button and the window is currently in an expanded state.                                                                                                                                                          |
| `ClassicyWindowZoom`          | Fired when a user clicks the ZOOM button. Clicking the Zoom button makes the current window as large as the current viewport. Clicking the ZOOM button again will return the window to its previous position.                                        |

I also re-wrote the event handlers I had written for the Windows's control boxes, and took advantage of the event
dispatcher.

Next, I decided that the ClassicyDesktop could also control Opening and Closing ClassicyApps, which would in turn
control its own windows. Opening a ClassicyApp also adds an entry to the `appSwitcherMenu` array, which keeps track of
all the open apps and displays them in the Appication Switcher, the top-right component of the Desktop Menu.

One of the other neat quirks of MacOS Classic and MacOS today is the top Desktop Menu Bar, whose contents changes based
on the current, active window. The Menu Bar is considered contextually relevant to the active window the user is
interacting with. This is in contrast to Windows TaskBar, which is contextually independent.

I decided to let windows attach a MenuBar to the event they fire when they become active, and let the ClassicyDesktop
and ClassicyDesktopMenuBar components use that state to render the menu. This took some time for me to wrap my head
around, being somewhat a newbie again to React, but eventually it became so elegant that I have almost taken it for
granted.

I abstracted out as much even logic as possible into the deepest component I could. I knew that ClassicyWindow events
might need to bubble up to the ClassicyDesktop, but I also knew many ClassicyWindow events would need to go that high,
and could stay within the Window itself. While the events are structuarlly the same, I decided to setup discrete event
dispatchers for components. I knew this means I would have to make two calls for some events.

For instance, to handle a `ClassicyWindowFocus` event, first I need to notify the actual window it has been focused.
This is important so that it could notify the windows' children of a change, and make any visual updates necessary, such
as applying a new "active" CSS class. Then, I need to let the ClassicyDesktop event handler also know the window was
been focused, so it can be set as the active window and raised to the top-most z-index. When handling this event in the
ClassicyWindow, I first dispatch a local `ClassicyWindowFocus` to the Window's event dispatcher. Then, using the same
payload, I dispatch the same `ClassicyWindowFocus` event to the Desktop event dispatcher.

### Demo Time

Finally, I felt like I had enough of staring at invidiual components, and it was time to put something together. I
thought it would be fun to build a tiny little web browser using one of my favorite
sites, [theoldnet.com](https://theoldnet.com).

I took a shot at building out a full App using the framework I'd setup. It looks something like below:

```other
<ClassicyAppContext.Provider value={{appContext, setAppContext}}>
    <ClassicyDesktopIcon appId={appId} appName={appName} icon={appIcon}/>
    <ClassicyApp id={appId} name={appName} icon={appIcon} debug={true}>
        <ClassicyWindow
            id={"demo"}
            title={appName}
            appId={appId}
            closable={true}
            resizable={true}
            zoomable={true}
            collapsable={true}>
            <iframe src={"https://theoldnet.com/"}
                    style={{width: "100%", height: "100%", padding: "0", margin: "0"}}/>
        </ClassicyWindow>
    </ClassicyApp>
</ClassicyAppContext.Provider>
```


