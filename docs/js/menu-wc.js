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
                                    <span class="icon ion-ios-paper"></span>
                                        README
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
                                            'data-bs-target="#controllers-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' : 'data-bs-target="#xs-controllers-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' :
                                            'id="xs-controllers-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' : 'data-bs-target="#xs-injectables-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' :
                                        'id="xs-injectables-links-module-AppModule-2b6846fe7bebe890c4ac0f7ad1f3e5cc1d601027dcbff01575240b2dffa99f1d846f005e9148358ff070c92b8e710e834b0b9932f93b69486a3a3779671dc897"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' :
                                            'id="xs-controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' :
                                        'id="xs-injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' :
                                            'id="xs-controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' }>
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
                                            'data-bs-target="#controllers-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' : 'data-bs-target="#xs-controllers-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' :
                                            'id="xs-controllers-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' : 'data-bs-target="#xs-injectables-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' :
                                        'id="xs-injectables-links-module-PostModule-026f9b555736f4c9edef7a6bffc4a1fc2f54ed32e54283c8e128da01c0ea39e1618cdb8af5f8a4c2153c98572e724997830f963570018c630253163626627ad7"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-0cf5651dbe44dbb86e9f96f24014fe10d9b7c747411de8cad004072f170186bb00896867567bdff043dae8579dcd63808e69fe453b8a64e5897ec562e3c4f0a1"' : 'data-bs-target="#xs-injectables-links-module-UserModule-0cf5651dbe44dbb86e9f96f24014fe10d9b7c747411de8cad004072f170186bb00896867567bdff043dae8579dcd63808e69fe453b8a64e5897ec562e3c4f0a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-0cf5651dbe44dbb86e9f96f24014fe10d9b7c747411de8cad004072f170186bb00896867567bdff043dae8579dcd63808e69fe453b8a64e5897ec562e3c4f0a1"' :
                                        'id="xs-injectables-links-module-UserModule-0cf5651dbe44dbb86e9f96f24014fe10d9b7c747411de8cad004072f170186bb00896867567bdff043dae8579dcd63808e69fe453b8a64e5897ec562e3c4f0a1"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
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
                                <a href="classes/BlogPostUser.html" data-type="entity-link" >BlogPostUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentDoesNotExist.html" data-type="entity-link" >CommentDoesNotExist</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentInsufficientPermissionsError.html" data-type="entity-link" >CommentInsufficientPermissionsError</a>
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
                                <a href="classes/GetRelatedPostsDto.html" data-type="entity-link" >GetRelatedPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostCircularRelationship.html" data-type="entity-link" >PostCircularRelationship</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostDoesNotExist.html" data-type="entity-link" >PostDoesNotExist</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostDoesNotHaveComments.html" data-type="entity-link" >PostDoesNotHaveComments</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostError.html" data-type="entity-link" >PostError</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostIdValidationError.html" data-type="entity-link" >PostIdValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostInsufficientPermissionsError.html" data-type="entity-link" >PostInsufficientPermissionsError</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostRelationConflict.html" data-type="entity-link" >PostRelationConflict</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostSlugValidationError.html" data-type="entity-link" >PostSlugValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BlogPostSanitizedResponse.html" data-type="entity-link" >BlogPostSanitizedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreatedBlogPostResponse.html" data-type="entity-link" >CreatedBlogPostResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExpressRequestWithBlogPostUser.html" data-type="entity-link" >ExpressRequestWithBlogPostUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});