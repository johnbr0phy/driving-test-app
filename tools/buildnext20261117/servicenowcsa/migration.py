ITEMS=[]
def group(o,rows):
 for k,(s,e) in enumerate(rows): ITEMS.append((s,[o[k]]+[v for j,v in enumerate(o) if j!=k],e))
group(['UI policy','Client script','Business rule','Update set'],[
 ('A form must make a justification field mandatory when a checkbox is selected. The requirement is conditional field behavior that can be configured without code. Which mechanism fits?', 'A UI policy can conditionally set mandatory, visible and read-only behavior without custom code.'),
 ('An administrator needs custom browser-side logic to recalculate a displayed field immediately after another field changes. Which mechanism fits the specified execution location?', 'A client script runs in the browser and can respond to field changes. This is not a substitute for server-side authorization.'),
 ('A custom calculation must execute on the server before a record is saved, regardless of the form presentation. Which mechanism fits?', 'A before business rule can run server-side logic before a database operation.'),
 ('A completed collection of captured configuration changes must move from a development instance to a test instance. Which mechanism packages those changes?', 'An update set groups captured configuration changes for transfer between instances.'),
])
group(['Before business rule','After business rule','Async business rule','Display business rule'],[
 ('A server-side rule must normalize a value on the current record before its pending database update is written. Which timing fits?', 'Before rules execute before the database operation and can adjust the current record for that operation.'),
 ('A related-record action must run synchronously after the current database update has completed. Which business-rule timing matches both requirements?', 'After rules run after the database operation. Async rules do not satisfy the stated synchronous requirement.'),
 ('A non-urgent server task should be queued for background processing after an update rather than make the user wait for its completion. Which timing fits?', 'Async rules run through background processing. Their execution order should not be assumed when several updates occur.'),
 ('A server rule must prepare information as a record is retrieved for display on a form. Which timing fits?', 'Display business rules run when a record is loaded for display, allowing server-side preparation for the form.'),
])
group(['Review the migration path','Compare instance versions','Split an oversized change package','Apply a clear naming convention'],[
 ('Two developers propose transferring the same customization to production separately from different source instances. Which planning issue should be addressed first?', 'A consistent development-to-test-to-production path avoids moving the same update set from multiple sources.'),
 ('A customization depends on platform behavior that may differ between the source and target releases. Which preparation step most directly addresses that concern?', 'Checking source and target versions identifies compatibility risks; moving changes between different versions can introduce problems.'),
 ('One proposed update set combines unrelated schema work and several major workflow revisions, making review difficult. Which planning change best targets this problem?', 'Smaller focused update sets are easier to review and process than large unrelated packages.'),
 ('Support staff cannot tell which of several similarly titled update sets is the follow-up fix for a particular incident. Which process change addresses this identification problem?', 'Clear names and sequence identifiers help reviewers associate update sets with their purpose and intended order.'),
])
group(['onLoad','onChange','onSubmit','onCellEdit'],[
 ('A browser-side form script must initialize a message when the form is first rendered, before the user enters data. Which client-script type matches that event?', 'onLoad runs when the form is initially rendered.'),
 ('A form must recalculate a displayed estimate when the user changes its quantity field. Which client-script event matches that interaction?', 'onChange responds to a specified field changing on the form.'),
 ('A browser-side check should run when the user attempts to submit a form and may cancel that form submission. Which client-script type matches?', 'onSubmit runs for form submission and can return false to cancel it. Server-side enforcement remains a separate concern.'),
 ('A supported list editor needs client-side validation when a user edits a cell directly, rather than opening the form. Which client-script type matches?', 'onCellEdit is the client-script type associated with changes made in the list editor.'),
])
group(['Inspect preview conflicts','Check missing dependencies','Inspect the commit log','Test the migrated behavior'],[
 ('An update-set preview reports that the target already contains a competing change to the same configuration record. What is the most relevant next investigation?', 'Preview conflicts must be reviewed and resolved before committing the retrieved update set.'),
 ('A customization references an application component that is absent from the target instance. What should be investigated before treating the package as ready to apply?', 'Required components must be present; a successful transfer alone does not supply every dependency.'),
 ('An update-set commit has finished with errors. The administrator needs the recorded details of what failed during that operation. Where should the investigation focus?', 'The commit log records information and errors associated with applying the update set.'),
 ('A configuration package committed without errors, but acceptance criteria require the target form to behave correctly for a normal user. What check is still required?', 'A clean commit does not establish functional correctness. Test the intended behavior in the target environment.'),
])
o=['Browser-side form feedback','Server-side record validation','Captured configuration transfer','Imported business-data mapping']
for s,k,e in [
 ('A change needs immediate feedback while a user edits a form and a separate validation rule before a record is stored. Which two concerns must be addressed? Choose two.',[0,1], 'Form feedback belongs to the browser experience; server validation protects the record operation independently of that experience.'),
 ('A release includes a server-side validation rule and the transfer of its captured configuration to a test instance. It does not load external records or alter form feedback. Which two concerns apply? Choose two.',[1,2], 'The requirements cover server validation and configuration transfer, not client feedback or an external data import.'),
 ('A rollout moves captured form configuration to another instance and separately maps a supplier file into business records. Which two concerns apply? Choose two.',[2,3], 'Configuration migration and business-data mapping are distinct tasks; a configuration package is not a substitute for the data import.'),
 ('An administrator improves messages shown while users edit a form and maps an incoming asset file into target records. No configuration transfer or new server validation rule is requested. Which two concerns apply? Choose two.',[3,0], 'The stated work is browser-side feedback and imported-data mapping.'),
]: ITEMS.append((s,o,e,k))
assert len(ITEMS)==24
