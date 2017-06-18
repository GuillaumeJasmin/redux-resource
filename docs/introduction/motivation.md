# Motivation

Many applications work with state that is persisted to a server. Because
communicating with remote servers requires sending messages over a network,
reading and writing this state does not happen instantly. The requests take
time, and they may sometimes fail.

It's a developer's job to provide feedback to users about network
requests. When using Redux, this means writing reducers that change the state
based on the status of these requests. If your application has many resources,
you can run into problems when you write these reducers by hand.

For one, simply figuring out what information needs to be tracked can be
difficult to figure out. Request tracking is a difficult problem.

When you do figure out something that works, it may be implemented slightly
differently for different resources in your state tree. This inconsistency will
propagate to your view layer. Code bases that are not consistent are more
difficult to maintain.

Additionally, tracking all of this data for every request requires writing a lot
of reducer code. You may omit writing some of that code to save on time. This
contributes to inconsistency, and also gives you, the developer, less
information for providing feedback to your users.

Resourceful Redux is intended to solve these problems. It provides a system of
organizing information about request state in a consistent way. It also comes
with reducers that keep track of as much information as possible about every
request made to remote servers, so that you don't have to.

Use Resourceful Redux to have more time to build great interfaces, rather than
writing boilerplate reducer code.
