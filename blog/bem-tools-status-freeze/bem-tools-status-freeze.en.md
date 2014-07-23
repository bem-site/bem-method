=== bem-tools status ===

Hi!

Currently bem-tools development is in freeze state.

We smooothly migrate to [ENB](http://enb-make.info/). ENB is an alternative realization of bem make command. It has not other commands in it. Besides, ENB core allows building projects not connected to BEM as well. ENB as well as bem-tools has most of its logic described within technologies (techs) modules. 

Because of the fact that ENB core does not know anything about BEM, it has no default bevahiour, and it makes its configs be mostly verbose however its simplifies them and makes understandable.

One of the main reasons for migration to ENB was the fact, that most of the developers at Yandex moved to ENB when it was born and started to build typical projects faster than bem-tools. Afterwards Marat Dulin who authored ENB helped us to fasten bem-tools (it has happened then v2-technologies arrived) but there was already no reason to move back.

As a result we had a choice: to support both instruments, test all blocks build by both, answer questions about both and commit to syncronizing changes in both places or to choose the one. We decided to follow the majority.

By now we coded everything that was developed on top of bem-tools in ENB and added parts that ENB did not have. 

There are planned more to do such as writing and publishing new modules documentation, release libraries built by ENB versions, support it in [project-stub](http://ru.bem.info/tutorials/project-stub/) and so on. 

Talking about exploitation, until bem-core@v3 is out all of our libraries will be able to be built by any of building tools. There will be no difference in resulting state. When there are changes coming, we will informn you immediately via our blog here on bem.info.

For tasks such as entities creation bem-tools are still actual. There is no sence in realizing such logic close to ENB. It is possible that in the frames of bem-tools make command will be polymorphic: if there is a bem-tools config — we build with bem make, if there is a ENB config — we build with ENB.

As we told you on BEMup's so many times, we have frozen bem-tools 1.0 development, however we continues to dream about a number of atomic modules that will allow building BEM-projects on grunt, gulp, broccoli, brunch and so on. 

Someday we will get there. Or may be find somebody passionate from BEM-comunity, may we not? 

If you have time and desire to take this task, we will be happy to discuss it, help to plan and advise, where to move first, and the longer it takes the more we are open to engage you in sharing results on our own or external conferences and publish it on bem.info.

Email us at info@bem.info
