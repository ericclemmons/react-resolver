## Motivation?

[React][react]'s rendering is synchronous by design.
As a result, rendering on the server is left as an exercise for the rest of the
community to figure out.

There are some cludgy solutions for this, most of which require having
**fat ~~handlers~~ ~~components~~ controllers** at the top of your application
that are responsible for **marshalling data for all components under them**.

For a non-trivial application, this means mixing concerns between your
specialized components and the _controllers_, which is conceptually difficult
and programmatically annoying to maintain.

[react]: http://facebook.github.io/react/
