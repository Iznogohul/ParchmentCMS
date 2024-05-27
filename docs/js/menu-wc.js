'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ParchmentCMS Documentation 📖</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' : 'data-bs-target="#xs-controllers-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' :
                                            'id="xs-controllers-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' : 'data-bs-target="#xs-injectables-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' :
                                        'id="xs-injectables-links-module-AppModule-ad9d8173cfc1613f157e9f8869ee045cc9ae1d1af454bd937291df7621ffa356052b0eb431329fa4b31b6f079f8fcdd46b4df402306ab5645c018c7a17089c16"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' :
                                            'id="xs-controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' : 'data-bs-target="#xs-controllers-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' :
                                            'id="xs-controllers-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' : 'data-bs-target="#xs-injectables-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' :
                                        'id="xs-injectables-links-module-PostModule-0dd59ec71fb271dee50abb1f1906c7e88a7ffe5763801962df1b2c67066f94386f181d2479debb3d67b1ea4e5dfa7b2569c3a223c7551ea3699ac0e40c6a959c"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BlogPost.html" data-type="entity-link" >BlogPost</a>
                            </li>
                            <li class="link">
                                <a href="classes/BlogPostComment.html" data-type="entity-link" >BlogPostComment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentDoesntExist.html" data-type="entity-link" >CommentDoesntExist</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRelationshipDto.html" data-type="entity-link" >CreateRelationshipDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostCircularRelationship.html" data-type="entity-link" >PostCircularRelationship</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostDoesntExist.html" data-type="entity-link" >PostDoesntExist</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostDoesntHaveComments.html" data-type="entity-link" >PostDoesntHaveComments</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostError.html" data-type="entity-link" >PostError</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostIdValidationError.html" data-type="entity-link" >PostIdValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostRelationConflict.html" data-type="entity-link" >PostRelationConflict</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostSlugValidationError.html" data-type="entity-link" >PostSlugValidationError</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});