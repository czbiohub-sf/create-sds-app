# Science Design System (SDS) UI Components Summary for AI

This document summarizes the main UI components available in the Science Design System (SDS) for an AI assistant to understand the available building blocks. The AI should use SDS components exclusively to build the UI. Regular Material UI components should not be used.

Tailwind styles can be found in `./SDS Tailwind.json`. It is also exported from the SDS library itself, but is left here for easy AI reference.

## Installation

**Currently SDS uses Material UI v5**

NOTE: Since most of the czi-sds components are built on top of Material UI's equivalent, it's also super useful to use their [API documentation](https://mui.com/) to learn about what you can do with the components. Many czi-sds components are style wrappers that pass props through to the MUI component without modifying them.

`@czi-sds/components` installs without direct dependencies to prevent version errors. Please ensure the following peer dependencies are also installed:

```
  "@emotion/css"
  "@emotion/react"
  "@emotion/styled"
  "@mui/base"
  "@mui/icons-material"
  "@mui/lab"
  "@mui/material"
  "react"
  "react-dom"
```

To install @czi-sds/components and the dependencies:

```
// with npm
npm i @czi-sds/components @emotion/css @emotion/react @emotion/styled @mui/base @mui/material @mui/icons-material @mui/lab react react-dom
```

### Default Theme

To use the default theme in your React application, complete the following:

1. Add the following HTML to your `index.html` at the `<head>` section:

```html
// installs the sds font from google fonts
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

2. Import the default theme object and use it in Material UI's `<ThemeProvier />`:

```javascript
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "@czi-sds/components";

<StyledEngineProvider injectFirst>
  <ThemeProvider theme={defaultTheme}>
    <EmotionThemeProvider theme={defaultTheme}>
      <YourApp />
    </EmotionThemeProvider>
  </ThemeProvider>
</StyledEngineProvider>;
```

If you want to override the default theme, please use `defaultAppTheme`, override the options, and then call `createTheme` to generate
the full theme object like below. This is needed because `createTheme` generates
extra theme variables based on the themeOptions provided, so if you override `defaultTheme` directly, some auxillary theme variables will be based on `defaultAppTheme` instead of your own custom options

```tsx
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { defaultAppTheme, makeThemeOptions } from "@czi-sds/components";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";

const customTheme = {
  ...
}

const appTheme = makeThemeOptions({ ...defaultAppTheme, ...customTheme })

const theme = createTheme(appTheme)

<StyledEngineProvider injectFirst>
  <ThemeProvider theme={theme}>
    <EmotionThemeProvider theme={theme}>
      <YourApp />
    </EmotionThemeProvider>
  </ThemeProvider>
</StyledEngineProvider>
```

# Components

## 1. `Accordion`

A container that can expand or collapse to show or hide content. Useful for managing large amounts of information in sections.

**Code Example:**

```typescript
import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider={false} togglePosition="right">
        <AccordionHeader id={`accordion-1-header`}>
          Accordion Header
        </AccordionHeader>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
```

---

## 2. `Banner`

A prominent message area, typically at the top of a screen, used for important announcements or status updates. Can be dismissible.

**Code Example:**

```typescript
import { Banner } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Banner sdsType="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
```

---

## 3. `Button`

Interactive elements users click to perform actions.

- **`Button`**: Standard button (styles: square, rounded, minimal, icon). Types: primary, secondary, destructive.
- **`ButtonDropdown`**: A button that looks like a dropdown input, typically used to open a menu.
- **`ButtonToggle`**: An icon button that toggles between an 'on' and 'off' state.

**Code Example (`Button`):**

```typescript
import { Button } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Button sdsType="primary" sdsStyle="square">
        Label
      </Button>
    </div>
  );
}

export default App;
```

**Code Example (`ButtonDropdown`):**

```typescript
import { ButtonDropdown } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <ButtonDropdown sdsType="primary" sdsStyle="square">
        Label
      </ButtonDropdown>
    </div>
  );
}

export default App;
```

**Code Example (`ButtonToggle`):**

```typescript
import * as React from "react";
import { ButtonToggle } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [toggle, setToggle] = React.useState(0);

  return (
    <div className="app">
      <ButtonToggle
        icon="InfoCircle"
        sdsStage={toggle ? "on" : "off"}
        onClick={() => setToggle((prev) => !prev)}
      >
        Label
      </ButtonToggle>
    </div>
  );
}

export default App;
```

---

## 4. `Callout`

An inline message box used to highlight important information, warnings, errors, or successes within the main content flow. Can be dismissible or expandable.

**Code Example:**

```typescript
import { Callout, CalloutTitle } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Callout intent="info">
        <CalloutTitle>Callout box</CalloutTitle>
        The Callout Box component is a versatile UI element designed to draw attention
        to important information or messages within your interface. With its clean
        and elegant design, the Callout Box helps highlight key content, alerts,
        or contextual details.
      </Callout>
    </div>
  );
}

export default App;
```

---

## 5. `Dialog`

A modal window that appears over the main content, requiring user interaction (e.g., confirmation, input) before returning to the main view. Blocks interaction with the underlying page. Includes `DialogTitle`, `DialogContent`, `DialogActions`.

**Code Example:**

```typescript
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app">
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open Dialog
      </Button>
      <Dialog onClose={handleClose} open={isOpen} sdsSize="xs">
        <DialogTitle
          title="Learning"
          subtitle="Learning Resources"
          onClose={handleClose}
        />
        <DialogContent>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding.
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
```

---

## 6. `Dropdown` / `DropdownMenu` / `InputDropdown`

Components for selecting options from a list.

- **`InputDropdown`**: The clickable field that triggers the dropdown menu to open.
- **`DropdownMenu`**: The menu itself, containing selectable `MenuItem`s. Can include search, sections, multi-select.
- **`Dropdown`**: A combined component simplifying the use of `InputDropdown` and `DropdownMenu`.

**Code Example (`InputDropdown` - Standalone):**

```typescript
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { InputDropdown } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputDropdown label="Label" />
    </div>
  );
}

export default App;
```

**Code Example (`DropdownMenu` - Needs anchor):**

```typescript
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { DropdownMenu, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  { name: "Menu item 1" },
  { name: "Menu item 2" },
  { name: "Menu item 3" },
];

const POPPER_BASE_PROPS = { popperOptions: { strategy: "absolute" } };

function handleClickAway() {}

function App() {
  const ref = useRef(null);
  const [open, setOpen] = useState(false); // Assume this is controlled elsewhere

  useEffect(() => {
    if (ref.current) setOpen(true); // Example: open when mounted
  }, [ref.current]);

  return (
    <div className="app" style={{ paddingLeft: "10px" }}>
      {/* This div acts as the anchor point */}
      <div
        ref={ref}
        style={{ width: 100, height: 20, border: "1px solid grey" }}
      >
        Anchor
      </div>
      {open && (
        <DropdownMenu
          PopperBaseProps={POPPER_BASE_PROPS}
          anchorEl={ref.current} // Anchor to the div above
          onClickAway={handleClickAway} // Function to close the menu
          open={open} // Control visibility
          options={MENU_ITEMS}
        />
      )}
    </div>
  );
}

export default App;
```

**Code Example (`Dropdown` - Combined):**

```typescript
import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import { Dropdown, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  { name: "Menu item 1" },
  { name: "Menu item 2" },
  { name: "Menu item 3" },
];

function App() {
  return (
    <div className="app">
      <Dropdown
        label="Click Target"
        onChange={() => {}} // Handle selection change
        options={MENU_ITEMS}
      />
    </div>
  );
}

export default App;
```

---

## 7. `Filter` (`SimpleFilter`, `ComplexFilter`)

Components specifically designed to allow users to narrow down datasets based on selected criteria. `ComplexFilter` is suited for many filter options.

**Code Example (`ComplexFilter`):**

```typescript
import { ComplexFilter, DefaultDropdownMenuOption } from "@czi-sds/components";
import "./styles.css";

const MENU_ITEMS: DefaultDropdownMenuOption[] = [
  { name: "Fruit: Apple", section: "Fruit", count: 10 },
  { name: "Fruit: Cherry", section: "Fruit", count: 150 },
  { name: "Vegetable: Carrot", section: "Vegetable", count: 34 },
];

function App() {
  return (
    <div className="app">
      <ComplexFilter
        label="Filter Label"
        onChange={() => {}} // Handle filter changes
        options={MENU_ITEMS}
      />
    </div>
  );
}

export default App;
```

_(Note: `SimpleFilter` code details were marked as "coming soon" in the documentation)._

---

## 8. `Input Controls`

Elements for user selection and input.

- **`InputCheckbox`**: Allows selection of zero or more items from a set.
- **`InputRadio`**: Allows selection of exactly one item from a set.
- **`InputSlider`**: Allows selection of a value from a continuous or discrete range.
- **`InputToggle`**: A switch for turning a setting on or off.

**Code Example (`InputCheckbox`):**

```typescript
import { InputCheckbox } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputCheckbox label="Label" />
    </div>
  );
}

export default App;
```

**Code Example (`InputRadio`):**

```typescript
import { InputRadio } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputRadio label="Label" />
    </div>
  );
}

export default App;
```

**Code Example (`InputSlider`):**

```typescript
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider
          label="Label" // Note: label might not be directly visible depending on context
        />
      </Box>
    </div>
  );
}

export default App;
```

**Code Example (`InputToggle`):**

```typescript
import { InputToggle } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <InputToggle />
    </div>
  );
}

export default App;
```

---

## 9. `Input Fields`

Elements for text entry.

- **`InputSearch`**: A text field specifically for entering search queries, often with a search icon.
- **`InputText`**: A standard text field for single-line (`textField`) or multi-line (`textArea`) input.

**Code Example (`InputSearch`):**

```typescript
import { InputSearch } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputSearch
          id="search-input"
          label="search" // Accessible label
          placeholder="Search"
        />
      </Box>
    </div>
  );
}

export default App;
```

**Code Example (`InputText` - TextField):**

```typescript
import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="text-input"
          label="Label" // Visible label
          placeholder="Enter your text"
          sdsType="textField" // Default
        />
      </Box>
    </div>
  );
}

export default App;
```

**Code Example (`InputText` - TextArea):**

```typescript
import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="textarea-input"
          label="Description"
          placeholder="Enter your text"
          sdsType="textArea"
        />
      </Box>
    </div>
  );
}

export default App;
```

---

## 10. `Link`

Navigational text elements that direct users to other pages or locations when clicked. Can have default or dashed underlines.

**Code Example:**

```typescript
import { Link } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Link href="#">Science Design System</Link>
    </div>
  );
}

export default App;
```

---

## 11. `List` / `ListItem`

Components for displaying ordered (`ol`) or unordered (`ul`) lists of items.

**Code Example (Unordered):**

```typescript
import { List, ListItem } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <List>
        <ListItem fontSize="s" marginBottom="xs">
          List Item 1
        </ListItem>
        <ListItem fontSize="s" marginBottom="xs">
          List Item 2
        </ListItem>
      </List>
    </div>
  );
}

export default App;
```

---

## 12. `LoadingIndicator`

Visual feedback (e.g., spinner) indicating that an operation is in progress.

**Code Example:**

```typescript
import { LoadingIndicator } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <LoadingIndicator /> {/* Defaults to sdsStyle="minimal" */}
    </div>
  );
}

export default App;
```

---

## 13. `Navigation` (`NavigationHeader`, `NavigationFooter`, `NavigationJumpTo`)

Components for application structure and movement. `Header` and `Footer` provide site-wide navigation, while `JumpTo` facilitates scrolling to sections within a single page.

**Code Example (`NavigationHeader`):**
_(Note: The provided documentation had a note about Zeroheight bugs preventing code examples. A placeholder structure is shown based on props)._

```typescript
// Placeholder based on described props - Actual implementation may vary
import {
  NavigationHeader /*, other needed components like Button, InputSearch */,
} from "@czi-sds/components";
import "./styles.css";

// Define navigation items and buttons as per props structure
const primaryNavItems = [
  /* ... array of primary nav items ... */
];
const secondaryNavItems = [
  /* ... array of secondary nav items ... */
];
const buttons = [
  /* ... array of button props ... */
];

function App() {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("someKey");

  return (
    <div className="app">
      <NavigationHeader
        title="Application Title"
        // logo={<img src="/path/to/logo.png" alt="Logo"/>}
        logoUrl="/"
        primaryNavItems={primaryNavItems}
        secondaryNavItems={secondaryNavItems}
        buttons={buttons}
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
        showSearch={true}
        // searchProps={{ /* ... props for InputSearch ... */ }}
      />
      {/* Rest of the application */}
    </div>
  );
}

export default App;
```

**Code Example (`NavigationFooter`):**
_(Note: Code details were marked as "coming soon" in the documentation)._

**Code Example (`NavigationJumpTo`):**

```typescript
import { NavigationJumpTo } from "@czi-sds/components";
import "./styles.css";
// Assume sectionRef1, sectionRef2 etc. are refs attached to page sections
// import { useRef } from "react";

function App() {
  // const sectionRef1 = useRef(null);
  // const sectionRef2 = useRef(null);

  return (
    <div className="app" style={{ display: "flex" }}>
      <NavigationJumpTo
        items={[
          { elementRef: { current: null }, title: "Item 1" }, // Replace {current: null} with actual refs
          { elementRef: { current: null }, title: "Item 2" },
          { elementRef: { current: null }, title: "Item 3" },
        ]}
      />
      <div style={{ marginLeft: "20px" }}>
        {/* Page content sections go here, linked by refs */}
        {/* <div ref={sectionRef1}>Section 1 Content...</div> */}
        {/* <div ref={sectionRef2}>Section 2 Content...</div> */}
      </div>
    </div>
  );
}

export default App;
```

---

## 14. `Notification`

A non-modal message that appears temporarily (often sliding in) to provide feedback or brief updates (e.g., "Save successful"). Typically less intrusive than a `Dialog` or `Banner`.

**Code Example:**

```typescript
import { Notification } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      {/* Notification will appear and likely auto-dismiss */}
      <Notification intent="positive">
        The Notification component has been rendered successfully!
      </Notification>
    </div>
  );
}

export default App;
```

---

## 15. `Panel`

A container, usually sliding in from the side or bottom (`overlay`) or docked persistently (`basic`), holding supplementary content or controls related to the main view.

**Code Example (Basic/Persistent):**

```typescript
import { useState } from "react";
import { Button, Panel } from "@czi-sds/components";
import { Box } from "@mui/material";
import "./styles.css";

// Helper component to manage main content margin when panel is open
const Main = (props: { open: boolean; children?: React.ReactNode }) => {
  const { open, children } = props;
  const margin = "0 0 0 250px"; // Adjust margin based on panel width + padding
  return (
    <Box
      sx={{
        margin: open ? margin : "0",
        transition: "margin 0.2s ease-in-out",
      }}
    >
      {" "}
      {children}{" "}
    </Box>
  );
};

function App() {
  const [open, setOpen] = useState(true); // Control panel visibility

  return (
    <div className="app">
      <Panel open={open} sdsType="basic" position="left">
        [Panel Content]
      </Panel>
      <Main open={open}>
        {/* Button to toggle the panel */}
        <Button sdsStyle="minimal" onClick={() => setOpen((prev) => !prev)}>
          {" "}
          Toggle Panel{" "}
        </Button>
        <p>Main page content goes here...</p>
      </Main>
    </div>
  );
}

export default App;
```

**Code Example (Overlay):**

```typescript
import { useState } from "react";
import { Button, Panel } from "@czi-sds/components";
import "./styles.css";

function App() {
  const [open, setOpen] = useState(false); // Start closed for overlay usually

  return (
    <div className="app">
      <Button sdsType="primary" sdsStyle="square" onClick={() => setOpen(true)}>
        {" "}
        Open Overlay Panel{" "}
      </Button>
      <p>Main page content...</p>
      <Panel
        open={open}
        sdsType="overlay"
        position="right" // Example position
        closeButtonOnClick={() => setOpen(false)} // Handle close button click
      >
        [Overlay Panel Content]
      </Panel>
    </div>
  );
}

export default App;
```

---

## 16. `Pagination`

Controls used with large `Table`s or lists to navigate between pages of data.

**Code Example:**

```typescript
import { Pagination } from "@czi-sds/components";
import { useState } from "react";
import "./styles.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 250;
  const itemsPerPage = 10;

  return (
    <div className="app">
      <Pagination
        pageSize={itemsPerPage}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        // onNextPage and onPreviousPage can often be derived from onPageChange
        totalCount={totalItems}
        siblingCount={1} // Number of page links around current page
        currentPage={currentPage}
        truncateDropdown // Use dropdown for many pages
      />
      <div>Current Page: {currentPage}</div>
      {/* Display items for currentPage here */}
    </div>
  );
}

export default App;
```

---

## 17. `SegmentedControl`

A group of buttons where only one can be active at a time, used to switch between related views or modes.

**Code Example:**

```typescript
import { SegmentedControl } from "@czi-sds/components";
import "./styles.css";

function App() {
  // Define the segments
  const buttonDefinition = [
    { icon: "List", tooltipText: "List View", value: "list" },
    { icon: "Grid", tooltipText: "Grid View", value: "grid" },
    { icon: "Tree", tooltipText: "Tree View", value: "tree" },
  ];

  const [selectedValue, setSelectedValue] = useState("list"); // Control the selected value

  return (
    <div className="app">
      <SegmentedControl
        buttonDefinition={buttonDefinition}
        value={selectedValue}
        onChange={(event, newValue) => {
          if (newValue) setSelectedValue(newValue);
        }} // Update state on change
      />
      {/* Display content based on selectedValue */}
      <div>Selected View: {selectedValue}</div>
    </div>
  );
}

export default App;
```

---

## 18. `Table` (`CellBasic`, `CellComponent`, `CellHeader`, `TableRow`, `TableHeader`)

Components for displaying structured, tabular data. Headers (`CellHeader`) can be sortable. Cells can contain basic text (`CellBasic`) or custom components (`CellComponent`).

**Code Example (Combined Table):**

```typescript
import {
  CellBasic,
  CellComponent,
  CellHeader,
  Icon,
  Tag,
  Table,
  TableRow,
  TableHeader,
} from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Table>
        <TableHeader>
          {" "}
          {/* Use TableHeader instead of bare <tr> */}
          <CellHeader>Header 1</CellHeader>
          <CellHeader active direction="asc">
            Header 2 (Sorted Asc)
          </CellHeader>
          <CellHeader horizontalAlign="right" hideSortIcon>
            Header 3 (No Sort)
          </CellHeader>
        </TableHeader>
        <tbody>
          <TableRow>
            <CellBasic primaryText="Row 1, Cell 1" />
            <CellBasic primaryText="Row 1, Cell 2" secondaryText="Secondary" />
            <CellComponent horizontalAlign="right">
              <Tag
                label="Info"
                color="info"
                sdsStyle="rounded"
                sdsType="secondary"
              />
            </CellComponent>
          </TableRow>
          <TableRow hover>
            {" "}
            {/* Add hover effect */}
            <CellBasic primaryText="Row 2, Cell 1" />
            <CellBasic primaryText="Row 2, Cell 2" />
            <CellComponent horizontalAlign="right">
              <Icon
                sdsIcon="CheckCircle"
                sdsSize="l"
                sdsType="static"
                color="positive"
              />
            </CellComponent>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
```

---

## 19. `Tabs`

A set of clickable labels used to switch between different panes of content within the same view.

**Code Example:**

```typescript
import { useState, SyntheticEvent } from "react";
import { Tabs, Tab } from "@czi-sds/components";
import { Box } from "@mui/material"; // For content display
import "./styles.css";

function App() {
  const [value, setValue] = useState(0); // Index of the active tab

  const handleTabsChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="app">
      <Tabs
        value={value}
        sdsSize="large"
        onChange={handleTabsChange}
        underlined
      >
        <Tab label="First Tab" count="4" /> {/* Optional count */}
        <Tab label="Second Tab" />
        <Tab label="Third Tab" />
      </Tabs>

      {/* Display content based on the active tab index */}
      <Box sx={{ padding: 2 }}>
        {value === 0 && <div>Content for First Tab</div>}
        {value === 1 && <div>Content for Second Tab</div>}
        {value === 2 && <div>Content for Third Tab</div>}
      </Box>
    </div>
  );
}

export default App;
```

---

## 20. `Tag` / `TagFilter`

Small labels used for categorization, status indication, or showing applied filters (`TagFilter`). Can include icons and different colors/styles.

**Code Example (`Tag`):**

```typescript
import { Tag } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tag label="Science Design System" color="primary" sdsStyle="rounded" />
    </div>
  );
}

export default App;
```

**Code Example (`TagFilter`):**

```typescript
import { TagFilter } from "@czi-sds/components";
import "./styles.css";

function App() {
  const handleDelete = () => {
    console.log("Filter tag deleted");
    // Add logic to remove the filter
  };

  return (
    <div className="app">
      <TagFilter
        label="Applied Filter: Status"
        onDelete={handleDelete} // Makes the delete icon appear
      />
    </div>
  );
}

export default App;
```

---

## 21. `Tooltip` (`Tooltip`, `TooltipCondensed`, `TooltipTable`)

Small informational popups that appear on hover to provide context, details, or instructions for a UI element. Can be styled differently and contain simple text, condensed text, or tabular data.

**Code Example (`Tooltip` - Dark):**

```typescript
import { ButtonIcon, Tooltip } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Tooltip
        arrow
        sdsStyle="dark"
        title="Tooltip title"
        subtitle="Optional subtitle for dark tooltips." // Subtitle only for dark style
      >
        {/* Wrap the element that triggers the tooltip */}
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="InfoCircle"
          aria-label="Info" // Accessibility
        />
      </Tooltip>
    </div>
  );
}

export default App;
```

**Code Example (`TooltipCondensed`):**

```typescript
import { ButtonIcon, TooltipCondensed } from "@czi-sds/components";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <TooltipCondensed
        indicator // Optional indicator dot
        indicatorColor="DodgerBlue" // Color if indicator is true
        title="Condensed tooltip title"
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="InfoCircle"
          aria-label="Info"
        />
      </TooltipCondensed>
    </div>
  );
}

export default App;
```

**Code Example (`TooltipTable` - Used inside a regular `Tooltip`):**

```typescript
import { ButtonIcon, Tooltip, TooltipTable } from "@czi-sds/components";
import "./styles.css";

function App() {
  // Data for the table tooltip
  const data = [
    {
      label: "Section 1", // Optional section label
      dataRows: [
        { label: "Label A", value: 10 },
        { label: "Label B", value: "Value B" },
      ],
    },
    {
      dataRows: [{ label: "Label C", value: 300 }],
    },
  ];

  return (
    <div className="app">
      <Tooltip
        arrow
        placement="right" // Control placement
        title={
          // Render TooltipTable inside the title prop
          <TooltipTable itemAlign="right" data={data} />
        }
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="InfoCircle"
          aria-label="Info"
        />
      </Tooltip>
    </div>
  );
}

export default App;
```

---
