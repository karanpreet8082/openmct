/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define*/

define(
    [],
    function () {
        "use strict";

        /**
         * The GestureRepresenter is responsible for installing predefined
         * gestures upon mct-representation instances.
         * Gestures themselves are pulled from the gesture service; this
         * simply wraps that behavior in a Representer interface, such that
         * it may be included among other such Representers used to prepare
         * specific representations.
         * @param {GestureService} gestureService the service which provides
         *        gestures
         * @param {Scope} scope the Angular scope for this representation
         * @param element the JQLite-wrapped mct-representation element
         */
        function GestureRepresenter(gestureService, scope, element) {
            var gestureHandle;

            function destroy() {
                // Release any resources associated with these gestures
                if (gestureHandle) {
                    gestureHandle.destroy();
                }
            }

            function represent(representation, domainObject) {
                // Clear out any existing gestures
                destroy();

                // Attach gestures - by way of the service.
                gestureHandle = gestureService.attachGestures(
                    element,
                    domainObject,
                    (representation || {}).gestures || []
                );
            }

            return {
                /**
                 * Set the current representation in use, and the domain
                 * object being represented.
                 *
                 * @param {RepresentationDefinition} representation the
                 *        definition of the representation in use
                 * @param {DomainObject} domainObject the domain object
                 *        being represented
                 */
                represent: represent,
                /**
                 * Release any resources associated with this representer.
                 */
                destroy: destroy
            };
        }

        return GestureRepresenter;
    }
);