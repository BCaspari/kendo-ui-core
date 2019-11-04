---
title: Overview
page_title: ActionSheet Overview | Hybrid Telerik UI HTML Helpers
description: "Learn the basics when working with the hybrid Telerik UI ActionSheet HtmlHelper for ASP.NET MVC."
previous_url: /helpers/hybrid/mobileactionsheet/overview
slug: overview_hybridactionsheet_aspnetmvc
---

# Hybrid ActionSheet HtmlHelper Overview

The hybrid Telerik UI ActionSheet HtmlHelper for ASP.NET MVC is a server-side wrapper for the hybrid Kendo UI ActionSheet widget.

The ActionSheet displays a set of choices related to a task the user initiates.

* [Demo page for the ActionSheet](http://demos.telerik.com/kendo-ui/m/index#actionsheet/index)

## Basic Configuration

1. Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. If you decide not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.
1. Open `HomeController.cs` and modify the `Index` action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add an ActionSheet to the `Index` view. Like most hybrid Telerik UI, the ActionSheet must be initialized within the hybrid View content.

    ```ASPX
        <% Html.Kendo().MobileView()
            .Name("actionsheet-view")
            .Title("Inbox")
            .Content(() =>
            {
                %>
                <!-- Add a button to open the ActionSheet. -->
                <%: Html.Kendo().MobileButton()
                        .Name("button")
                        .Rel(MobileButtonRel.ActionSheet)
                        .Text("Reply")
                        .Url("#inboxActions")
                %>

                <% Html.Kendo().MobileActionSheet()
                    .Name("inboxActions")
                    .Popup(popup => popup.Direction(MobilePopupDirection.Left))
                    .Title("Monday Meeting:")
                    .Items(items => {
                        items.Add().Text("Reply");
                        items.Add().Text("Reply All");
                        items.Add().Text("Archive");
                    })
                    .Render();
                %>
                <%
            })
            .Render();
        %>
    ```
    ```Razor
        @(Html.Kendo().MobileView()
            .Name("actionsheet-view")
            .Title("Inbox")
            .Content(
                @<text>
                <!-- Add a button to open the actionsheet widget -->
                @(Html.Kendo().MobileButton()
                    .Name("button")
                    .Rel(MobileButtonRel.ActionSheet)
                    .Text("Reply")
                    .Url("#inboxActions")
                )

                @(Html.Kendo().MobileActionSheet()
                    .Name("inboxActions")
                    .Popup(popup => popup.Direction(MobilePopupDirection.Left))
                    .Title("Monday Meeting:")
                    .Items(items => {
                        items.Add().Text("Reply");
                        items.Add().Text("Reply All");
                        items.Add().Text("Archive");
                    }))

            </text>)
        )
    ```

1. Initialize the mobile application.

    ```ASPX
        <%: Html.Kendo().MobileApplication()
                .ServerNavigation(true)
        %>
    ```
    ```Razor
        @(Html.Kendo().MobileApplication()
            .ServerNavigation(true)
        )
    ```

1. Build and run the application.

## Events

You can subscribe to all hybrid ActionSheet [events](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/actionsheet#events).

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().MobileActionSheet()
            .Name("MobileActionSheet")
            .Items(items => {
                items.Add().Text("Reply").Action("replay");
            }))
            .Events(events => events
                .Open("onOpen")
            )
    %>

    <script>
        function onOpen() {
            // Handle the open event.
        }

        function replay() {
            // Will execute when item with `Reply` title is clicked.
        }
    </script>
```
```Razor
    @(Html.Kendo().MobileActionSheet()
        .Name("MobileActionSheet")
        .Items(items => {
            items.Add().Text("Reply").Action("replay");
        }))
        .Events(events => events
            .Open("onOpen")
        )
    )

    <script>
        function onOpen() {
            // Handle the open event.
        }

        function replay() {
            // Will execute when item with `Reply` title is clicked.
        }
    </script>
```

## Referencing Existing Instances

You can reference a hybrid ActionSheet instance by using the code from the following example. Once a reference is established, use the [hybrid ActionSheet client-side API](https://docs.telerik.com/kendo-ui/api/javascript/mobile/ui/actionsheet#methods) to control its behavior.

    @(Html.Kendo().MobileActionSheet()
        .Name("inboxActions")
        .Popup(popup => popup.Direction(MobilePopupDirection.Left))
        .Title("Monday Meeting:")
        .Items(items => {
            items.Add().Text("Reply");
            items.Add().Text("Reply All");
            items.Add().Text("Archive");
        }))
    <script>
        $(function() {
            // The Name() of the ActionSheet is used to get its client-side instance.
            var actionsheet = $("#inboxActions").data("kendoMobileActionSheet");
        });
    </script>

## See Also

* [Hybrid ActionSheetBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/MobileActionSheetBuilder)