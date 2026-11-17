# ServiceNow CSA primary sources

All questions are original. No official sample/past questions, practice products, commercial banks or leaked items are used. All sources below were fetched 2026-11-17. The blueprint page includes a sample section; it is explicitly excluded from authoring rather than mined for questions.

## Owner outline and format

1. Certified System Administrator Mainline Exam Blueprint, updated January 2026, https://learning.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0011554 — fetched 2026-11-17. Full six-domain outline, weights 7/10/20/20/30/13%; 60 items, 90 minutes; single and multiple-select, stated selection counts, no partial credit; undisclosed cut score, not always 70%. No release codename stated.
## Primary product guidance read

Current unversioned product pages resolve to Brazil, generally updated September 10, 2026. Search snippets often still describe Australia; those snippets are not used to establish current version. These product-release labels are not represented as the exam's release label.

- Unified Navigation, https://www.servicenow.com/docs/r/platform-user-interface/using-the-next-experience-global-header.html — fetched 2026-11-17; All/Favorites/History/Workspaces, access-dependent controls, global search, user preferences, impersonation and scope context.
- View management, https://www.servicenow.com/docs/r/platform-user-interface/view-management-overview.html — fetched 2026-11-17; different field presentations for forms/lists, preferences and view rules, not a security substitute.
- Plugins, https://www.servicenow.com/docs/r/platform-administration/c_ServiceNowPlugins.html — fetched 2026-11-17; plugin/application distinction and activation routes.
- Request a plugin, https://www.servicenow.com/docs/r/platform-administration/t_RequestAPlugin.html — fetched 2026-11-17; check existing activation and request ServiceNow activation when unavailable for self-service.
- UI policies in Table Builder, https://www.servicenow.com/docs/r/application-development/form-builder-glide-family-release/form-builder-policies-rules.html — fetched 2026-11-17; conditional mandatory/read-only/visibility behavior; no-code policies and optional scripts. This fetched page retains Australia context; only stable behavior used.
- Filters, https://www.servicenow.com/docs/r/platform-user-interface/c_Filters.html — fetched 2026-11-17; conditions, AND/OR and related-table conditions.
- Visual Task Board types, https://www.servicenow.com/docs/r/platform-user-interface/visual-task-boards/vtb-types.html — fetched 2026-11-17; freeform/flexible/guided distinctions.
- Email notifications, https://www.servicenow.com/docs/r/platform-administration/t_CreateANotification.html — fetched 2026-11-17; trigger/recipient/content configuration and recipient preferences.
- Knowledge user criteria, https://www.servicenow.com/docs/r/servicenow-platform/knowledge-management/t_SelectUserCriteria.html — fetched 2026-11-17; read/contribute access and diagnostics.
- Catalog categories, https://www.servicenow.com/docs/r/servicenow-platform/service-catalog/c_ServiceCatalogCategories.html — fetched 2026-11-17; category hierarchy and multiple-category membership.
- Order guides, https://www.servicenow.com/docs/r/servicenow-platform/service-catalog/request-order-guide-portal.html — fetched 2026-11-17; related-item ordering and request flow, no copied procedure quiz.
- Workflow Studio, https://www.servicenow.com/docs/r/build-workflows/workflow-studio/workflow-studio.html — fetched 2026-11-17; unified workflow authoring/configuring/monitoring and flows/subflows/actions/decision tables.
- ACL configuration, https://www.servicenow.com/docs/r/platform-security/access-control/t_CreateAnACLRule.html — fetched 2026-11-17; operation-specific checks, roles/conditions/scripts and decision types. Avoid obsolete blanket claims that all ACLs only grant or that admin must pass role checks.
- Dictionary entry form, https://www.servicenow.com/docs/r/platform-administration/table-administration-and-data-management/r_DictionaryEntryForm.html — fetched 2026-11-17; field definitions, defaults, reference qualifiers and overrides.
- Import-set concepts, https://www.servicenow.com/docs/r/integrate-applications/system-import-sets/c_ImportSetsKeyConcepts.html — fetched 2026-11-17; staging, mapping and coalesce update/insert behavior. No definition question copied from blueprint sample.
- CMDB, https://www.servicenow.com/docs/r/servicenow-platform/configuration-management-database-cmdb/manage-cmdb.html — fetched 2026-11-17; CI information/relationships and data integration.
- CSDM, https://www.servicenow.com/docs/r/servicenow-platform/common-service-data-model-csdm/csdm-content-frame-exploring.html — fetched 2026-11-17; common terminology and placement/modeling guidance.
- Security posture console, https://www.servicenow.com/docs/r/platform-security/security-center/sc-posture-console.html — fetched 2026-11-17; best-practice progress, security posture dashboards and security tasks.
- Shared Responsibility Model, https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/white-paper/wp-shared-responsibility-model.pdf — fetched 2026-11-17; current response includes August 2026 v4.2 overview and older v3.4 sections. Use consistent high-level responsibility distinctions only, no legacy defaults, retention figures or cryptographic claims.
- Data policy, https://www.servicenow.com/docs/r/platform-administration/c_DataPolicy.html — fetched 2026-11-17; data consistency through mandatory/read-only states.
- Classic business rules, https://www.servicenow.com/docs/r/api-reference/business-rules-classic/c_BusinessRules.html — fetched 2026-11-17; before/after/async/display timing, operation filters, async order/previous-record limitations.
- System update sets, https://www.servicenow.com/docs/r/application-development/system-update-sets/system-update-sets.html — fetched 2026-11-17; moving grouped configuration changes between instances.

- Forms, fields and lists, https://www.servicenow.com/docs/r/platform-administration/now-platform-forms-fields-lists.html — fetched 2026-11-17; Form customization and field presentation.
- Form templates, https://www.servicenow.com/docs/r/platform-administration/c_Templates.html — fetched 2026-11-17; Reusable field values.
- Visualization types, https://www.servicenow.com/docs/r/now-intelligence/data-visualization-type-overview.html — fetched 2026-11-17; Bar, time-series, pie and pivot use cases.
- List calculations, https://www.servicenow.com/docs/r/platform-administration/list-administration/t_ConfigureListCalculations.html — fetched 2026-11-17; Total, minimum, maximum and average.
- Virtual Agent topics, https://www.servicenow.com/docs/r/conversational-interfaces/virtual-agent/create-virtual-agent-topic.html — fetched 2026-11-17; Scope, test and publication.
- Topic blocks, https://www.servicenow.com/docs/r/conversational-interfaces/virtual-agent/topic-blocks-overview.html — fetched 2026-11-17; Reusable topic components.
- Record producers, https://www.servicenow.com/docs/r/servicenow-platform/service-catalog/c_RecordProducer.html — fetched 2026-11-17; Task records rather than requested-item fulfillment.
- Knowledge states, https://www.servicenow.com/docs/r/servicenow-platform/knowledge-management/knowledge-article-states.html — fetched 2026-11-17; Draft, review, published and pending retirement.
- Flow triggers, https://www.servicenow.com/docs/r/build-workflows/workflow-studio/flow-triggers.html — fetched 2026-11-17; Record, schedule and catalog events.
- Decision Builder, https://www.servicenow.com/docs/r/build-workflows/workflow-studio/decision-builder-user-interface.html — fetched 2026-11-17; Inputs, rows, results and testing.
- Catalog criteria, https://www.servicenow.com/docs/r/servicenow-platform/service-catalog/t_AppUserCritItemsCat.html — fetched 2026-11-17; Item availability and limitations outside catalog.
- Execution details, https://www.servicenow.com/docs/r/build-workflows/workflow-studio/flow-execution-details.html — fetched 2026-11-17; Runtime inputs, errors and reporting levels.
- Subflows, https://www.servicenow.com/docs/r/build-workflows/workflow-studio/subflows.html — fetched 2026-11-17; Reusable operations with inputs and outputs.
- Variable sets, https://www.servicenow.com/docs/r/servicenow-platform/service-catalog/t_CreateAVariableSet.html — fetched 2026-11-17; Shared variables.
- Group roles, https://www.servicenow.com/docs/r/platform-administration/user-administration/t_AssignRoleToGroup.html — fetched 2026-11-17; Inherited role assignments.
- Display values, https://www.servicenow.com/docs/r/platform-administration/c_DisplayValues.html — fetched 2026-11-17; Stored reference identifiers and visible labels.
- Table extension, https://www.servicenow.com/docs/r/platform-administration/table-administration-and-data-management/table-extension-and-classes.html — fetched 2026-11-17; Inherited fields and schema relationships.
- Commit update sets, https://www.servicenow.com/docs/r/application-development/system-update-sets/t_CommitAnUpdateSet.html — fetched 2026-11-17; Resolved preview issues, commit results and logs.
- Preview update sets, https://www.servicenow.com/docs/r/application-development/system-update-sets/t_PreviewARemoteUpdateSet.html — fetched 2026-11-17; Conflict identification before commit.
- Client scripts, https://www.servicenow.com/docs/r/api-reference/scripts/client-scripts.html — fetched 2026-11-17; Browser-side behavior and onLoad/onChange/onSubmit/onCellEdit distinctions; not data-access enforcement.
- Update process planning, https://www.servicenow.com/docs/r/application-development/system-update-sets/get-started-update-sets.html — fetched 2026-11-17; Consistent migration path, version compatibility, focused packages and clear naming.

## Coverage and limitations

Selected conceptual and applied administration across all six outline domains. Original filter, aggregation and import-matching calculations are derived from documented behavior. No UI simulator, hands-on administration assessment or exhaustive release-feature coverage. The blueprint does not publish the proportion of multiple-select questions; the bank uses 16 choose-two items as an editorial mix. Four-option families balance plausible alternatives, but related items are not statistically independent. No official readiness prediction.

## Access attempts not used as evidence

2. Credentialing Program Guide, https://www.servicenow.com/services/training-and-certification/journey/ — fetched 2026-11-17 but returned no readable body. No policy facts inferred from this inaccessible page; readable owner blueprint supplies format.
3. Alternate legacy knowledge link, https://nowlearning.servicenow.com/kb?id=kb_article_view&sys_kb_id=7f812a41476e2a5076e07884f16d43a3 — fetched 2026-11-17 but returned only Loading. The current learning.servicenow.com article above was fully readable.
