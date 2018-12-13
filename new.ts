<div className={classnames('container', this.props.className, {
'shouldSelectUser': !canisend
})}>
<div
className={'tips'}>
你应该先选择一个联系人。
</div>
<input
id="messageInput"
onPaste={e => this.handlePaste(e)}
onKeyPress={e => this.handleEnter(e)}
placeholder="Type something to send..."
readOnly={!canisend}
ref={this.inputRef}
type="text" />

<div className={'Controller'}>
<i
className="icon-ion-android-attach"
id="showUploader"
onClick={e => canisend && this.uploaderRef.click()} />
<i
className="icon-ion-ios-heart"
id="showEmoji"
onClick={e => canisend && this.toggleEmoji(true)}
style={{
color: 'red'
}} />

<input
onChange={e => {
this.batchProcess(e.target.files[0]);
e.target.value = '';
}}
ref={this.uploaderRef}
style={{
display: 'none'
}}
type="file" />
<Emoji
close={e => setTimeout(() => this.toggleEmoji(false), 100)}
output={emoji => this.writeEmoji(emoji)}
show={this.state.showEmoji} />
</div>
</div>