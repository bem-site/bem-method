# bem-tools status

Hi!

Currently bem-tools development is in freeze state.

We smooothly migrate to [ENB](http://enb-make.info/). ENB is an alternative implementation of `bem make` command. It does not support other commands. Besides, ENB core allows building projects not connected to BEM. ENB as well as bem-tools has most of its logic in technologies (techs) modules. 

Because of the fact that ENB core does not know anything about BEM, it has no default behavior, and it makes its configs more verbose however they become easier to read.

One of the main reasons for migration to ENB was the fact that most of the developers at Yandex moved to ENB when it was born and builded typical projects faster than bem-tools. Afterwards Marat Dulin who authored ENB helped us to fasten bem-tools (it has happened then v2-technologies appeared) but there was already no reason to move back.

As a result we had a choice: to support both instruments, test all blocks build by both, answer questions about both and sync changes in both places or to choose just one. We decided to follow the majority.

By now we implemented everything that was developed on top of bem-tools for ENB and added parts that ENB did not have.

We planned more to do such as writing and publishing new modules documentation, release libraries built with ENB, support it in [project-stub](http://bem.info/tutorials/project-stub/) and so on. 

Talking about usage, until bem-core@v3 is out it will be possible to build all of our libraries with any of building tools. There will be no difference in resulting state. When there are changes coming, we will inform you immediately via our blog here on [bem.info](http://bem.info/blog).

For tasks such as entities creation bem-tools are still actual. There is no sense in implementing such logic in ENB. It is possible that in the frames of bem-tools `make` command will be polymorphic: if there is bem-tools config — we build with `bem make`, if there is ENB config — we build with ENB.

As we already told monay times on BEMup's, we have frozen bem-tools 1.0 development, however we continue to dream about a number of atomic modules that will allow building BEM-projects on grunt, gulp, broccoli, brunch, etc. 

Someday we will get there. Or may be find somebody passionate from BEM community to do so, may we not? 

If you have time and desire to tackle this task, we will be happy to discuss it, help to plan and advise, where to move first, and the longer it takes the more we are open to engage you in sharing results on our own or external conferences and publish it on bem.info.

Email us at info@bem.info
